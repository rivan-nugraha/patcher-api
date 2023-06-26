import * as express from 'express';
import * as cors from 'cors';
import helmet from 'helmet';
import * as swaggerUi from 'swagger-ui-express';
import { Server } from 'socket.io';
import Documents from "./docs/Documents";

import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';
import Repository from './repositories/Repository';
import Services from './services/Services';

const swaggerDoc = new Documents();
const ip = require("ip");
const multer = require("multer");
const upload = multer({ dest: path.join(__dirname, "uploads") });

class App{
    private app: any;
    private expressRouter: any;
    private port: any;
    private routes: any;
    private repository: Repository;
    private service: Services;

    constructor(
        routes: any,
        repository: any,
        variables: any,
        service: any
    ){
        this.app = express();
        this.expressRouter = express.Router();
        this.repository = repository;
        this.port = process.env.PORT || variables.port;
        this.routes = routes;
        this.service = service;

        this._registerRoute = this._registerRoute.bind(this);
        this._createRouteBoundAction = this._createRouteBoundAction.bind(this);
        this._buildControllerInstance = this._buildControllerInstance.bind(this);
    }

    _registerRoute(uri: any, httpMethod: any, boundAction: any, emmitter: any){
        this.expressRouter.route(uri)[httpMethod](boundAction);
    }

    _createRouteBoundAction (controllerClass: any, method: any, isSecure: any, isFile: any, io: any) {
        const result = [
          (req: any, res: any, next: any) => {
            this._buildControllerInstance(controllerClass, req, res, io)[method]();
          }];
        if (isFile) {
          result.unshift(upload.single("image"));
        }
        if (isSecure) {
          result.unshift(
            ...this.service.security.authenticate(),
          );
        }
        return result;
      }

    _buildControllerInstance (ControllerClass: any, req: any, res: any, io: any) {
        return new ControllerClass(
            {
                params: req.params,
                query: req.query,
                headers: req.headers,
                body: req.body,
                repository: this.repository,
                user: req.user,
                req: req,
                res: res,
                io: io,
                send: (statusCode: any, resource: any, location: any) => {
                    if (location) {
                    res.location(location);
                    }
                    res.status(statusCode).send(resource);
                }
            }
        );
    }

    async start () {
        process.setMaxListeners(0);
        this.app.use(express.json({ limit: "30mb" }));
        this.app.use(express.urlencoded({ limit: "30mb", extended: true }));
        this.app.use((req: any, res: any, next: any) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
            next();
        });
        this.app.use(cors());
        this.app.use(helmet());
        this.repository.registerRepositories();
        this.app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc.getDoc()));
        this.app.use("/api/v1", this.expressRouter);
        this.app.use("/api/v1/reconnect-db", (req:any, res: any) => {
            this.service.transactionService.reconnectDB();
            res.status(200).send({ message: "Reconnect database SUCCESS!" });
        });
        this.app.use((req: any, res: any) => {
            res.status(404).send({ url: `${req.originalUrl} not found!` });
        });

        let listener = null;
        if (!Number(process.env.IS_HTTPS)) {
            listener = this.app.listen(this.port, () => {
            this.service.logger.info(`App listening on port: ${this.port}`);
            this.service.logger.info("Current IP Address   : " + ip.address());
            });
        } else {
            const key = fs.readFileSync("/home/nodeapp/cert/private.key");
            const cert = fs.readFileSync("/home/nodeapp/cert/certificate.crt");
            const credentials = { key, cert, passphrase: "??" };
            const httpsServer = https.createServer(credentials, this.app);
            listener = httpsServer.listen(this.port, () => this.service.logger.info(`Https app listening on port: ${this.port}`));
        }

        const io = new Server(listener, {
            cors: {
            origin: "*",
            methods: ["GET", "POST"]
            }
        });
        io.on("connection", (socket: any) => {
            socket.on("end-socket", (data: any) => {
            socket.disconnect();
            });
        });
        io.on("disconnect", (socket: any) => {
            socket.on("end-socket", (data: any) => {
            socket.disconnect();
            });
        });

        this.service.partialSocket.initSocket(io);
        this.routes.registerRoutes(this._registerRoute, this._createRouteBoundAction, io);
    }
}

export default App;
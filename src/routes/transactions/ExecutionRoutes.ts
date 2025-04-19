import ExecutionController from "../../controllers/transactions/ExecutionController";
import RouteBase from "../base/RouteBase";

export default class ExecutionRoutes extends RouteBase {
    private baseUri: string = "/execution"
    constructor () {
        super(ExecutionController)
    }

    getRoutes () {
        this.buildRoute(this.baseUri, "get", "history", true);
        this.buildRoute(this.baseUri, "post", "execute", true);
        this.buildRoute(this.baseUri+"/test", "post", "executeTest", true);
        this.buildRoute(this.baseUri+"/patch", "post", "executeStore", true);

        return this.routes;
    }
} 
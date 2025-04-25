import AuthRoutes from "./auth/AuthRoutes";
import RoutesCollection from "./collections/RouteCollections";
import DatabaseListRoutes from "./masters/DatabaseListRoutes";
import ProgramRoutes from "./masters/ProgramRoutes";
import ScriptRoutes from "./masters/ScriptRoutes";
import StoreGroupRoutes from "./masters/StoreGroupRoutes";
import StoreRoutes from "./masters/StoreRoutes";
import UserRoutes from "./masters/UserRoutes";
import DashboardRoutes from "./system/DashboardRoutes";
import { SystemRoutes } from "./system/SystemRoutes";
import ExecutionRoutes from "./transactions/ExecutionRoutes";

class Routes{
    private routeBuilders: any[];
    public emitter: any;
    constructor(){
        this.routeBuilders = [
            // Auth
            new AuthRoutes(),

            // Masters
            new StoreGroupRoutes(),
            new StoreRoutes(),
            new DatabaseListRoutes(),
            new ScriptRoutes(),
            new UserRoutes(),
            new ProgramRoutes(),

            // Systems
            new SystemRoutes(),
            new DashboardRoutes(),

            // Transactions
            new ExecutionRoutes(),
        ]
    }

    registerRoutes(
        registerRouteCallback: any,
        createRouteBoundAction: any,
        io: any
    ){
        this.routeBuilders.map((builder: any) => {
            const routes = builder.getRoutes();
            routes.map((routeData: any) => {
                RoutesCollection.addRouteData(
                    routeData.controllerClass,
                    routeData.action,
                    {
                        uri: routeData.uri,
                        httpMethod: routeData.httpMethod,
                    }
                );
                const boundAction = createRouteBoundAction(
                    routeData.controllerClass,
                    routeData.action,
                    routeData.isSecure,
                    routeData.isFile,
                    io
                );
                registerRouteCallback(
                    routeData.uri,
                    routeData.httpMethod,
                    boundAction,
                    io
                );
            });
        });
    }
}

export default Routes;
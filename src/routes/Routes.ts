import AuthRoutes from "./auth/AuthRoutes";
import RoutesCollection from "./collections/RouteCollections";
import DatabaseListRoutes from "./masters/DatabaseListRoutes";
import ScriptRoutes from "./masters/ScriptRoutes";
import StoreGroupRoutes from "./masters/StoreGroupRoutes";
import StoreRoutes from "./masters/StoreRoutes";

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

            // Systems
            new SystemRoutes(),

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
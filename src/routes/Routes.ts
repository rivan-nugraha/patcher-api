import RoutesCollection from "./collections/RouteCollections";

import BarangRoutes from "./masters/Barang/BarangRoutes";
import { SystemRoutes } from "./system/SystemRoutes";

class Routes{
    private routeBuilders: any[];
    public emitter: any;
    constructor(){
        this.routeBuilders = [
            new BarangRoutes(),
            new SystemRoutes(),
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
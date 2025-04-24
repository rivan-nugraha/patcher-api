import DashboardController from "../../controllers/system/DashboardController";
import RouteBase from "../base/RouteBase";

export default class DashboardRoutes extends RouteBase {
    private baseUri: string = "/dashboard"
    constructor () {
        super(DashboardController);
    }

    getRoutes () {
        this.buildRoute(this.baseUri+"/getOne", "get", "getData", true);
        // this.buildRoute(this.baseUri, "get", "getData", true);

        return this.routes;
    }
}
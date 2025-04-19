import { AuthController } from "../../controllers/auth/AuthController";
import RouteBase from "../base/RouteBase";

export default class AuthRoutes extends RouteBase {
    private baseUri: string = "/auth";
    constructor () {
        super(AuthController);
    }

    getRoutes () {
        this.buildRoute(this.baseUri, "post", "loginUser", false);
        this.buildRoute(this.baseUri+"/add-super-user", "post", "addSuperUser", false);
        return this.routes;
    }
}
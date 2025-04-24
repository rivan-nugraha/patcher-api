import UserController from "../../controllers/masters/UserController";
import RouteBase from "../base/RouteBase";

export default class UserRoutes extends RouteBase {
    private base: string = "/user";
    constructor() {
        super(UserController);
    }

    getRoutes () {
        this.buildRoute(this.base, "get", "getUser", false);
        this.buildRoute(this.base, "post", "createUser", false);
        this.buildRoute(this.base + "/:_id", "put", "updateUser", false);
        this.buildRoute(this.base + "/:_id", "delete", "deleteUser", false);

        return this.routes
    }
}
import StoreController from "../../controllers/masters/StoreController";
import RouteBase from "../base/RouteBase";

export default class StoreRoutes extends RouteBase {
    private base: string = "/store"
    constructor () {
        super(StoreController);
    }

    getRoutes () {
        this.buildRoute(this.base, "get", "getStore", true);
        this.buildRoute(this.base, "post", "createStore", true);
        this.buildRoute(this.base + "/:_id", "put", "updateStore", true);
        this.buildRoute(this.base + "/:_id", "delete", "deleteStore", true);

        return this.routes;
    }
}
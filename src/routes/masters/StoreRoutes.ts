import StoreController from "../../controllers/masters/StoreController";
import RouteBase from "../base/RouteBase";

export default class StoreRoutes extends RouteBase {
    private base: string = "/store"
    constructor () {
        super(StoreController);
    }

    getRoutes () {
        this.buildRoute(this.base, "get", "getStore", false);
        this.buildRoute(this.base, "post", "createStore", false);
        this.buildRoute(this.base + "/:_id", "put", "updateStore", false);
        this.buildRoute(this.base + "/:_id", "delete", "deleteStore", false);

        return this.routes;
    }
}
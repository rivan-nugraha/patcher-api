import StoreGroupController from "../../controllers/masters/StoreGroupController";
import RouteBase from "../base/RouteBase";

export default class StoreGroupRoutes extends RouteBase {
    private base: string = "/store-group"
    constructor () {
        super(StoreGroupController)
    }

    getRoutes () {
        this.buildRoute(this.base, "get", "getStoreGroup", false);
        this.buildRoute(this.base, "post", "createStoreGroup", false);
        this.buildRoute(this.base + "/:_id", "put", "updateStoreGroup", false);
        this.buildRoute(this.base + "/:_id", "delete", "deleteStoreGroup", false);

        return this.routes;
    }
}
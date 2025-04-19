import DatabaseListController from "../../controllers/masters/DatabaseListController";
import RouteBase from "../base/RouteBase";

export default class DatabaseListRoutes extends RouteBase {
    private base: string = "/database-list";
    constructor () {
        super(DatabaseListController)
    }

    getRoutes () {
        this.buildRoute(this.base, "get", "getDatabaseList", false);
        this.buildRoute(this.base, "post", "createDatabaseList", false);
        this.buildRoute(this.base + "/:_id", "put", "updateDatabaseList", false);
        this.buildRoute(this.base + "/:_id", "delete", "deleteDatabaseList", false);

        return this.routes;
    }
}
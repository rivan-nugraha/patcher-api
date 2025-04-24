import DatabaseListController from "../../controllers/masters/DatabaseListController";
import RouteBase from "../base/RouteBase";

export default class DatabaseListRoutes extends RouteBase {
    private base: string = "/database-list";
    constructor () {
        super(DatabaseListController)
    }

    getRoutes () {
        this.buildRoute(this.base, "get", "getDatabaseList", true);
        this.buildRoute(this.base, "post", "createDatabaseList", true);
        this.buildRoute(this.base + "/:_id", "put", "updateDatabaseList", true);
        this.buildRoute(this.base + "/:_id", "delete", "deleteDatabaseList", true);

        return this.routes;
    }
}
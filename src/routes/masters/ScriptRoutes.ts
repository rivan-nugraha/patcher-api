import ScriptController from "../../controllers/masters/ScriptController";
import RouteBase from "../base/RouteBase";

export default class ScriptRoutes extends RouteBase {
    private baseUri: string = "/script";
    constructor () {
        super(ScriptController);
    }

    getRoutes () {
        this.buildRoute(this.baseUri, "get", "get", false);
        this.buildRoute(this.baseUri, "post", "save", false);
        this.buildRoute(this.baseUri + "/:_id", "put", "edit", false);
        this.buildRoute(this.baseUri + "/:_id", "delete", "delete", false);

        return this.routes;
    }
}
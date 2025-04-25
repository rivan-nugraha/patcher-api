import ProgramController from "../../controllers/masters/ProgramController";
import RouteBase from "../base/RouteBase";

export default class ProgramRoutes extends RouteBase {
    private baseUri: string = "/program";
    constructor () {
        super(ProgramController);
    }

    getRoutes () {
        this.buildRoute(this.baseUri, "get", "get", true);
        this.buildRoute(this.baseUri + "/getOne", "get", "getOne", true);
        this.buildRoute(this.baseUri, "post", "createProgram", true);
        this.buildRoute(this.baseUri + "/:_id", "put", "updateProgram", true);
        this.buildRoute(this.baseUri + "/:_id", "delete", "deleteProgram", true);

        return this.routes;
    }
}
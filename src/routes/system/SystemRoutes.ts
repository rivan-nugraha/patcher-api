import SystemController from "../../controllers/system/SystemController";
import RouteBase from "../base/RouteBase";

export class SystemRoutes extends RouteBase{
    constructor(){
        super(SystemController);
    }

    getRoutes(){
        this.buildRoute('/system/get', 'get', 'getSystem', false);
        this.buildRoute('/system/install', 'post', 'installSystem', true);

        return this.routes;
    }
}
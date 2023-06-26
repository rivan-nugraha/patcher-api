class RouteBase {
    public routes: any;
    private ControllerClass: any;

    constructor (controllerClass: any) {
        this.routes = [];
        this.ControllerClass = controllerClass;
    }

    buildRoute (uri: any, httpMethod: any, action: any, isSecure = false, isFile = false) {
        this.routes.push({
            controllerClass: this.ControllerClass,
            uri,
            httpMethod,
            action,
            isSecure,
            isFile
        });
    }
}

export default RouteBase;

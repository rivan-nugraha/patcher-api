class RoutesCollection {
    static routesCollection: any;
  
    static addRouteData (controller: any, action: any, routeData: any) {
      routeData.controller = controller.name;
      routeData.action = action;
  
      this.routesCollection = RoutesCollection;
      if (!this.routesCollection[controller.name]) this.routesCollection[controller.name] = {};
  
      this.routesCollection[controller.name] = Object.assign({}, this.routesCollection[controller.name], {
        [action]: routeData
      });
    }
  }
  
  export default RoutesCollection;
  
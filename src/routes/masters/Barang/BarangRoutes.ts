import BarangController from "../../../controllers/masters/Barang/BarangController"
import RouteBase from "../../base/RouteBase"


export default class BarangRoutes extends RouteBase{
    constructor(){
        super(BarangController);
    }

    getRoutes(){
        this.buildRoute('/barang', 'get', 'getBarang', true);
        this.buildRoute('/barang', 'post', 'insertBarang', true);
        return this.routes;
    }
}
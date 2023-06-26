import RepositoryBase from "./base/RepositoryBase";

// Masters
import BarangRepositories from "./masters/BarangRepositories/BarangRepositories";
import SystemRepositories from "./system/SystemRepositories";

class Repository{
    private _db: any;
    private _jf: any;
    private _service: any;

    public global: RepositoryBase;
    public barang: BarangRepositories;
    public system: SystemRepositories;

    constructor(db: any, jf: any, service: any){
        this._db = db;
        this._jf = jf;
        this._service = service;
    }

    registerRepositories(){
        this.global = new RepositoryBase(this._db, this._jf, this._service, []);
        this.barang = new BarangRepositories(this._db, this._jf, this._service);
        this.system = new SystemRepositories(this._db, this._jf, this._service);
    }
}

export default Repository;
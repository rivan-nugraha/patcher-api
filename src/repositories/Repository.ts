import RepositoryBase from "./base/RepositoryBase";

// Masters
import StoreGroupRepositories from "./masters/StoreGroupRepositories";
import StoreRepositories from "./masters/StoreRepositories";
import ScriptRepositories from "./masters/ScriptRepositories";
import DatabaseListRepositories from "./masters/DatabaseListRepositories";
import UserRepositories from "./masters/UserRepositories";

// Systems
import SystemRepositories from "./system/SystemRepositories";

// Transaction
import ExecutionRepository from "./transactions/ExecutionRepository";
import ProgramRepositories from "./masters/ProgramRepositories";

class Repository{
    private _db: any;
    private _jf: any;
    private _service: any;

    public global: RepositoryBase<unknown>;

    // Masters
    public storeGroup: StoreGroupRepositories;
    public store: StoreRepositories;
    public databaseList: DatabaseListRepositories;
    public script: ScriptRepositories;
    public user: UserRepositories
    public program: ProgramRepositories;

    // System
    public system: SystemRepositories;

    // Transaction
    public execution: ExecutionRepository;

    constructor(db: any, jf: any, service: any){
        this._db = db;
        this._jf = jf;
        this._service = service;
    }

    registerRepositories(){
        this.global = new RepositoryBase(this._db, this._jf, this._service, {}, undefined);
        
        // Masters
        this.storeGroup = new StoreGroupRepositories(this._db, this._jf, this._service);
        this.store = new StoreRepositories(this._db, this._jf, this._service);
        this.databaseList = new DatabaseListRepositories(this._db, this._jf, this._service);
        this.script = new ScriptRepositories(this._db, this._jf, this._service);
        this.user = new UserRepositories(this._db, this._jf, this._service);
        this.program = new ProgramRepositories(this._db, this._jf, this._service);

        // Systems
        this.system = new SystemRepositories(this._db, this._jf, this._service);

        // Transaction
        this.execution = new ExecutionRepository(this._db, this._jf, this._service);
    }
}

export default Repository;
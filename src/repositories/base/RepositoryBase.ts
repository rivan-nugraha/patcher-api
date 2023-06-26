import Services from "../../services/Services";

class RepositoryBase{
    public db: any;
    public jf: any;
    public sendColumn: any;
    public service: Services;

    constructor (db: any, jf: any, service: any, sendColumn: any) {
        this.db = db;
        this.jf = jf;
        this.service = service;
        this.sendColumn = sendColumn;
    }
}

export default RepositoryBase;
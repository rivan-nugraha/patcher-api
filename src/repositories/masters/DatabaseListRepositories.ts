import DatabaseList, { iDatabaseList } from "../../entities/masters/DatabaseListEntity/DatabaseList";
import RepositoryBase from "../base/RepositoryBase";

export default class DatabaseListRepositories extends RepositoryBase<iDatabaseList> {
    constructor (db: any, jf: any, service: any) {
        super(db, jf, service, {}, DatabaseList);
    } 
}
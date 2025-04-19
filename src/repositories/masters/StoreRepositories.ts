import Store, { iStore } from "../../entities/masters/StoreEntity/Store";
import RepositoryBase from "../base/RepositoryBase";

export default class StoreRepositories extends RepositoryBase<iStore>{
    constructor (db: any, jf: any, service: any) {
        super(db, jf, service, {}, Store);
    }
}
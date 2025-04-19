import StoreGroup, { iStoreGroup } from "../../entities/masters/StoreGroupEntity/StoreGroup";
import RepositoryBase from "../base/RepositoryBase";

export default class StoreGroupRepositories extends RepositoryBase<iStoreGroup> {
    constructor (db: any, jf: any, service: any) {
        const sendColumn = {}
        super(db, jf, service, sendColumn, StoreGroup)
    }
}
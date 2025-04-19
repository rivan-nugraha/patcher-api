import User, { iUser } from "../../entities/masters/UserEntity/User";
import RepositoryBase from "../base/RepositoryBase";

export default class UserRepositories extends RepositoryBase<iUser> {
    constructor (db: any, jf: any, service: any) {
        super(db, jf, service, {}, User)
    }
}
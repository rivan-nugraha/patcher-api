import Program, { iProgram } from "../../entities/masters/ProgramEntity/Program";
import RepositoryBase from "../base/RepositoryBase";

export default class ProgramRepositories extends RepositoryBase<iProgram>{
    constructor (db: any, jf: any, service: any) {
        super(db, jf, service, {}, Program);
    }
}
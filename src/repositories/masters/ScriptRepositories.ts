import Script, { iScript } from "../../entities/masters/ScriptEntity/Script";
import RepositoryBase from "../base/RepositoryBase";

export default class ScriptRepositories extends RepositoryBase<iScript> {
    constructor (db: any, jf: any, service: any) {
        super(db, jf, service, {}, Script);
    }

    async generateScriptCode (): Promise<string> {
        let initialCode = "SC000000001"
        const exists: iScript = (await this.genericModel.aggregate([{ $sort: { script_code: -1 } }]))[0];
        if (exists) {
            const next = Number(exists.script_code.slice(-1, exists.script.length)) + 1;
            initialCode = "SC" + String(next).padStart(9, "0")
        }
        return initialCode;
    }
}
import { FilterQuery } from "mongoose";
import { iScript } from "../../entities/masters/ScriptEntity/Script";
import ControllerBase from "../base/ControllerBase";

export default class ScriptController extends ControllerBase {
    async save () {
        try {
            const newCode = await this.repository.script.generateScriptCode();
            const newScript: iScript = {
                script_code: newCode,
                script_title: this.body.script_title,
                script_desc: this.body.script_desc,
                script: this.body.script,
                status_verify: false,
                rejected: false,
            }

            await this.repository.script.save(newScript);
            return this.success("Created");   
        } catch (error) {
            return this.error(error);
        }
    }

    async get () {
        try {
            const query = this._buildQuery(this.query);
            const data = await this.repository.script.findBy(query);

            return this.success(data);
        } catch (error) {
            return this.error(error);
        }
    }

    async edit () {
        try {
            const param = this._buildQuery(this.params);
            const body: Partial<iScript> = this.body;
            const exists = await this.repository.script.findOne(param);
            if (!exists) throw new Error("Script Not Found");

            await this.repository.script.updateOne(param, body);

            return this.success("Edited");
        } catch (error) {
            return this.error(error);
        }
    }

    async delete () {
        try {
            const param = this._buildQuery(this.params);
            const exists = await this.repository.script.findOne(param);
            if (!exists) throw new Error("Script Not Found");

            await this.repository.script.deleteOne(param);

            return this.success("Deleted");
        } catch (error) {
            return this.error(error);
        }
    }

    private _buildQuery (param: any): FilterQuery<Partial<iScript>> {
        const query: FilterQuery<Partial<iScript>> = {};

        if (param._id) query._id = param._id;
        if (param.script_code) query.script_code = param.script_code;
        if (param.script_title) query.script_title = param.script_title;
        if (param.rejected) query.rejected = param.rejected === "true";
        if (param.status_verify) query.status_verify = param.status_verify === "true";

        return query;
    }
}
import { model, Model, Schema } from "mongoose";

export interface iScript {
    _id?: string;
    script_code: string;
    script_title: string;
    script_desc: string;
    script: string;
    status_verify: boolean;
    rejected: boolean;
}

class ScriptEntity {
    public Script: typeof Model;
    constructor () {
        const ScriptSchema = new Schema<iScript>({
            script_code: String,
            script_title: String,
            script_desc: String,
            script: String,
            status_verify: Boolean,
            rejected: Boolean,
        });

        ScriptSchema.index({ script_code: 1 }, { unique: true });
        this.Script = model("tm_script", ScriptSchema, "tm_script");
    }
}

const Script = new ScriptEntity().Script;
export default Script;
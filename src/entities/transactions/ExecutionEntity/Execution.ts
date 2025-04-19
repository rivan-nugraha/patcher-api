import { model, Model, Schema } from "mongoose";
import { iScript } from "../../masters/ScriptEntity/Script";
import { iStore } from "../../masters/StoreEntity/Store";

export interface iExecution {
    _id?: string;
    store_code: string;
    script_code: string;
    exec_date: Date;
    status_exec: string;
    failed_reason: string;
    execute_by: string;

    script?: iScript;
    store?: iStore;
}

class ExecutionEntity {
    public Execution: typeof Model;
    constructor () {
        const ExecutionSchema = new Schema<iExecution>({
            store_code: String,
            script_code: String,
            exec_date: Date,
            status_exec: String,
            failed_reason: String,
            execute_by: String,
        });

        this.Execution = model("tt_execution", ExecutionSchema, "tt_execution");
    }
}

const Execution = new ExecutionEntity().Execution;
export default Execution;
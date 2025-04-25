import { model, Model, Schema } from "mongoose";

export interface iProgram {
    _id?: string;
    program_code: string;
    program_name: string;
}

class ProgramEntity {
    public Program: typeof Model;
    constructor () {
        const ProgramSchema = new Schema<iProgram>({
            program_code: String,
            program_name: String,
        });

        ProgramSchema.index({ program_code: 1 }, { unique: true });
        this.Program = model("tm_program", ProgramSchema, "tm_program");
    }
}

const Program = new ProgramEntity().Program;
export default Program;
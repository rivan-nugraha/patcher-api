import { FilterQuery } from "mongoose";
import { iProgram } from "../../entities/masters/ProgramEntity/Program";
import ControllerBase from "../base/ControllerBase";

export default class ProgramController extends ControllerBase {
    async createProgram () {
        const body: iProgram = this.body;
        try {
            await this.repository.program.save(body);
            return this.success("Program Created")
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    async get () {
        try {
            const query = this._buildQuery(this.query);
            const result = await this.repository.program.findBy(query);
            return this.success(result);
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    async getOne () {
        try {
            const query = this._buildQuery(this.query);
            const result = (await this.repository.program.findBy(query))[0];
            return this.success(result);
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    async updateProgram () {
            const param = this.params;
            const query = this._buildQuery(param);
            const body: Partial<iProgram> = this.body;
            try {
                await this.repository.program.updateOne(query, body);
                return this.success("Edited")
            } catch (error) {
                this.logger.error(error);
                return this.error(error);
            }
        }
    
    async deleteProgram () {
        const param = this.params;
        const query = this._buildQuery(param);
        try {
            await this.repository.program.deleteOne(query);
            return this.success("Deleted")
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    private _buildQuery (param: Partial<iProgram>): FilterQuery<Partial<iProgram>> {
        const query: FilterQuery<Partial<iProgram>> = {}
        if (param._id) query._id = param._id
        if (param.program_code) query.program_code = param.program_code;

        return query;
    }
}
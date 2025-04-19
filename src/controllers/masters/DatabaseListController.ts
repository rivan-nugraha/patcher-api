import { FilterQuery } from "mongoose";
import { iDatabaseList } from "../../entities/masters/DatabaseListEntity/DatabaseList";
import ControllerBase from "../base/ControllerBase";

export default class DatabaseListController extends ControllerBase {
    async createDatabaseList () {
        const body: iDatabaseList = this.body;
        try {
            await this.repository.databaseList.save(body);
            return this.success("Created")
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    async getDatabaseList () {
        try {
            const query = this._buildQuery(this.query);
            const result = await this.repository.databaseList.findBy(query);
            return this.success(result);
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    async updateDatabaseList () {
        const param = this.params;
        const query = this._buildQuery(param);
        const body: iDatabaseList = this.body;
        try {
            await this.repository.databaseList.updateOne(query, body);
            return this.success("Edited")
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    async deleteDatabaseList () {
        const param = this.params;
        const query = this._buildQuery(param);
        try {
            await this.repository.databaseList.deleteOne(query);
            return this.success("Deleted")
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    private _buildQuery (param: Partial<iDatabaseList>): FilterQuery<Partial<iDatabaseList>> {
        const query: FilterQuery<Partial<iDatabaseList>> = {};
        if (param._id) query._id = param._id;
        if (param.code_url) query.code_url = param.code_url;

        return query;
    }
}
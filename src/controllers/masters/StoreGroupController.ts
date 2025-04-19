import { FilterQuery } from "mongoose";
import { iStoreGroup } from "../../entities/masters/StoreGroupEntity/StoreGroup";
import ControllerBase from "../base/ControllerBase";

export default class StoreGroupController extends ControllerBase {
    async createStoreGroup () {
        const body: iStoreGroup = this.body;
        try {
            await this.repository.storeGroup.save(body);
            return this.success("Created")
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    async getStoreGroup () {
        try {
            const query = this._buildQuery(this.query);
            const result = await this.repository.storeGroup.findBy(query);
            return this.success(result);
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    async updateStoreGroup () {
        const param = this.params;
        const query = this._buildQuery(param);
        const body: iStoreGroup = this.body;
        try {
            await this.repository.storeGroup.updateOne(query, body);
            return this.success("Edited")
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    async deleteStoreGroup () {
        const param = this.params;
        const query = this._buildQuery(param);
        try {
            await this.repository.storeGroup.deleteOne(query);
            return this.success("Deleted")
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    private _buildQuery (param: Partial<iStoreGroup>): FilterQuery<Partial<iStoreGroup>> {
        const query: FilterQuery<Partial<iStoreGroup>> = {};
        if (param._id) query._id = param._id;
        if (param.group_code) query.group_code = param.group_code;
        if (param.group_name) query.group_name = param.group_name;
        return query;
    }
}
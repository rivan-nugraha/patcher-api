import { FilterQuery } from "mongoose";
import { iStore } from "../../entities/masters/StoreEntity/Store";
import ControllerBase from "../base/ControllerBase";

export default class StoreController extends ControllerBase {
    async createStore () {
        const body: iStore = this.body;
        try {
            await this.repository.store.save(body);
            return this.success("Created")
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    async getStore () {
        try {
            const query = this._buildQuery(this.query);
            const result = await this.repository.store.findBy(query);
            return this.success(result);
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    async updateStore () {
        const param = this.params;
        const query = this._buildQuery(param);
        const body: iStore = this.body;
        try {
            await this.repository.store.updateOne(query, body);
            return this.success("Edited")
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    async deleteStore () {
        const param = this.params;
        const query = this._buildQuery(param);
        try {
            await this.repository.store.deleteOne(query);
            return this.success("Deleted")
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    private _buildQuery (param: Partial<iStore>): FilterQuery<Partial<iStore>> {
        const query: FilterQuery<Partial<iStore>> = {};
        if (param._id) query._id = param._id;
        if (param.store_code) query.store_code = param.store_code;
        if (param.store_name) query.store_name = param.store_name;
        if (param.store_group) query.store_group = param.store_group;
        return query;
    }
}
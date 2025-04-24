import { FilterQuery } from "mongoose";
import { iUser } from "../../entities/masters/UserEntity/User";
import ControllerBase from "../base/ControllerBase";

export default class UserController extends ControllerBase {
    async createUser () {
        const body: iUser = this.body;
        try {
            const user: iUser = {
                ...body,
                password: await this.repository.global.service.userService.hashPassword(body.password),
            }
            await this.repository.user.save(user);
            return this.success("Created");
        } catch (error) {
            this.logger.error(error)
            return this.error(error);
        }
    }

    async getUser () {
        try {
            const query = this._buildQuery(this.query);
            const result = await this.repository.user.findBy(query);
            return this.success(result);
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    async updateUser () {
        const query = this._buildQuery(this.params);
        const body: Partial<iUser> = this.body;
        try {
            await this.repository.user.updateOne(query, body);
            return this.success("Edited")
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    async deleteUser () {
        const query = this._buildQuery(this.params);
        try {
            await this.repository.user.deleteOne(query);
            return this.success("Deleted");
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    private _buildQuery (param: Partial<iUser>): FilterQuery<Partial<iUser>> {
        const query: FilterQuery<Partial<iUser>> = {};
        if (param._id) query._id = param._id;
        if (param.username) query.username = param.username;

        return query;
    }
}
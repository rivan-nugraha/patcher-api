import { iUser } from "../../entities/masters/UserEntity/User";
import SuperUserData from "../../constant/mock/super-user.mock";
import ControllerBase from "../base/ControllerBase";

export class AuthController extends ControllerBase {
    async loginUser () {
        try {
            const user = await this.repository.user.findOne({ username: this.body.username });
            if (!user) throw new Error("Username Atau Password Salah");
            const matchedPassword = await this.repository.global.service.userService.comparePassword(
                this.body.password,
                user
            )
            if (!matchedPassword) throw new Error("Username Atau Password Salah");
            const token = this.repository.global.service.security.generateToken(user);
            if (!token) {
                throw new Error("Try Again");
            }

            const result = {
                username: user.username,
                division: user.division,
                name: user.name,
                token,
            }

            if (process.env.MODE_API === "production") {
                await this.repository.global.service.cache.storeCache(result);
            }

            return this.success(result);
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    async addSuperUser () {
        try {
            const exists = await this.repository.user.findOne({ username: SuperUserData.username });
            if (exists) {
                throw new Error("Super User Is Exists");
            }
            const user: iUser = {
                ...SuperUserData,
                password: await this.repository.global.service.userService.hashPassword(SuperUserData.password),
            };

            await this.repository.user.save(user);
            return this.success("Success Create Super User");
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }
}
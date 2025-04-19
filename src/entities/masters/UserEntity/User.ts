import { model, Model, Schema } from "mongoose";

export interface iUser {
    username: string;
    password: string;
    name: string;
    division: string;
}

class UserEntity {
    public User: typeof Model;
    constructor () {
        const UserSchema = new Schema<iUser>({
            username: { type: String, required: true },
            password: { type: String, required: true },
            name: { type: String, required: true },
            division: { type: String, required: true },
        });

        UserSchema.index({ username: 1 }, { unique: true })
        this.User = model("tm_user", UserSchema, "tm_user");
    }
}

const User = new UserEntity().User;
export default User;
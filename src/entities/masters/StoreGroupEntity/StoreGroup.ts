import { model, Model, Schema } from "mongoose";

export interface iStoreGroup {
    _id?: string;
    group_code: string;
    group_name: string;
}

class StoreGroupEntity {
    public StoreGroup: typeof Model;
    constructor () {
        const StoreGroupSchema = new Schema<iStoreGroup>({
            group_code: {type: String, required: true},
            group_name: {type: String, required: true},
        });

        StoreGroupSchema.index({ group_code: 1 }, { unique: true });

        this.StoreGroup = model("tm_store_group", StoreGroupSchema, "tm_store_group");
    }
}

const StoreGroup = new StoreGroupEntity().StoreGroup;
export default StoreGroup;
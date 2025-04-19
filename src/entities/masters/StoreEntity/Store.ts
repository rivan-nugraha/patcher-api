import { model, Model, Schema } from "mongoose";

export interface iStore {
    _id?: string;
    store_code: string;
    url_code: string;
    store_group: string;
    store_name: string;
    db_name: string;
}

class StoreEntity {
    public Store: typeof Model;
    constructor () {
        const StoreSchema = new Schema<iStore>({
            store_code: {type: String, required: true},
            url_code: {type: String, required: true},
            store_group: {type: String, required: true},
            store_name: {type: String, required: true},
            db_name: {type: String, required: true}
        });

        StoreSchema.index({ store_code: 1 }, { unique: true })
        this.Store = model("tm_store", StoreSchema, "tm_store")
    }
}

const Store = new StoreEntity().Store;
export default Store;
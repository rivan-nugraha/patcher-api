import { model, Model, Schema } from "mongoose";

export interface iDatabaseList {
    _id?: string;
    code_url: string;
    name_cluster: string;
    connection_url: string;
}

class DatabaseListEntity {
    public DatabaseList: typeof Model;
    constructor () {
        const DatabaseListSchema = new Schema<iDatabaseList>({
            code_url: { type: String, required: true },
            name_cluster: { type: String, required: true },
            connection_url: { type: String, required: true },
        });

        DatabaseListSchema.index({ store_code: 1 }, { unique: true });
        this.DatabaseList = model("tm_database_list", DatabaseListSchema, "tm_database_list");
    }
}

const DatabaseList = new DatabaseListEntity().DatabaseList;
export default DatabaseList;
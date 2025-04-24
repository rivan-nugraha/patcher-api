import { FilterQuery, Model } from "mongoose";
import Services from "../../services/Services";

class RepositoryBase<T>{
    public db: any;
    public jf: any;
    public sendColumn: any;
    public service: Services;
    public genericModel: typeof Model<T>;

    constructor (db: any, jf: any, service: any, sendColumn: any, model: typeof Model) {
        this.db = db;
        this.jf = jf;
        this.service = service;
        this.sendColumn = sendColumn;
        this.genericModel = model;
    }

    async findOne (identifier: FilterQuery<T>): Promise<T> {
        const result = await this.genericModel.findOne(identifier).lean();
        return result as T;
    }

    async save (data: T) {
        try {
            const newData = new this.genericModel(data);
            return await newData.save();
        } catch (error) {
            if (error.code === 11000) {
                const duplicatedField = Object.keys(error.keyValue)[0];
                const duplicatedValue = error.keyValue[duplicatedField];
                throw new Error(`Duplicate ${duplicatedValue}`);
            }
            throw error; 
        }
    }

    async findBy(identifier: FilterQuery<Partial<T>>): Promise<T[]> {
        const result = await this.genericModel.find(identifier).lean();
        return result;
    }

    async updateOne(identifier: FilterQuery<Partial<T>>, data: Partial<T>) {
        try {
            return await this.genericModel.updateOne(identifier, { $set: data });
        } catch (error) {
            if (error.code === 11000) {
                const duplicatedField = Object.keys(error.keyValue)[0];
                const duplicatedValue = error.keyValue[duplicatedField];
                throw new Error(`Duplicate ${duplicatedValue}`);
            }
            throw error; 
        }
    }

    async updateMeny(identifier: FilterQuery<Partial<T>>, data: Partial<T>) {
        try {
            return await this.genericModel.updateMany(identifier, { $set: data });
        } catch (error) {
            if (error.code === 11000) {
                const duplicatedField = Object.keys(error.keyValue)[0];
                const duplicatedValue = error.keyValue[duplicatedField];
                throw new Error(`Duplicate ${duplicatedValue}`);
            }
            throw error; 
        }
    }

    async deleteOne(identifier: FilterQuery<Partial<T>>) {
        return await this.genericModel.deleteOne(identifier);
    }

    async deleteMany(identifier: FilterQuery<Partial<T>>) {
        return await this.genericModel.deleteMany(identifier);
    }
}

export default RepositoryBase;
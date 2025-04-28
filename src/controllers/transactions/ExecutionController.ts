import iHistory from "../../interface/history.interface";
import { iExecution } from "../../entities/transactions/ExecutionEntity/Execution";
import ControllerBase from "../base/ControllerBase";
import { FilterQuery } from "mongoose";
import { MongoClient } from 'mongodb';

export default class ExecutionController extends ControllerBase {
    async execute () {
        try {
            const allPromises: Promise<void>[] = [];

            const getStore = await this.repository.store.findOne({ store_code: this.body.store_code });
            if (!getStore) throw new Error("Store Not Found");
            
            const getUri = await this.repository.databaseList.findOne({ code_url: getStore.url_code });
            if (!getUri) throw new Error("URI Not Found");

            const getScript = await this.repository.script.findOne({ script_code: this.body.script_code });
            if (!getScript) throw new Error("Script Not Found");

            const client = new MongoClient(getUri.connection_url);
            await client.connect();

            const promise = this._executeAndSaveStatus(client, getStore, getScript);
            allPromises.push(promise);
            await Promise.all(allPromises);

            return this.success("Success Execute")
        } catch (error) {
            const statusExec: iExecution = {
                store_code: this.body.store_code,
                script_code: this.body.script_code,
                exec_date: new Date(),
                status_exec: "FAILED",
                failed_reason: error,
                execute_by: this.user.name,
            };
            await this.repository.execution.save(statusExec);
            return this.error(error);
        }
    }

    async executeStore () {
        const { group_code, script_code, store_code } = this.body;
        try {
            if (store_code === "ALL" || store_code === "all") {
                await this._patchGroupedStore(group_code, script_code);
            } else {
                await this._patchSingleStore(store_code, script_code);
            }
            return this.success("Success Patched");
        } catch (error) {
            return this.error(error);
        }
    }

    private async _patchSingleStore (store_code: string, script_code: string[]): Promise<void> {
        const getScript = await this.repository.script.findBy({ script_code: script_code });
        if (!getScript.length) {
            throw new Error("Scripts Not Found");
        }
        
        const getStore = await this.repository.store.findOne({ store_code });
        if (!getStore) {
            throw new Error("Store Not Found")
        }

        const getUri = await this.repository.databaseList.findOne({ code_url: getStore.url_code });
        if (!getUri) {
            throw new Error("URI Not Found");
        }

        console.log(getUri);

        const allPromises: Promise<void>[] = [];

        const client = new MongoClient(getUri.connection_url);
        await client.connect();
        for (const script of getScript) {
            const promise = this._executeAndSaveStatus(client, getStore, script);
            allPromises.push(promise);
        }
        
        await Promise.all(allPromises);
    }

    private async _patchGroupedStore (group_code: string, script_code: string[]): Promise<void> {
        const getStore = await this.repository.store.findBy({ store_group: group_code });
        if (!getStore.length) {
            throw new Error("Stores Not Found");
        }

        const getScript = await this.repository.script.findBy({ script_code: {$in: script_code} });
        if (!getScript.length) {
            throw new Error("Scripts Not Found");
        }

        const allPromises: Promise<void>[] = [];

        for (const store of getStore) {
            const getUri = await this.repository.databaseList.findOne({ code_url: store.url_code });
            if (!getUri) {
                throw new Error("URI Not Found");
            }
            const client = new MongoClient(getUri.connection_url);
            await client.connect();

            for (const script of getScript) {
                const promise = this._executeAndSaveStatus(client, store, script);
                allPromises.push(promise);
            }
        }

        await Promise.all(allPromises);
    }

    async executeTest() {
        try {
            const allPromises: Promise<void>[] = [];

            const getScript = await this.repository.script.findOne({ script_code: this.body.script_code });
            if (!getScript) throw new Error("Script Not Found");

            const getStoreGroup = await this.repository.storeGroup.findOne({ script_code: { $in: ["NQC", "GQC", "PQC"] }, program_code: getScript.program_code },)

            const getStore = await this.repository.store.findOne({ store_code: { $in: ["NQC", "GQC", "PQC"] }, store_group: getStoreGroup.group_code });
            if (!getStore) throw new Error("Store Not Found");
            
            const getUri = await this.repository.databaseList.findOne({ code_url: getStore.url_code });
            if (!getUri) throw new Error("URI Not Found");

            const client = new MongoClient(getUri.connection_url);
            await client.connect();

            const promise = this._executeAndSaveStatus(client, getStore, getScript, true);
            allPromises.push(promise);

            await Promise.all(allPromises);
            return this.success("Success Execute")
        } catch (error) {
            const statusExec: iExecution = {
                store_code: "NQC",
                script_code: this.body.script_code,
                exec_date: new Date(),
                status_exec: "FAILED",
                failed_reason: error,
                execute_by: this.user.name,
            };

            await this.repository.script.updateOne({ script_code: this.body.script_code }, { rejected: true });
            await this.repository.execution.save(statusExec);
            return this.error(error);
        }
    }

    async history () {
        try {
            const query = this._buildQuery(this.query);
            const getData = await this.repository.execution.findByPopulated(query);
            const result: iHistory[] = getData.map((data) => {
                return {
                    ...data,
                    store_name: data.store.store_name,
                    script_title: data.script.script_title,
                }
            });
            return this.success(result);
        } catch (error) {
            this.logger.error(error);
            return this.error(error);
        }
    }

    private async _executeAndSaveStatus(client: MongoClient, store: any, script: any, isTest: boolean = false): Promise<void> {
        const result = await this.repository.global.service.scriptRunner.execute(client, store.db_name, script.script);
        console.log(result);
        const statusExec: iExecution = {
            store_code: store.store_code,
            script_code: script.script_code,
            exec_date: new Date(),
            status_exec: result === "200" ? isTest ? "SUCCESS TEST" : "SUCCESS" : "FAILED",
            failed_reason: result === "200" ? "-" : "Execution Failed",
            execute_by: this.user.name,
        };
        await this.repository.execution.save(statusExec);
    }

    _buildQuery (param: any): FilterQuery<iExecution> {
        const query: FilterQuery<iExecution> = {};
        if (param.exec_date) {
            const localDate = new Date(`${param.exec_date.split("T")[0]}T17:00:00+07:00`);
            
            // Awal hari (00:00:00)
            const startOfDay = new Date(localDate)
            startOfDay.setUTCHours(0, 0, 0, 0);

            // Akhir hari (23:59:59)
            const endOfDay = new Date(localDate)
            endOfDay.setUTCHours(23, 59, 59, 999);
            query.exec_date = {
                $gte: startOfDay,
                $lte: endOfDay,
            }
        }

        if (param.store_code && param.store_code !== "ALL") {
            query.store_code = param.store_code;
        }

        if (param.script_code && param.script_code !== "ALL"){
            query.script_code = param.script_code;
        }
        return query;
    }
}
import iHistory from "../../interface/history.interface";
import { iExecution } from "../../entities/transactions/ExecutionEntity/Execution";
import ControllerBase from "../base/ControllerBase";
import { FilterQuery } from "mongoose";

export default class ExecutionController extends ControllerBase {
    async execute () {
        try {
            const getStore = await this.repository.store.findOne({ store_code: this.body.store_code });
            if (!getStore) throw new Error("Store Not Found");
            
            const getUri = await this.repository.databaseList.findOne({ code_url: getStore.url_code });
            if (!getUri) throw new Error("URI Not Found");

            const getScript = await this.repository.script.findOne({ script_code: this.body.script_code });
            if (!getScript) throw new Error("Script Not Found");

            await this.repository.global.service.scriptRunner.execute(getUri.connection_url, getScript.script, getStore.db_name);
            const statusExec: iExecution = {
                store_code: getStore.store_code,
                script_code: getScript.script_code,
                exec_date: new Date(),
                status_exec: "SUCCESS",
                failed_reason: "-",
                execute_by: this.user.name,
            };

            await this.repository.execution.save(statusExec);
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
        const getStore = await this.repository.store.findOne({ store_code });
        if (!getStore) {
            throw new Error("Store Not Found")
        }

        const getScript = await this.repository.script.findBy({ script_code: script_code });
            if (!getScript.length) {
                throw new Error("Scripts Not Found");
        }

        for (const script of getScript) {
            const getUri = await this.repository.databaseList.findOne({ code_url: getStore.url_code });
            if (!getUri) {
                throw new Error("URI Not Found");
            }

            const result = await this.repository.global.service.scriptRunner.execute(getUri.connection_url, script.script, getStore.db_name);
            if (result === "200") {
                const statusExec: iExecution = {
                    store_code: getStore.store_code,
                    script_code: script.script_code,
                    exec_date: new Date(),
                    status_exec: "SUCCESS",
                    failed_reason: "-",
                    execute_by: this.user.name,
                };

                await this.repository.execution.save(statusExec);
            } else {
                const statusExec: iExecution = {
                    store_code: getStore.store_code,
                    script_code: script.script_code,
                    exec_date: new Date(),
                    status_exec: "FAILED",
                    failed_reason: "-",
                    execute_by: this.user.name,
                };
                await this.repository.execution.save(statusExec);
            }
        }
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
        for (const store of getStore) {
            const getUri = await this.repository.databaseList.findOne({ code_url: store.url_code });
            if (!getUri) {
                throw new Error("URI Not Found");
            }

            for (const script of getScript) {
                const result = await this.repository.global.service.scriptRunner.execute(getUri.connection_url, script.script, store.db_name);
                if (result === "200") {
                    const statusExec: iExecution = {
                        store_code: store.store_code,
                        script_code: script.script_code,
                        exec_date: new Date(),
                        status_exec: "SUCCESS",
                        failed_reason: "-",
                        execute_by: this.user.name,
                    };
    
                    await this.repository.execution.save(statusExec);
                } else {
                    const statusExec: iExecution = {
                        store_code: store.store_code,
                        script_code: script.script_code,
                        exec_date: new Date(),
                        status_exec: "FAILED",
                        failed_reason: "-",
                        execute_by: this.user.name,
                    };
                    await this.repository.execution.save(statusExec);
                }
            }
        }
    }

    async executeTest() {
        try {
            const getStore = await this.repository.store.findOne({ store_code: "NQC" });
            if (!getStore) throw new Error("Store Not Found");
            
            const getUri = await this.repository.databaseList.findOne({ code_url: getStore.url_code });
            if (!getUri) throw new Error("URI Not Found");

            const getScript = await this.repository.script.findOne({ script_code: this.body.script_code });
            if (!getScript) throw new Error("Script Not Found");

            await this.repository.global.service.scriptRunner.execute(getUri.connection_url, getScript.script, getStore.db_name);
            const statusExec: iExecution = {
                store_code: getStore.store_code,
                script_code: getScript.script_code,
                exec_date: new Date(),
                status_exec: "SUCCESS TEST",
                failed_reason: "-",
                execute_by: this.user.name,
            };

            await this.repository.execution.save(statusExec);
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

    _buildQuery (param: Partial<iExecution>): FilterQuery<iExecution> {
        const query: FilterQuery<iExecution> = {};
        if (param.exec_date) {
            const localDate = new Date(`${param.exec_date.toString().split(" ")[0]}T17:00:00+07:00`);
            
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
        return query;
    }
}
import { iStoreGroup } from "../../entities/masters/StoreGroupEntity/StoreGroup";
import { iStore } from "../../entities/masters/StoreEntity/Store";
import { iScript } from "../../entities/masters/ScriptEntity/Script";
import ControllerBase from "../base/ControllerBase";
import iHistory from "../../interface/history.interface";
import { FilterQuery } from "mongoose";
import { iExecution } from "../../entities/transactions/ExecutionEntity/Execution";
import iDashboard from "../../interface/dashboard.interface";

export default class DashboardController extends ControllerBase {
    async getData () {
        try {
            const countStore = (await this.getStore()).length;
            const countStoreGroup = (await this.getStoreGroup()).length;
            const countVerifiedScript = (await this.getVerfiiedScript()).length;
            const countUnverifiedScript = (await this.getUnverifiedScript()).length;
            const history = await this.getHistory();
    
            const result: iDashboard = {
                store: countStore,
                store_group: countStoreGroup,
                verified_script: countVerifiedScript,
                unverified_script: countUnverifiedScript,
                history
            };
    
            return this.success(result);   
        } catch (error) {
            return this.error(error)
        }
    }

    private async getStore (): Promise<iStore[]> {
        const store = await this.repository.store.findBy({});
        return store;
    }

    private async getStoreGroup (): Promise<iStoreGroup[]> {
        const storeGroup = await this.repository.storeGroup.findBy({});
        return storeGroup;
    }

    private async getVerfiiedScript (): Promise<iScript[]> {
        const script = await this.repository.script.findBy({ status_verify: true, rejected: false });
        return script;
    }

    private async getUnverifiedScript (): Promise<iScript[]> {
        const script = await this.repository.script.findBy({ status_verify: false, rejected: false });
        return script;
    }

    private async getHistory (): Promise<iHistory[]> {
        const query: FilterQuery<iExecution> = {};
        const localDate = new Date();
            
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
        const execution = await this.repository.execution.findByPopulated(query);

        const result: iHistory[] = execution.map((data) => {
            return {
                ...data,
                store_name: data.store.store_name,
                script_title: data.script.script_title,
            }
        });

        return result;
    }
}
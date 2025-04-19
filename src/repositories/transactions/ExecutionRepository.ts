import { FilterQuery, PipelineStage } from "mongoose";
import Execution, { iExecution } from "../../entities/transactions/ExecutionEntity/Execution";
import RepositoryBase from "../base/RepositoryBase";

export default class ExecutionRepository extends RepositoryBase<iExecution> {
    constructor (db: any, jf: any, service: any) {
        super(db, jf, service, {}, Execution);
    }

    async findByPopulated(identifier: FilterQuery<Partial<iExecution>>): Promise<iExecution[]> {
        const aggregate: PipelineStage[] = [];

        aggregate.push(
            {
                $match: identifier
            }
        );

        aggregate.push(
            {
                $lookup: {
                    from: 'tm_script',
                    localField: 'script_code',
                    foreignField: 'script_code',
                    as: 'script'
                }
            }
        );

        aggregate.push(
            {
                $unwind: {
                    path: '$script',
                    preserveNullAndEmptyArrays: true
                }
            }
        );

        aggregate.push(
            {
                $lookup: {
                    from: 'tm_store',
                    localField: 'store_code',
                    foreignField: 'store_code',
                    as: 'store'
                }
            }
        );

        aggregate.push(
            {
                $unwind: {
                    path: '$store',
                    preserveNullAndEmptyArrays: true
                }
            }
        );

        return this.genericModel.aggregate(aggregate);
    }
}
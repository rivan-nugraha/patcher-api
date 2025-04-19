export default interface iHistory {
    _id?: string;
    store_code: string;
    store_name: string;
    script_code: string;
    script_title: string;
    exec_date: Date;
    status_exec: string;
    failed_reason: string;
    execute_by: string;
}
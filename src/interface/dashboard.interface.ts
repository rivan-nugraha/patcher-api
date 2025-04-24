import iHistory from "./history.interface";

export default interface iDashboard {
    store: number,
    store_group: number,
    unverified_script: number,
    verified_script: number,
    history: iHistory[],
}
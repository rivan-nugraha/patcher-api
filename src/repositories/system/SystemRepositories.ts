import System, { iSystem } from "../../entities/system/System";
import RepositoryBase from "../base/RepositoryBase";
export default class SystemRepositories extends RepositoryBase<iSystem>{
    constructor(db:any, jf: any, service: any){
        const sendColumn = {
            tgl_system: '$tgl_system',
            kode_toko: '$kode_toko',
            nama_toko: '$nama_toko',
            alamat_toko: '$alamat_toko',
            no_telp: '$no_telp',
            no_whatsapp: '$no_whatsapp',
            installed_date: '$installed_date',
        };

        super(db, jf, service, sendColumn, System);
    }

    async getSystem(){
        const result = await this.genericModel.findOne().lean();
        return result;
    }

    async registerSystem(data: iSystem){
        const System = new this.genericModel(data);
        System.save();
        return `System Installed Successfull`;
    }
}
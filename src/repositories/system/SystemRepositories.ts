import { System } from "../../entities/system/System";
import RepositoryBase from "../base/RepositoryBase";

interface iSystem{
    tgl_system: string;
    kode_toko: string;
    nama_toko: string;
    alamat_toko: string;
    no_telp: string;
    no_whatsapp: string;
    installed_date: string;
}

export default class SystemRepositories extends RepositoryBase{
    private system: any;
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

        super(db, jf, service, sendColumn);
        this.system = new System;
    }

    async getSystem(){
        const result = await this.system.findOne().lean();
        return result;
    }

    async registerSystem(data: iSystem){
        const System = new this.system(data);
        System.save();
        return `System Installed Successfull`;
    }
}
import { Model, Schema, model } from 'mongoose';

export interface iSystem{
    _id?: string;
    kode_toko: string;
    nama_toko: string;
    alamat_toko: string;
    no_telp: string;
    no_whatsapp: string;
    installed_date: string;
}
class SystemEntity{
    public System: typeof Model;
    constructor(){
        const SystemSchema = new Schema<iSystem>({
            kode_toko: String,
            nama_toko: String,
            alamat_toko: String,
            no_telp: String,
            no_whatsapp: String,
            installed_date: String,
        });

        SystemSchema.index({tgl_system: 1}, {unique:true});
        this.System = model("tp_system", SystemSchema, "tp_system");
    }
}

const System = new SystemEntity().System;
export default System;
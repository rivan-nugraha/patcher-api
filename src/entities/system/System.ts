import { Schema, model } from 'mongoose';

export class System{
    constructor(){
        const SystemSchema = new Schema({
            tgl_system: String,
            kode_toko: String,
            nama_toko: String,
            alamat_toko: String,
            no_telp: String,
            no_whatsapp: String,
            installed_date: String,
        });

        SystemSchema.index({tgl_system: 1}, {unique:true});
        const System = model("tp_system", SystemSchema, "tp_system");

        return System;
    }
}
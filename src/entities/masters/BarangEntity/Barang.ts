import { Schema, model } from "mongoose";
import * as jf from 'joiful';

export class Barang{
    constructor(){
        const BarangSchema = new Schema({
            kode_barang: {type: String, require: true, unique: true},
            kode_barcode: {type: String, require: true, unique: true},
            nama_barang: {type: String, require: true}
        })

        BarangSchema.index({ kode_barcode: 1}, {unique: true});
        BarangSchema.index({ kode_barcode: -1}, { name: "Barcode Index" });
        const Barang = model("tm_barang", BarangSchema, "tm_barang");

        return Barang;
    }
}
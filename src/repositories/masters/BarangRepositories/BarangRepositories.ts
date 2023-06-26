import { Barang } from "../../../entities/masters/BarangEntity/Barang";
import RepositoryBase from "../../../repositories/base/RepositoryBase";

type iBarang = {
    kode_barang: string;
    kode_barcode: string;
    nama_barang: string;
}

class BarangRepositories extends RepositoryBase{
    private barang: any;
    constructor(db: any, jf: any, service: any){
        const sendColumn = {
            kode_barang: "$kode_barang",
            kode_barcode: "$kode_barcode",
            nama_barang: "$nama_barang",
        };

        super(db, jf, service, sendColumn);
        this.barang = new Barang;
    }

    async getBarang(){
        const result = await this.barang.find();
        return result;
    }

    async insertBarang(data: iBarang){
        const Barang = new this.barang(data);
        Barang.save();
        return `Barang Created`;
    }
}

export default BarangRepositories;
import ControllerBase from "../../base/ControllerBase";

class BarangController extends ControllerBase{
    async getBarang(){
        try {
            const result = await this.repository.barang.getBarang();
            return this.success(result);
        } catch (error) {
            return this.error(error);
        }
    }

    async insertBarang(){
        try {
            const data = {
                kode_barang: this.body.kode_barcode,
                kode_barcode: this.body.kode_barcode,
                nama_barang: this.body.nama_barang,
            }
            const result = await this.repository.barang.insertBarang(data);
            return this.success(result);
        } catch (error) {
            return this.error(error);
        }
    }
}

export default BarangController;
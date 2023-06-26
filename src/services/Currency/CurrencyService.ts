export class CurrencyService{
    async indonesiaRupiah(number: number){
        const changer = new Intl.NumberFormat("ko-KR");
        const currency = changer.format(number);
        return currency;
    }
}
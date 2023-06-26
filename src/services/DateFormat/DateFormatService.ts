import * as moment from 'moment-timezone';

export default class DateFormatService{
    private _months= [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];

    localDateTime () {
        const date = moment.tz(new Date(), "Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
        return date;
    }

    localDate () {
        const date = (moment.tz(new Date(), "Asia/Jakarta").format("YYYY-MM-DD") + " 00:00:00");
        return date;
    }

    localDateString (date: string | Date) {
        const tanggal = date ? new Date(date) : new Date();
        return moment.tz(tanggal, "Asia/Jakarta").format("YYYY-MM-DD");
    }

    localDateStringSecondFormat (date: string | Date) {
        const tanggal = date ? new Date(date) : new Date();
        return moment.tz(tanggal, "Asia/Jakarta").format("YYYYMMDD");
    }
    
    localDateStringIndonesia (date: string | Date) {
        const tanggal = date ? new Date(date) : new Date();
        return moment.tz(tanggal, "Asia/Jakarta").format("DD-MM-YYYY");
    }
}
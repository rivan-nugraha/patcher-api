import CacheData from "./Cache/CacheData";
import { CurrencyService } from "./Currency/CurrencyService";
import DateFormatService from "./DateFormat/DateFormatService";
import FormatStringObject from "./FormatStringObject/FormatStringObject";
import Logger from "./Logger/Logger";
import { SendPartialSocket } from "./PartialSocket/PartialSocket";
import Security from "./Security/Security";
import TransactionService from "./TransactionServices/TransactionServices";

class Services{
    private db: any;
    private variables: any;

    // Please Put This First
    public currency: CurrencyService;
    public logger: Logger;
    public cache: CacheData;
    public transactionService: TransactionService;
    public formatStringObject: FormatStringObject;
    public partialSocket: SendPartialSocket;
    public security: Security;
    public dateFormat: DateFormatService;

    constructor(db: any, variables: any){
        this.db = db;
        this.variables = variables;

        this.registerService()
    }

    registerService(){
        this.currency = new CurrencyService();
        this.logger = new Logger();
        this.cache = new CacheData();
        this.formatStringObject = new FormatStringObject();
        this.partialSocket = new SendPartialSocket(this.cache);
        this.security = new Security(this.variables, this.cache);
        this.dateFormat = new DateFormatService();
    };
}

export default Services;
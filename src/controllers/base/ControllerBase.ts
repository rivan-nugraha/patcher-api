import Repository from "../../repositories/Repository";
import Logger from "../../services/Logger/Logger";

class ControllerBase{
    public params: any;
    public query: any;
    public headers: any;
    public body: any;
    public send: any;
    public repository: Repository;
    public user: any;
    public res: any;
    public req: any;
    public io: any;
    public logger: Logger;

    constructor ({
      params,
      query,
      headers,
      body,
      send,
      repository,
      user,
      req,
      res,
      io
    }: any) {
      this.params = params;
      this.query = query;
      this.headers = headers;
      this.body = body;
      this.send = send;
      this.repository = repository;
      this.user = user;
      this.req = req;
      this.res = res;
      this.io = io;
      this.logger = new Logger();
    }

  error (err: any) {
    const status = err.statusCode || err.status;
    const statusCode = status || 500;

    const message = err.message || err;

    this.send(statusCode, message);
  }

  success (data: any) {
    this.send(200, data);
  }

  async createQueryRunner () {
    await this.repository.global.service.transactionService.createQueryRunner();
  }

  async releaseQueryRunner () {
    await this.repository.global.service.transactionService.releaseQueryRunner();
  }

  async startTransaction () {
    return await this.repository.global.service.transactionService.startTransaction();
  }

  async startTransactionV2 () {
    return await this.repository.global.service.transactionService.startTransactionV2();
  }

  async endSession (session: any) {
    await this.repository.global.service.transactionService.endSession(session);
  }

  async commitTransaction (session: any) {
    await this.repository.global.service.transactionService.commitTransaction(session);
  }

  async rollbackTransaction (session: any) {
    await this.repository.global.service.transactionService.rollbackTransaction(session);
  }

  formatStringObject (dataObject: any, dataIgnore: any) {
    const result = this.repository.global.service.formatStringObject.format(dataObject, dataIgnore);
    return result;
  }

  getErrorFuncName (error: Error) {
    const caller = error.stack?.split("\n")[2].trim();
    return caller?.match(/\s(\w+)/)?.[1];
  }
}

export default ControllerBase;
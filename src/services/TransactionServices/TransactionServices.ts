class TransactionService {
    private db: any;
    public queryRunner: any;
  
    constructor (db: any) {
      this.db = db;
      this.createQueryRunner();
    }
  
    async reconnectDB () {
      const result = await this.db.connect();
      return result;
    }
  
    async createQueryRunner () {
      // this.queryRunner = this.db.getDb().getConnection().createQueryRunner();
    }
  
    async getMetaData (entity: any) {
      const result = await this.db.getDb().getConnection().getMetadata(entity);
      return result;
    }
  
    async createNewTable (metaData: any) {
      const result = await this.db.getDb().Table.create(metaData);
      return result;
    }
  
    async releaseQueryRunner () {
      await this.queryRunner.release();
    }
  
    async startTransaction () {
      const session = await this.db.getDb().startSession();
      await session.startTransaction();
      return session;
    }
  
    async startTransactionV2 () {
      const session = await this.db.getDb().startSession();
      return session;
    }
  
    async commitTransaction (session: any) {
      await session.commitTransaction();
      await session.endSession();
    }
  
    async endSession (session?: any) {
      await session.endSession();
    }
  
    async rollbackTransaction (session: any) {
      await session.abortTransaction();
      await session.endSession();
    }
  }
  
  export default TransactionService;
  
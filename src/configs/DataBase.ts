import * as mongoose from "mongoose";

class DataBase {
  private urlDb: any;
  private logger: any;
  public connection: any;

  constructor (variables: any, logger: any) {
    const { urlDb } = variables;

    this.urlDb = urlDb;
    this.logger = logger;

    this.connect();
  }

  async connect () {
    const optionConnClient = {
      retryWrites: true
    };

    return await mongoose.connect(this.urlDb, optionConnClient)
      .then((connection: any) => {
        this.logger.info("Success connect to database.");
        return connection;
      })
      .catch((err: any) => {
        throw new Error(`ERROR DATABASE: ${err}`);
      });
  }

  getDb () {
    return mongoose;
  }
}

export default DataBase;

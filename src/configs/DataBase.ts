import * as mongoose from "mongoose";

class DataBase {
  private urlDb: any;
  private logger: any;
  public connection: any;

  constructor (variables: any, logger: any) {
    const { urlDb } = variables;

    this.urlDb = urlDb;
    this.logger = logger;

    this.init();
  }

  async init() {
    await this.connect();


    await this.dropExistingIndex();
    await this.syncIndexes();
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

  async dropExistingIndex () {
    const modelNames = mongoose.modelNames();
    for (const modelName of modelNames) {
      try {
        const model = mongoose.model(modelName);
        model.collection.dropIndexes();
      } catch (err) {
        console.error(`❌ Failed to sync indexes for ${modelName}:`, err.message);
      }
    }
    console.log("✅ Existing Index Deleted");
  }

  async syncIndexes () {
    const modelNames = mongoose.modelNames();
    for (const modelName of modelNames) {
      try {
        const model = mongoose.model(modelName);
        model.syncIndexes();
      } catch (err) {
        console.error(`❌ Failed to sync indexes for ${modelName}:`, err.message);
      }
    }
    console.log("✅ Index Syncronized");
  }

  getDb () {
    return mongoose;
  }
}

export default DataBase;

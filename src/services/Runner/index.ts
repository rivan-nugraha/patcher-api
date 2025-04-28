import { MongoClient, Db } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

export default class ScriptRunner {
  async execute(client: MongoClient, db_name: string, script: string,): Promise<string> {
    try {
      if (process.env.MODE_API !== "development") {
        console.log("Cluster And Database Selected Connected");
      }

      const db: Db = client.db(db_name);
      const fn = this.safeGenerateMongoFunction(script);

      await fn(db);
      
      return "200";
    } catch (err: any) {
      console.error("Error during script execution:", err);
      return "500";
    } finally {
      await client.close();
    }
  }

  safeGenerateMongoFunction(script: string): (db: Db) => Promise<any> {
    return new Function('db', `
      return (async () => {
        try {
          ${script}
        } catch (e) {
          console.error("Error inside script:", e);
          throw e;
        }
      })();
    `) as (db: Db) => Promise<any>;
  }
}

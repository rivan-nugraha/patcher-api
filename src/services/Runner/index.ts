import { MongoClient, Db } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

export default class ScriptRunner {
  async execute(uri: string, script: string, db_name: string): Promise<string> {
    const client = new MongoClient(uri);

    try {
      await client.connect();
      if (process.env.MODE_API !== "development") {
        console.log("Cluster And Database Seleected Connected");
      }

      const db: Db = client.db(db_name);
      const fn = this.safeGenerateMongoFunction(script);

      const result = await fn(db);
      await result;
      return "200"
    } catch (err: any) {
      await client.close();
      return "500";
    } finally {
      await client.close();
    }
  }

  safeGenerateMongoFunction(script: string): (db: Db) => Promise<any> {
    return new Function('db', `
      return (async () => {
        ${script}
      })();
    `) as (db: Db) => Promise<any>;
  }
}
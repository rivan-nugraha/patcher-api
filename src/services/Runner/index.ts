import { MongoClient, Db } from 'mongodb';

export default class ScriptRunner {
  async execute(uri: string, script: string, db_name: string) {
    const client = new MongoClient(uri);

    try {
      await client.connect();
      console.log("Cluster And Database Seleected Connected");

      const db: Db = client.db(db_name);
      const fn = this.safeGenerateMongoFunction(script);

      const result = await fn(db);
      return await result;
    } catch (err: any) {
      await client.close();
      throw new Error(`Script execution failed: ${err.message}`);
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
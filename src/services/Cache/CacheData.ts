import * as NodeCache from "node-cache";

class CacheData {
  private nodeCache: any;
  private _ttl: any;

  constructor () {
    this.nodeCache = new NodeCache();
    this._ttl = Number(process.env.CACHE_LIMIT || 0) || 1200;
  }

  storeCache (dataStore: any) {
    const result = this.nodeCache.set(dataStore.username, { token: dataStore.token }, this._ttl);
    return result;
  }

  storeCacheV2 (key: string, dataStore: any) {
    const result = this.nodeCache.set(key, dataStore);
    return result;
  }

  storeCacheTimed (key: string, dataStore: any, time: any = 60) {
    const result = this.nodeCache.set(key, dataStore, time);
    return result;
  }

  getCache (dataStore: any) {
    const result = this.nodeCache.get(dataStore.username);
    return result;
  }

  getCacheV2 (key: any) {
    const result = this.nodeCache.get(key);
    return result;
  }

  changeTTL (dataStore:any) {
    const result = this.nodeCache.ttl(dataStore.username, this._ttl);
    return result;
  }

  deleteCache (dataStore: any) {
    const result = this.nodeCache.del(dataStore.username);
    return result;
  }

  deleteCacheV2 (key: any) {
    const result = this.nodeCache.del(key);
    return result;
  }

  resetCache () {
    const keys = this.nodeCache.keys();
    const result = this.nodeCache.del(keys);
    return result;
  }
}

export default CacheData;

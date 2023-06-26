import Logger from "../Logger/Logger";

export class SendPartialSocket {
    private io: any;
    private logger: any;

    constructor (private cacheData: any) {
      this.logger = new Logger();
      this.logger.info("Socket Init: " + true);
    }

    initSocket (io: any) {
      this.io = io;
    }

    async sendPartialSocket ({
      key,
      uid,
      user_id,
      cb,
      totalData
    }: any) {
      const keyUid = `${key}/${user_id}`;
      this.cacheData.storeCacheV2(keyUid, uid);
      await this._doRecursive(
        {
          cb,
          totalData,
          keyUid,
          uid
        }
      );
      this.cacheData.deleteCacheV2(keyUid);
      if (!totalData) {
        this.io.emit(key, { status: "DATA_KOSONG", data: [], progress: totalData, total: totalData, user: user_id, uid: uid });
      } else {
        this.io.emit(key, { status: "FINISH", data: [], progress: totalData, total: totalData, user: user_id, uid: uid });
      }

      return true;
    }

    async _doRecursive ({
      cb, totalData, keyUid, uid, skip = 0
    }: any): Promise<boolean> {
      if (uid !== this.cacheData.getCacheV2(keyUid)) {
        console.log("[ERROR]", "Report Barang Detail Aborted!", uid);
        this.io.emit(keyUid.split("/")[0], { status: "ERROR", data: [], progress: 0, total: 0, user: keyUid.split("/")[1], uid: uid, message: "Kesalahan Session pada user " + keyUid.split("/")[1] });

        throw new Error("Kesalahan Session pada user " + keyUid.split("/")[1]);
      }
      if (skip >= totalData) {
        return true;
      }

      const result = await cb(skip);
      const progress = skip + result.length;
      console.log("\nprogress:", progress, "total data:", totalData);
      console.log("length:", result.length);

      const [keyMsg, user_id] = keyUid.split("/");
      this.io.emit(keyMsg, { status: "PROGRESS", data: result, progress: skip + result.length, total: totalData, user: user_id, uid: uid });

      return await this._doRecursive({ cb, totalData, keyUid, uid, skip: progress });
    }

    async sendPartialSocketGroupRecursive ({
      key,
      uid,
      user_id,
      cb
    }: any) {
      const keyUid = `${key}/${user_id}`;
      this.cacheData.storeCacheV2(keyUid, uid);
      await this._doRecursiveGroup(
        {
          cb,
          keyUid,
          uid
        }
      );
      this.cacheData.deleteCacheV2(keyUid);
      // if (!totalData) {
      //   this.io.emit(key, { status: "DATA_KOSONG", data: [], progress: totalData, total: totalData, user: user_id, uid: uid });
      // } else {
      // }

      return true;
    }

    async _doRecursiveGroup ({
      cb, keyUid, uid, skip = 0
    }: any): Promise<boolean> {
      console.log(uid);

      if (uid !== this.cacheData.getCacheV2(keyUid)) {
        console.log("[ERROR]", `Report ${keyUid} Aborted!`, uid);
        this.io.emit(keyUid.split("/")[0], { status: "ERROR", data: [], progress: 0, total: 0, user: keyUid.split("/")[1], uid: uid, message: "Kesalahan Session pada user " + keyUid.split("/")[1] });

        throw new Error("Kesalahan Session pada user " + keyUid.split("/")[1]);
      }

      const result = await cb(skip);
      if (!result.length) {
        const [keyMsg, user_id] = keyUid.split("/");
        this.io.emit(keyMsg, { status: "FINISH", data: [], progress: skip, total: 0, user: user_id, uid: uid });

        return true;
      }

      if (!result.groupLength) {
        throw new Error("please provide groupLength at return value of partial socket callback!");
      }
      const progress = skip + result.groupLength;

      const [keyMsg, user_id] = keyUid.split("/");
      this.io.emit(keyMsg, { status: "PROGRESS", data: result, progress: skip + result.length, total: 0, user: user_id, uid: uid });

      return await this._doRecursiveGroup({ cb, keyUid, uid, skip: progress });
    }

    async sendPartialSocketRecursion ({
      key,
      uid,
      user_id,
      cb
    }: any) {
      const keyUid = `${key}/${user_id}`;
      this.cacheData.storeCacheV2(keyUid, uid);
      const totalData = await this._doRecursiveTillEmpty(
        {
          cb,
          keyUid,
          uid
        }
      );
      this.cacheData.deleteCacheV2(keyUid);
      if (!totalData) {
        this.io.emit(key, { status: "DATA_KOSONG", data: [], progress: totalData, total: totalData, user: user_id, uid: uid });
      } else {
        this.io.emit(key, { status: "FINISH", data: [], progress: totalData, total: totalData, user: user_id, uid: uid });
      }

      return true;
    }

    async _doRecursiveTillEmpty ({
      cb, keyUid, uid, skip = 0
    }: any): Promise<boolean> {
      if (uid !== this.cacheData.getCacheV2(keyUid)) {
        console.log("[ERROR]", "Report Barang Detail Aborted!", uid);
        this.io.emit(keyUid.split("/")[0], { status: "ERROR", data: [], progress: 0, total: 0, user: keyUid.split("/")[1], uid: uid, message: "Kesalahan Session pada user " + keyUid.split("/")[1] });

        throw new Error("Kesalahan Session pada user " + keyUid.split("/")[1]);
      }
      const result = await cb(skip);
      const progress = skip + result.length;
      console.log("\nprogress:", progress);

      if (!result.length) {
        return progress;
      }

      const [keyMsg, user_id] = keyUid.split("/");
      this.io.emit(keyMsg, { status: "PROGRESS", data: result, progress: skip + result.length, total: skip + result.length, user: user_id, uid: uid });

      return await this._doRecursiveTillEmpty({ cb, keyUid, uid, skip: progress });
    }
}

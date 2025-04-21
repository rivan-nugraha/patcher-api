import * as jwt from "jsonwebtoken";
import CacheData from "../Cache/CacheData";

class Security {
  private mode: any;
  private jwtPrivateKey: any;
  private cacheData: CacheData;

  constructor (variables: any, cacheData: any) {
    this.mode = variables.mode;
    this.jwtPrivateKey = variables.jwtPrivateKey;
    this.cacheData = cacheData;
  }

  generateToken (userData: any) {
    const token = jwt.sign({
      username: userData.username,
      name: userData.name,
      level: userData.level,
      validate_time: new Date(),
      tgl_system: userData.tgl_system
    },
    this.jwtPrivateKey);
    return token;
  }

  generateTokenCustom (data: any) {
    const token = jwt.sign(data,
      this.jwtPrivateKey);
    return token;
  }

  authenticate () {
    return [
      (req: any, res: any, next: any) => {
        const token = req.headers["x-auth-token"];
        if (!token) return res.status(401).send("Access denied. No token provided.");
        
        try {
          // const decoded = jwt.verify(token, this.jwtPrivateKey);
          // req.user = decoded;
          const isTokenPusat = token === process.env.TOKEN_PUSAT;
          if (!isTokenPusat) {
            const decoded = jwt.verify(token, this.jwtPrivateKey);
            req.user = decoded;
          } else {
            req.user = {
              username: "PUSAT"
            };
          }
          if (this.mode === "production" && !isTokenPusat && req.user.level !== "SU") {
            const cacheToken = this.cacheData.getCache(req.user);
            if (cacheToken.token !== token) return res.status(400).send("Invalid token.");
            this.cacheData.changeTTL(req.user);
          }
          const isStoreClosed = this.cacheData.getCacheV2("is_closed_store");
          if (isStoreClosed) {
            return res.status(422).send("Error! Sedang dalam proses tutup toko!");
          }
          next();
        } catch (err) {
          res.status(400).send("Invalid token.");
        }
      }
    ];
  }
}

export default Security;

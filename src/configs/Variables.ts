class Variables {
  private mode: any;
  private jwtPrivateKey: any;
  private port: any;
  private urlDb: any;
  private urlDigiAPI: any;

  constructor () {
    this.mode = process.env.NGO_MODE_API;
    this.jwtPrivateKey = process.env.NGO_JWTKEY_API;
    this.port = process.env.NGO_PORT_API;
    this.urlDb = process.env.NGO_URLDB_API;

    this.checkVariables();
  }

  checkVariables () {
    if (!this.mode) throw new Error("ERROR: MODE api not found!");
    if (!this.jwtPrivateKey) throw new Error("ERROR: JWT key api not found!");
    if (!this.port) throw new Error("ERROR: Port api not found!");
    if (!this.urlDb) {
      throw new Error("ERROR: Url Connection Database api not found!");
    }
  }

  getVariables () {
    return {
      mode: this.mode,
      jwtPrivateKey: this.jwtPrivateKey,
      port: this.port,
      urlDb: this.urlDb
    };
  }
}

export default Variables;

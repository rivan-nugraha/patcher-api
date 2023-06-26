import { Server } from "http";
import ServerDoc from "./ServerDoc";
import UsersDoc from "./master/UserDoc";

class Documents {
  private serverDoc: any;
  private paths: any;

  constructor () {
    this.serverDoc = new ServerDoc();
    this.paths = {
      paths: Object.assign(
        new UsersDoc().getDoc()
      )
    };
  }

  getDoc () {
    const swaggerDoc = Object.assign(this.serverDoc.getInfo(), this.paths);
    return swaggerDoc;
  }
}

export default Documents;

import "regenerator-runtime";
import "reflect-metadata";
import * as dotenv from "dotenv";
import * as jf from "joiful";

dotenv.config();

import App from "./App";
import Variables from "./configs/Variables";
import Routes from "./routes/Routes";
import Repository from "./repositories/Repository";
import DataBase from "./configs/DataBase";
import Service from "./services/Services";
import Logger from "./services/Logger/Logger";

const variables = new Variables();
const dataBase = new DataBase(variables.getVariables(), new Logger())
const service = new Service(dataBase, variables.getVariables());

const app = new App(
  new Routes,
  new Repository(dataBase, jf, service),
  variables.getVariables(),
  service
);
app.start();

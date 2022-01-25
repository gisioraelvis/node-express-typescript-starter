import "reflect-metadata";
import { createConnection } from "typeorm";
import { App } from "./app";
import * as dotenv from "dotenv";

dotenv.config();

createConnection().then(async () => {
  const app: App = new App();
  app.startServer();
});

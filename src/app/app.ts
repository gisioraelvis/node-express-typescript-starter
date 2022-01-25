import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";

import { CreateLog, Logger } from "./utils/logger";
import { appRouter } from "./routes";

export class App {
  private _server: Application;

  constructor() {
    this._server = express();
    this._server.set("host", process.env.HOST || "localhost");
    this._server.set("port", process.env.PORT || 5000);
    this._server.use(bodyParser.json());
    this._server.use(bodyParser.urlencoded({ extended: true }));
    this._server.use(cors());
    this._server.use(helmet());
    this._server.use(Logger);
    this._server.use(appRouter);
  }

  public startServer(): void {
    const host: string = this._server.get("host");
    const port: number = this._server.get("port");
    this._server.listen(port, host, () => {
      CreateLog.info(`Server started at http://${host}:${port}`);
    });
  }
}

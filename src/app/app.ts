import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import colors from "colors";
import morgan from "morgan";
import helmet from "helmet";

import { appRouter } from "./routes";
import { format } from "path/posix";

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
    this._server.use(appRouter);
  }

  public startServer(): void {
    if (process.env.NODE_ENV === "dev") {
      this._server.use(morgan<any>("tiny"));
    }
    const host: string = this._server.get("host");
    const port: number = this._server.get("port");
    this._server.listen(port, host, () => {
      console.log(
        colors.yellow.bold(`Server started at http://${host}:${port}`),
      );
    });
  }
}

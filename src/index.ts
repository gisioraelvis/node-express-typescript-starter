import { App } from "./app";
import * as dotenv from "dotenv";

dotenv.config();
const app: App = new App();
app.startServer();

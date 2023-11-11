import "dotenv/config";
import express from "express";
import Logger from "./Logger.js";

import infoRouter from "./routes/info.js";

const app = express();
const port = process.env.PORT;
const logger = new Logger({
  name: "downloadify",
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/info", infoRouter);

app.listen(port, () => logger.info(`listening to the port: ${port}`));

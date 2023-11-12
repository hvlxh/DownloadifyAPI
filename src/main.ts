import "dotenv/config";
import express from "express";
import Logger from "./Logger.js";

import infoRouter from "./routes/info.js";
import downloadRouter from "./routes/download.js";

const app = express();
const port = process.env.PORT;
const logger = new Logger({
  name: "downloadify",
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/info", infoRouter);
app.use("/download", downloadRouter);

app.listen(port, () => logger.info(`listening to the port: ${port}`));

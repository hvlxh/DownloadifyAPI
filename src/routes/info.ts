import { Router } from "express";
import { createRequire } from "module";
const router = Router();

import ytdl from "ytdl-core";
const require = createRequire(process.cwd() + "/node_modules");
const { post } = require("instagram-api.js");

router.get("/", (req, res) => {
  res.send("<p>Available: <br/><br/>/instagram<br/>/tiktok<br/>/youtube</p>");
});

router.get("/youtube/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const validated = ytdl.validateID(id);
    if (!validated) {
      res.status(400).json({ error: "Invaild YouTube ID, does not exists." });
      return;
    }

    const info = await ytdl.getInfo(id);
    res.status(200).json({
      ...info.videoDetails,
      formats: info.formats,
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;

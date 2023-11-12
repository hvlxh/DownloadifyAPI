import { Router } from "express";
import ytdl from "ytdl-core";

const router = Router();
router.get("/youtube/:id/:quality/:file", async (req, res) => {
  const id = req.params.id;
  const quality = req.params.quality;
  const file = req.params.file;

  try {
    const validated = ytdl.validateID(id);
    if (!validated) {
      res.status(400).json({ error: "Invaild YouTube ID, does not exists." });
      return;
    }

    const info = await ytdl.getInfo(id);
    const format = ytdl.chooseFormat(info.formats, { quality });
    const stream = ytdl.downloadFromInfo(info, {
      format,
      filter: file as ytdl.Filter,
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${info.videoDetails.title}.mp4"`
    );
    res.setHeader("Content-Type", "video/mp4");

    stream.pipe(res);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;

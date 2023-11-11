import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("<p>Available: <br/><br/>/instagram<br/>/tiktok<br/>/youtube</p>");
});

router.get("/youtube", (req, res) => {
  // TODO: complete this
});

export default router;

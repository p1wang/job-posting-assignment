import express from "express";
import {
  getPostings,
  getPosting,
  createPosting,
  deletePosting,
  updatePosting,
} from "../controllers/postings.js";

const router = express.Router();

router.get("/", getPostings);
router.get("/:id", getPosting);
router.post("/", createPosting);
router.delete("/:id", deletePosting);
router.patch("/:id", updatePosting);

export default router;

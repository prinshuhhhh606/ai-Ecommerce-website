import express from "express";
import { aiSearch } from "../controller/aiController";

const router = express.Router();

router.post("/search", aiSearch);

export default router;

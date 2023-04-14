import express from "express";
import { getIndex } from "../controllers/indexController";

const router = express.Router();

router.get("/", getIndex);

export default router;

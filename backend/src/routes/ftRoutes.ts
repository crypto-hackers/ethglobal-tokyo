import { Router } from "express";
import { claimAirdrop } from "../controllers/ftController";

const router = Router();

router.post("/claim", claimAirdrop);

export default router;

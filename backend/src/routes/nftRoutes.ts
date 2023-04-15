import { Router } from "express";
import {
  getBatchVerificationData,
  mintNFT,
} from "../controllers/nftController";

const router = Router();

router.post("/mint", mintNFT);
router.get("/address/:address", getBatchVerificationData);

export default router;

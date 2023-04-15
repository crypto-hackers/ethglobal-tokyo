import { Router } from "express";
import {
  getBatchVerificationData,
  mintNFT,
  updateKYCData,
} from "../controllers/nftController";

const router = Router();

router.post("/mint", mintNFT);
router.get("/address/:address", getBatchVerificationData);
router.post("/verify/kyc", updateKYCData);

export default router;

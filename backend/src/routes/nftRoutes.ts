import { Router } from "express";
import {
  getBatchVerificationData,
  mintNFT,
  updateKYCData,
  updateWorldIdData,
} from "../controllers/nftController";

const router = Router();

router.post("/mint", mintNFT);
router.get("/address/:address", getBatchVerificationData);
router.post("/verify/kyc", updateKYCData);
router.post("/verify/worldId", updateWorldIdData);

export default router;

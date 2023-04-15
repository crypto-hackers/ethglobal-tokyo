import { Router } from "express";
import {
  createChatGroup,
} from "../controllers/chatGroupController";

const router = Router();

router.post("/", createChatGroup);
router.put("/", createChatGroup);

export default router;

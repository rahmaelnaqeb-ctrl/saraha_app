import { Router } from "express";
import { Validation } from "../../middlewares/validation.middle.js";
import * as MSgValidation from "./message.validation.js"
import * as MC from "./message.controller.js"
import { allowTo, authentication } from "../../middlewares/auth.middle.js";
const router=Router();
router.post("/addmsg",authentication,allowTo(["user"]),Validation(MSgValidation.sendMessageSchema),MC.sendMessage);
router.get("/",authentication,allowTo(["user"]),Validation(MSgValidation.getSingleMessageSchema),MC.getSingleMessage);
router.get("/all",authentication,allowTo(["user"]),Validation(MSgValidation.getAllMessagesSchema),MC.getAllMessages);
router.patch("/updatemsg",authentication,allowTo(["user"]),Validation(MSgValidation.updateMessageSchema),MC.updateMessage);
router.delete("/deletemsg",authentication,allowTo(["user"]),Validation(MSgValidation.deleteMessageSchema),MC.deleteMessage);

export default router;
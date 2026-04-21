import { Router } from "express";
import * as AUC from "./auth.controller.js"
import { Validation } from "../../middlewares/validation.middle.js";
import * as AuthValidation from './auth.validation.js'
const router=Router();

router.post("/signUp",Validation(AuthValidation.signUpSchema),AUC.Sign_UP),
router.post("/signIn",Validation(AuthValidation.signInSchema),AUC.signIN)
export default router;
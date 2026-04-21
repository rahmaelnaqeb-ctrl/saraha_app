
import { Router } from "express";
import * as UC from './user.controller.js';
import * as UV from "./user.validation.js"
import {allowTo, authentication } from "../../middlewares/auth.middle.js";
import { Validation } from "../../middlewares/validation.middle.js";
import { allowedExtensions, MulterFunction } from "../../services/multer.service.js";
const router=Router();

// router.post("/register",UC.Sign_UP);
// router.post("/login",UC.signIN);
router.post("/verify",UC.verify_token);
router.get("/",authentication,allowTo(["user"]),UC.get_user_data); //req
router.patch("/update",authentication,allowTo(["user","admin"]),Validation(UV.update_user_profile_schema),UC.update_user_profile) //req.body
router.patch("/changepassword",authentication,allowTo(["user","admin"]),Validation(UV.change_password_schema),UC.change_password) //req.body
//request of multer with custom path
router.post("/profile",MulterFunction([...allowedExtensions.Images,...allowedExtensions.Files, ...allowedExtensions.Videos],"user/profile").single("profile"),UC.profile_picture) //req.file + req.body.password
router.post("/file",MulterFunction([...allowedExtensions.Files]).single("file"),UC.upload_file) //req.file
export default router;
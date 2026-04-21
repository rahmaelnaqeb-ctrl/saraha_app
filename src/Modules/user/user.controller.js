import { userModel } from "../../DB/Models/user.model.js";
//import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import bcrypt from "bcrypt";


 const get_user_data=async(req,res,next)=>{
  try {


    /// Token
//     const {authorization}=req.headers;
//     if(!authorization){
//         return res.json({message:"forbidden user"})
//     }

//   const{_id}= jwt.verify(authorization,process.env.USER_TOKEN) // [], {}
 

 

// const userCheck=await userModel.findById(_id);
const {userCheck}=req;
    userCheck.phone=CryptoJS.AES.decrypt(userCheck.phone,process.env.PHONE_SECRET_KEY).toString(
    CryptoJS.enc.Utf8
  ); 
        return res.json({messge:"data retrived Successfully",userCheck})

  } catch (error) {
    res.json({message:"Faild To get user Data",error})
  }

 }



 const verify_token=(req,res,next)=>{
 try {
       const {token}=req.body;
    const DEcdoed_token=jwt.verify(token,'testTdcdcoken')
    res.json({message:"Token Verifyied Successfully",DEcdoed_token})
 } catch (error) {
    res.json({message:"session expired"})
 }
 }
 const update_user_profile=async(req,res,next)=>{
 
    try {
         // Authorization check
        if (!req.userCheck || !req.userCheck._id) {
            return next(new Error("Unauthorized: User not authenticated"));
        }
        if (req.body.phone) {
            req.body.phone = CryptoJS.AES.encrypt(
                req.body.phone,
                process.env.PHONE_SECRET_KEY
            ).toString();
        }

        // Use req.userCheck._id as set by your authentication middleware
        const updatedUser = await userModel.findByIdAndUpdate(
            req.userCheck._id, // Use the authenticated user's ID
            req.body,
            { new: true }
        );

        return res.json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        return next(new Error("Update failed: " + error.message));
    }
 };

 //change password
 const change_password=async(req,res,next)=>{
    try {
        const {oldPassword,newPassword}=req.body;
        //check if oldpassword = user.password
        const isPasswordMatch=  bcrypt.compareSync(oldPassword,req.userCheck.password);
        if(!isPasswordMatch){
            return next(new Error("Old password is incorrect"))
        }
        //hash new password
        const hashedPassword= bcrypt.hashSync(newPassword,parseInt(process.env.SALT_ROUNDS));

        const user = await userModel.findByIdAndUpdate(req.userCheck._id,{password:hashedPassword},{new:true, runValidators:true})
        res.json({message:"Password changed successfully",result:user})
    } catch (error) {
       return next(error)
    }
 }

const profile_picture=async(req,res,next)=>{
   

        // Update user profile picture path in database
        const profilePath = req.file ? `uploads/user/profile/${req.file.filename}` : null;
        
        if(profilePath){
            const user = await userModel.findByIdAndUpdate(
                req.userCheck._id,
                {profilePicture: profilePath},
                {new:true}
            );
            return res.json({message:"Profile picture updated successfully",file:req.file, user})
        }

        res.json({message:"Profile picture updated successfully",file:req.file})
    } 


const upload_file=async(req,res,next)=>{
    try {
        res.json({message:"File uploaded successfully",file:req.file})
    } catch (error) {
       return next(error)
    }
}
export{
    // Sign_UP,
    // signIN,
    // update_user,
    get_user_data,
    verify_token,
    update_user_profile,
    change_password,
    profile_picture,
    upload_file
}
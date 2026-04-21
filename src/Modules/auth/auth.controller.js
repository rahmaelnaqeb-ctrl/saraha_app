import { userModel } from "../../DB/Models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { role } from "../../middlewares/auth.middle.js";

const Sign_UP=async(req,res,next)=>{
try {
        const {name,email,password,confirmPassword,role,phone,gender}=req.body;

        //
        if(password!=confirmPassword){
        //    return res.json({message:"password dosent match confirm password"})
        return next(new Error("password dosent match confirm password"))
        }
    const userCheck=await userModel.findOne({email});

    // Check 
    if(userCheck){
        // return res.json({message:"Email is already Exist"})
        return next(new Error("Email is already Exist"))
    }
    /// hash  or hashsync
     const hashPassword=await bcrypt.hash(password,+process.env.SALT_ROUNDS);

     // Encrypt phone number
     const Encrypt_phone=CryptoJS.AES.encrypt(phone,process.env.PHONE_SECRET_KEY).toString();
    const user=new userModel({name,email,password:hashPassword,gender,role,phone:Encrypt_phone});
    await user.save();
    res.json({message:"user Registred Successfully",user})
} catch (error) {
    // res.json({message:"Faild To Register",error})
    return next(error)
}
}


/// Login (signIN)

const signIN=async(req,res,next)=>{
   try {
     // Login Email , password

    const {email,password}=req.body;

    const userCheck= await userModel.findOne({email});
    if(!userCheck){
        return  res.json({message:" user NotFound"})
    }
    /// compare hashing
    const passwordMatch=bcrypt.compareSync(password,userCheck.password);
    if(!passwordMatch){
    return res.json({message:"Invalid email or password"})
    }
    // generate Token
    const userToken=jwt.sign({email,_id:userCheck._id},userCheck.role===role.User?process.env.USER_TOKEN:process.env.Admin_Token,{expiresIn:20})

    userCheck.token=userToken;
    await userCheck.save();
res.json({message:"user Loged In Successfully",userToken})

} catch (error) {
    res.json({message:"server confused Login operation",error})
}

}


export {
    Sign_UP,
    signIN
}
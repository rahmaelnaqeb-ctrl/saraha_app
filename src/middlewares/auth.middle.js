import jwt from 'jsonwebtoken';
import { userModel } from '../DB/Models/user.model.js';
export const role={
    User:"user",
    Admin:"admin"
}
export const authentication=async(req,res,next)=>{
    
    const {authorization}=req.headers;
        if(!authorization){
            return next(new Error("authorization header is required"));
        }

        const [Bearer,token]=authorization.split(" ");
    let token_signature=undefined;
try {
        switch (Bearer){
            case "user":
            token_signature=process.env.USER_TOKEN;
            break;

            case "admin":
                token_signature=process.env.Admin_Token;
                break;

            default:
                break; 
        }

        if(!token_signature) {
            return next(new Error("Invalid Bearer Token"));
        }

        const{_id}=jwt.verify(token,token_signature);
        const userCheck=await userModel.findById(_id);
        if(!userCheck){
            return next(new Error("user Not Found,may be deleted"));
        }
    req.userCheck=userCheck;

return next();
} catch (error) {
    if(error.name=="TokenExpiredError"||error.name=="jwt expired"){
        try {
            // generate New Token (Refresh Token)

            const {_id}=jwt.verify(token,token_signature,{ignoreExpiration:true}) 
                
            // check user
            const user =await userModel.findById(_id);
            if(!user){
                return next(new Error("user not Exist to generate Token"))
            }

            if(user.token!=token){
                return next(new Error("Invalid Token"))
            }

            //Refresh Token
            const Refresh_Token=jwt.sign({email:user.email,_id:user._id},user.role==role.User?process.env.USER_TOKEN:process.env.Admin_Token,{expiresIn:"1h"})
        
            user.token=Refresh_Token;
            await user.save();
            return res.json({message:"Token Refreshed Successfully",token:Refresh_Token})
        } catch (refreshError) {
             return next(new Error("Failed to refresh token"));
        }
    }
    return next (new Error("Authentication middleware error: " + error.message))
}
}



export const allowTo=(roles=[])=>{
 return (req,res,next)=>{
   try {
     if(!roles.includes(req.userCheck.role)){
        return next(new Error("Forbidden Account: You do not have permission"));
    }
    return next();
   } catch (error) {
    return next(error);
   }
 }
}







// export const allowTo=(role=[])=>{
//  return async(req,res,next)=>{
//   try {
//     if(!role.includes(req.userCheck.role)){
//         return res.json({message:"Forbidden Account"})
//     }
//     return next();
//   } catch (error) {
//     return res.json({success:false,error})
//   }
//  }
// }
import mongoose, { Schema } from "mongoose";


const userSchema= new Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        lowercase:true,
        minLength:[3,"name at least 3 characters length"],
        maxLength:[15,"name at Most 15 characters length"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email must be unique"],
        match:/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
        trim:true
        // @gmail.com
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    gender:{
        type:String,
        // enum:["female","male","not specified"],
        // default:"not specified"
        enum:{
            values:["female","male","not specified"],
            message:"gender must be female or male only"
        },
         default:"not specified"
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:{
            values:["user","admin"],
            message:"role must be user or admin",
        },
        default:"user"
      
    },
    DOB:String,
    address:String,
    phone:String,
    profile_picture:String,
    token:String
},{timestamps:true})


export const userModel=mongoose.model('user',userSchema);
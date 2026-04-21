import mongoose, { Schema } from "mongoose";


const msgSchema=new Schema({
    content:{
        type:String,
        required:true
    },
    //sender
    //Reciever
    Sender:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    Reciever:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})

export const msgModel=mongoose.model("Message",msgSchema);
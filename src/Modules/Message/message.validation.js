///validation Data of messages
import Joi from "joi";
import mongoose from "mongoose";

export const flags={
    inbox:"inbox",
    outbox:"outbox"
};
// send message validation
export const sendMessageSchema=Joi.object({
    content:Joi.string().required(),
    Reciever:Joi.custom((value,helpers)=>{
        //check if Receiever valid object id
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }
        return helpers.message("Reciever is not a valid object ID")
    }).required()
}).required()
// get single message validation
export const getSingleMessageSchema=Joi.object({
    messageId:Joi.string().custom((value,helpers)=>{
        //check if messageId valid object id
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }
        return helpers.message("Message ID is not a valid object ID")
    }).required()
}).required()
// get all messages validation
export const getAllMessagesSchema=Joi.object({
    flag:Joi.string().valid(...Object.values(flags)).required()
}).required()
// update message validation
export const updateMessageSchema=Joi.object({
    messageId:Joi.string().custom((value,helpers)=>{
        //check if messageId valid object id 
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }
        return helpers.message("Message ID is not a valid object ID")
    }).required(),
    content:Joi.string().required()
}).required()
// delete message validation
export const deleteMessageSchema=Joi.object({
    messageId:Joi.string().custom((value,helpers)=>{
        //check if messageId valid object id
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }       return helpers.message("Message ID is not a valid object ID")
    }).required()
}).required()
// send message
import { msgModel } from "../../DB/Models/message.model.js";
import { userModel } from "../../DB/Models/user.model.js";


export const flags={
    inbox:"inbox",
    outbox:"outbox"
};


const sendMessage=async(req,res,next)=>{
    // Data From user
try {
    const {content,Reciever}=req.body;
    ///Reciever

    const user=await userModel.findById(Reciever);
    if(!user){
        return next (new Error("user not Exist to recieve any message"))
    }


    //send Real Message

    const Message=await msgModel.create({
        content,
        Reciever,
        Sender:req.userCheck._id
    })
    if(!Message){
        return next(new Error("Message not sent"))
    }
    return res.json({result:"Message added successfully",Message})
  } catch (error) {
    return next(error)
  }

}



///get single message
const getSingleMessage = async (req, res, next) => {
  try {
    const { messageId } = req.body;
    const message = await msgModel.findById(messageId).populate("Sender");

    if (!message) {
      return next(new Error("Message not found"));
    }

    // Authorization check: ensure user is sender or receiver
    const userId = req.userCheck._id.toString();
    const senderId = message.Sender._id ? message.Sender._id.toString() : message.Sender.toString();
    const receiverId = message.Reciever._id ? message.Reciever._id.toString() : message.Reciever.toString();

    if (senderId === userId || receiverId === userId) {
      return res.json({ success: true, result: message });
    }

    return next(new Error("Unauthorized access to this message"));
  } catch (error) {
    return next(error);
  }
};


///get All messages
const getAllMessages = async (req, res, next) => {
    try {
        // Authorization check
        if (!req.userCheck || !req.userCheck._id) {
            return next(new Error("Unauthorized: User not authenticated"));
        }

        const { flag } = req.query;
        
        if (flag == flags.inbox) {
            return res.json({
                result: "All inbox messages",
                messages: await msgModel.find({ Reciever: req.userCheck._id })
            });
        } else if (flag == flags.outbox) {
            return res.json({
                result: "All outbox messages",
                messages: await msgModel.find({ Sender: req.userCheck._id })
            });
        } else {
            return next(new Error("Invalid flag value. Use 'inbox' or 'outbox'."));
        }
    } catch (error) {
        return next(error);
    }
};

//// update message
const updateMessage = async (req, res, next) => {
    try{
        // Authorization check
        if (!req.userCheck || !req.userCheck._id) {
            return next(new Error("Unauthorized: User not authenticated"));
        }
        // Only sender can update the message content

        const { messageId, content } = req.body;
        const message = await msgModel.findById(messageId);
        if(!message){
            return next(new Error("Message not found"))
        }
        message.content = content;
        await message.save();
        return res.json({ success: true, result: message });
    }catch(error){
        return next(error)
    }
};


/// delete message
const deleteMessage = async (req, res, next) =>{
    try{
        // Authorization check
        if (!req.userCheck || !req.userCheck._id) {
            return next(new Error("Unauthorized: User not authenticated"));
        }
        // Only sender can delete the message
        const { messageId } = req.body;
        const message = await msgModel.findById(messageId);
        if(!message){
            return next(new Error("Message not found"))
        }
        await msgModel.findByIdAndDelete(messageId);
        return res.json({ success: true, result: "Message deleted successfully" });
    }catch(error){
        return next(error)
    }

}


export{
    sendMessage,
    getSingleMessage,
    getAllMessages,
    updateMessage,
    deleteMessage

}
import Joi from "joi";
import joi from "joi";

const update_user_profile_schema=Joi.object({
    name:joi.string().min(3).max(30),
    email:joi.string().email(),
    gender:joi.string().valid("male","female","other"), 
    phone:joi.string().pattern(/^[0-9]{10}$/)
});

const change_password_schema=Joi.object(
    {
        oldPassword:Joi.string().required(),
        newPassword:Joi.string().not(Joi.ref('oldPassword')).required(),
        confirmNewPassword:Joi.string().valid(Joi.ref('newPassword')).required()
    }

).required()



export{
    update_user_profile_schema,
    change_password_schema,
    
}
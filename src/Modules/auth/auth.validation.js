
import Joi from "joi";
import { role } from "../../middlewares/auth.middle.js";

export const signUpSchema=Joi.object({
    name:Joi.string().min(3).max(15).required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().required(),
    confirmPassword:Joi.string().valid(Joi.ref("password")),
    role:Joi.string().valid(...Object.values(role)),
    phone:Joi.string().pattern(/^01[0-2,5][0-9]{8}$/),
    gender:Joi.string().valid("male","female","notspecified").default("notspecified")
}).required()


export const signInSchema=Joi.object({
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().required(),
}).required()
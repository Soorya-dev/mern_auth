import bcryptjs from "bcryptjs";
import User from "../../Models/UserModels/userModel.js";
import { errorHandler } from "../../Utils/error.js";
export const signup = async(req,res,next)=>{
    try{

        const {userName,email,password} = req.body;

        const hashedPassword = bcryptjs.hashSync(password,10);

        const newUser = new User({userName,email,password:hashedPassword});
        
        await newUser.save();
        res.status(201).json({message:'user saved in database...'});
    }catch(error){
        next(error)
        console.log(error);
    }
};

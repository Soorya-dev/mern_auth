import User from "../../Models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'; // Added missing import
import { errorHandler } from "../../Utils/error.js";

export const signup = async(req,res,next)=>{
  try{
      const {userName,email,password} = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });
      if (existingUser) {
          return next(errorHandler(400, 'Email already registered'));
      }

      const hashedPassword = bcryptjs.hashSync(password,10);
      const newUser = new User({
          userName,
          email: email.toLowerCase(), // Store email in lowercase
          password: hashedPassword
      });
      
      await newUser.save();
      console.log("User data saved:", newUser);

      res.status(201).json({
          success: true,
          message: 'User registered successfully'
      });
  }catch(error){
      next(error);
      console.log("Signup error:", error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("Attempting signin for email:", email);

    // Convert email to lowercase for consistency
    const normalizedEmail = email.toLowerCase();
    const validUser = await User.findOne({ 
      email: { $regex: new RegExp(`^${normalizedEmail}$`, "i") }
    });

    console.log("User found:", validUser ? "Yes" : "No");
    
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, 'Invalid password'));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie('access_token', token, { 
        httpOnly: true, 
        expires: expiryDate,
        secure: process.env.NODE_ENV === 'production' // Only use HTTPS in production
      })
      .status(200)
      .json({
        success: true,
        ...rest
      });
  } catch (error) {
    console.error("Signin error:", error);
    next(error);
  }
};
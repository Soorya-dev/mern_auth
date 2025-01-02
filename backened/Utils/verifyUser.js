import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";


export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, 'You are not authenticated!'));

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return next(errorHandler(403, 'Token is not valid!'));

    try {
      console.log("decodeddd",decoded);
      
      const user = await User.findById(decoded.id);
      if (!user) return next(errorHandler(404, 'User not found!'));

      if (user.isBlocked) {
        return next(errorHandler(403, 'Your account is blocked!'));
      }

     
      req.user = user;
      next();
    } catch (err) {
      next(errorHandler(500, 'An error occurred while verifying the user.'));
    }
  });
};
import User from "../../Models/userModel.js";
import bcryptjs from "bcryptjs";


export const signOut = async (req, res, next) => {
    try {
      // Clear the access token cookie
      res.clearCookie('access_token', {
        sameSite: 'none',
        secure: true,
        httpOnly: true
      });
      
      res.status(200).json({ message: "Signed out successfully" });
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteAccount = async (req, res, next) => {
    try {
      const userId = req.params.id;
      
      // Ensure the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Delete the user
      await User.findByIdAndDelete(userId);
      
      // Clear the access token cookie
      res.clearCookie('access_token', {
        sameSite: 'none',
        secure: true,
        httpOnly: true
      });
      
      res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
// profileCtrl.js - Update the existing updateProfile function to handle errors better
export const updateProfile = async (req, res, next) => {
  try {
    const { userName, email, profilePicture, password, _id } = req.body;

    // Validate user exists
    const existingUser = await User.findById(_id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if email is already taken by another user
    const emailExists = await User.findOne({ email, _id: { $ne: _id } });
    if (emailExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const updatedFields = { userName, email };

    if (profilePicture) {
      updatedFields.profilePicture = profilePicture;
    }

    if (password) {
      const hashedPassword = bcryptjs.hashSync(password, 10);
      updatedFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id, 
      updatedFields,
      { new: true }
    ).select('-password');

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
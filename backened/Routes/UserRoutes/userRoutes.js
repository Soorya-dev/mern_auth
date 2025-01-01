import express from "express";
import { signOut, deleteAccount, updateProfile } from '../../Controller/UserController/profileCtrl.js';
import { verifyToken } from '../../Utils/verifyuser.js';

const router = express.Router();

// Debug route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route is working' });
});

router.post("/sign-out", signOut); // Remove verifyToken for sign-out
router.delete("/delete/:id", verifyToken, deleteAccount);
router.put("/update", verifyToken, updateProfile);


export default router;
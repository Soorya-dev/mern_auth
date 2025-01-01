import express from "express";
import { signOut, deleteAccount } from '../../Controller/UserController/profileCtrl.js';
import { verifyToken } from '../../Utils/verifyuser.js';

const router = express.Router();

router.post("/sign-out", verifyToken, signOut);
router.delete("/delete/:id", verifyToken, deleteAccount);

export default router;
import express from 'express';
import { signup, signin,google } from '../../Controller/UserController/authCtrl.js';

const router = express.Router();

router.post('/signup', signup);
router.post("/signin", signin)
router.post("/google",google)
// router.post("/signout", signOut);
// router.post("/delete-account", deleteAccount);

export default router;

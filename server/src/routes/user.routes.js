import { Router } from "express";
import { loginUser, registerUser, deleteUserAccount, verifyAuthOTP, logoutUser, resendOTP, getUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();


router.route('/register').post(upload.single('avatar'), registerUser);

router.route('/login').post(loginUser);

router.route('/logout').post(isAuthenticated, logoutUser)

router.route('/verify-auth-otp').post(verifyAuthOTP);

router.route('/resend-auth-otp').post(resendOTP);

router.route('/').get(isAuthenticated, getUser);

router.route('/').delete(isAuthenticated, deleteUserAccount);

export default router;
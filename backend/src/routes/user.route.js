import { Router } from "express";
import {
    registerUser,
    loginUser,
    currentUser,
    logOutUser
} from "../controllers/user.controller.js";
import { verifyLogin } from "../middlewares/user.middleware.js";

const router = Router();

router.route("/register").get(registerUser);
router.route("/login").post(loginUser);
router.route("/current").get(verifyLogin, currentUser);
router.route("/logout").get(verifyLogin, logOutUser);


export default router;
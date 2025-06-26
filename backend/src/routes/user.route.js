import { Router } from "express";
import {
    loginUser,
    currentUser,
    logOutUser
} from "../controllers/user.controller.js";
import { verifyLogin } from "../middlewares/user.middleware.js";

const router = Router();

router.route("/login").post(loginUser);
router.route("/current").get(verifyLogin, currentUser);
router.route("/logout").get(verifyLogin, logOutUser);


export default router;
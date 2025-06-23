import { Router } from "express";
import {
    uploadImage, 
    deleteImage, 
    editImage
} from "../controllers/myWork.controller.js";
import { verifyLogin } from "../middlewares/user.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/upload").post(verifyLogin, upload.single("image"), uploadImage);
router.route("/delete/:id").delete(verifyLogin, deleteImage);
router.route("/edit/:id").put(verifyLogin, editImage);

export default router;
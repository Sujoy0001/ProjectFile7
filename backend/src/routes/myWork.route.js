import { Router } from "express";
import {
    uploadImage, 
    deleteImage, 
    editImage,
    getMyWorkByTitle
} from "../controllers/myWork.controller.js";
import { verifyLogin } from "../middlewares/user.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/upload").post(verifyLogin, upload.single("image"), uploadImage);
router.route("/delete/:id").delete(verifyLogin, deleteImage);
router.route("/edit/:id").put(verifyLogin, upload.single("image"), editImage);
router.route("/title/:title").get(getMyWorkByTitle);

export default router;
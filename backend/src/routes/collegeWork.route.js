import { Router } from "express";
import {
    uploadImage, 
    deleteImage, 
    editImage,
    getCollegeWorkByTitle
} from "../controllers/collegeWork.controller.js";
import { verifyLogin } from "../middlewares/user.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/upload").post(verifyLogin, upload.single("image"), uploadImage);
router.route("/delete/:id").delete(verifyLogin, deleteImage);
router.route("/edit/:id").put(verifyLogin, upload.single("image"), editImage);
router.route("/title/:title").get(getCollegeWorkByTitle);

export default router;
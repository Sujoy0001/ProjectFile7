import mongoose, {Schema, model} from "mongoose";
import { myWorkSubcats,collegeWorkSubcats } from "../../../const.js";

const myWorkSchema = new Schema({
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    },
    title: {
        type: String,
        enum: myWorkSubcats || ["design", "logo_design", "mask_making", "book_cover", "other"],
        default: "other"
    }
}, {timestamps: true})

export const MyWork = model("MyWork", myWorkSchema);
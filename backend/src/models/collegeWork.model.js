import mongoose, {Schema, model} from "mongoose";
import { myWorkSubcats,collegeWorkSubcats } from "../constants.js";

const collegeWorkSchema = new Schema({
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    },
    title: {
        type: String,
        enum: collegeWorkSubcats || ["model_making", "sand_art", "other"],
        default: "other"
    }
}, {timestamps: true})

export const CollegeWork = model("CollegeWork", collegeWorkSchema);

import mongoose, {model, Schema} from "mongoose";

const imageSchema = new Schema({
    url : {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    myWork : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "MyWork",
    },
    collegeWork : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "CollegeWork",
    },
    profileImage : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Home",
    },
    collection : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Home",
    },
    aboutImage : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "About",
    }
}, {timestamps: true})

export const Image = model("Image", imageSchema);
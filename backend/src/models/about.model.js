import mongoose, {model, Schema} from "mongoose";

const aboutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    }
}, {
    timestamps: true
});

export const About = model("About", aboutSchema);

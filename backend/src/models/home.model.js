import mongoose, {Schema, model} from "mongoose";

const homeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    collectionImages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    }],
    profileImage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    },
    skills: [{
        type: String,
    }],
    bePositive : {
        type: String,
    }
}, {
    timestamps: true
});

export const Home = model("Home", homeSchema);

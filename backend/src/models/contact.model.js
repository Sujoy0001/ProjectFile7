import mongoose, {Schema,model} from "mongoose";

const contactSchema = new Schema({
    information : [{
        type: String,
        required: true
    }],
    links : [{
        type: String,
        required: true
    }]
}, {
    timestamps: true
});

export const Contact = model("Contact", contactSchema);

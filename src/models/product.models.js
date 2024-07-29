
import mongoose from "mongoose";

const clothSchema = new mongoose.Schema(
    {
        clothname: {
            type: String,
            required: true
        },
        imgurl: {
            type: [String],
            required: true
        },
        clothprice: {
            type: Number,
            required: true
        },
        material: {
            type: String,
            required: true
        },
        clothsize: {
            type: [String],
            required: true
        },
        clothcolor: {
            type: String,
            required: true
        },
        clothsStock: {
            type: Number,
            required: true
        },
        category: {
            type: [String],
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export const Cloth = mongoose.model("Cloth", clothSchema);

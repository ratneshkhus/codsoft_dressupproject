import mongoose from "mongoose";
import { User } from "./user.models.js";
import { Cloth } from "./product.models.js";

const orderschema = mongoose.Schema(
    {
        userid: String,
        products: [
            {
                cloth: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Cloth',
                },
                quantity: {
                    type: Number,
                    default : 1
                },
                clothprice : Number,
                selectedSize: String
            }
        ],
        orderstatus:String,
        totalamount: Number,
    }, { timestamps: true }
);

export const Order = mongoose.model("Order", orderschema);

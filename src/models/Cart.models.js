import mongoose from "mongoose";
import { User } from "./user.models.js";
import { Cloth } from "./product.models.js";

const Cartschema = mongoose.Schema(
    {
        userId: String,
        products: [
            {
                cloth: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Cloth',
                    // required: true
                },
                quantity: {
                    type: Number,
                    // required: true,
                    default : 1
                },
                clothprice : Number,
                selectedSize: String
            }
        ],
        Totalprice : Number,
    }, { timestamps: true }
);

export const Cart = mongoose.model("Cart", Cartschema);

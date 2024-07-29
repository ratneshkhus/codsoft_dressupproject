import mongoose from "mongoose";

const userschema = mongoose.Schema(
    {
        username: String,
        password: {
            type: String,
            // required: true,
        },
        email: {
            type: String,
            // required: true,
            // lowercase : true,
            // unique : true,
        },
        address: {
            type :String ,
            // required: true,
            // lowercase : true,
        },
        mobile : {
            type : Number,
        }
    },{timestamps : true}
)

export const User = mongoose.model("Users",userschema)
// dressupadmin
// 4lGTyTMf088swMIH
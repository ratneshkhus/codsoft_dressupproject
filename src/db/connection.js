import mongoose from "mongoose";

const conn = async() =>{
    try{
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("database connected ratu !!");
    }
    catch(error){
        console.log("7777777 : error for reason  : " + error);
    }
}
export {conn}
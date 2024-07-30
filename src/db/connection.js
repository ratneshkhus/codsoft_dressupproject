import mongoose from "mongoose";

const conn = async() =>{
    try{
        await mongoose.connect('mongodb+srv://dressupadmin:4lGTyTMf088swMIH@dressup.1n0fbjq.mongodb.net/dressup?retryWrites=true&w=majority&appName=dressup', {
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

import mongoose from 'mongoose';
import 'dotenv/config';
const mongo = process.env.MONGO_URI;
export async function connectDB(){
    if(!mongo){
        console.log("URI is not present");
        process.exit(1);
    }
    try{
        await mongoose.connect(mongo);
        console.log("connected to the mongodb");

    }catch(err){
        console.log("terimkc",err);
        process.exit(1);
    }
}
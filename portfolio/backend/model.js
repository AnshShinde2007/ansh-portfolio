import mongoose from "mongoose";
import { CgPassword } from "react-icons/cg";
const usersch = new mongoose.Schema({
    username: String,
    email:String,
    subject:String,
    fullmsg:String
})

export const user = mongoose.model('User',usersch);
export const admin = mongoose.model('admin',adminmodel)
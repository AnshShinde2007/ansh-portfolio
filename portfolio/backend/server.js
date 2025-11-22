
import express from "express";
import { connectDB } from "./database.js";
import userroutes from './route.js'
import cors from 'cors'

const app = express();
app.use(cors({
    origins:['http://localhost:5173'],
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
await connectDB();

app.use('/',userroutes);
console.log(`The server is running on http://localhost:${process.env.PORT} `)
app.listen(process.env.PORT)

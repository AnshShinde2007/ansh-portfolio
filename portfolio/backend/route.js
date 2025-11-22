
import express from 'express';
import {user} from './model.js'
const router = express.Router();

router.post('/submit',async(req,res)=>{
    try{
        const userpost= await user.create(req.body);
        res.json({message:" new User created",user});
    }catch(err){
        res.status(500).json({err})
    }
})
router.get('/responses',async(req,res)=>{
    const userres = await user.find().lean();
    res.json(userres)
})

export default router;

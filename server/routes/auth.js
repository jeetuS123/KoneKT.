const express=require("express")
const router=express.Router()
const mongoose=require("mongoose")
const User=mongoose.model("User")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const {JWT_SECRET}=require('../keys')
const requireLogin=require("../middleware/requireLogin")



router.post('/signup',(req,res)=>{
    const {name,email,password}=req.body;
    if(!name||!email||!password){
       return res.status(422).json({error:"complete the require fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser)
        return res.status(422).json({error:"user already register with same email"})
        bcrypt.hash(password,12)
        .then((hassedPassword)=>{
            const user=new User({
                name,
                email,
                password:hassedPassword
              
            })
            user.save()
            .then(user=>{
            
            res.json({message:"successfully logged in"})
            })
            .catch(err=>{
             console.log(err)
            })
        })
       
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body
    User.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser)
        return res.status(422).json({err:"invalid email or password"})
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){

               const {_id,name,email}=savedUser
               const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
               res.json({token,user:{_id,name,email}})
            }
            else
            return res.status(422).json({err:"invalid email or password"})
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports=router
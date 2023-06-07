const express=require("express")
const router=express.Router()
const mongoose=require("mongoose")
const User=mongoose.model("User")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const {JWT_SECRET}=require('../config/keys')
const requireLogin=require("../middleware/requireLogin")

const nodemailer=require('nodemailer')
const sendgridTransport=require('nodemailer-sendgrid-transport')

//app.set("view engine", "ejs");

router.post('/signup',(req,res)=>{
    const {name,email,password,pic}=req.body;
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
                password:hassedPassword,
                pic:pic
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

               const {_id,name,email,followers,following,pic}=savedUser
               const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
               res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else
            return res.status(422).json({err:"invalid email or password"})
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

router.post("/forgot-password",async (req,res)=>{
    const {email}=req.body;
    try{
        const oldUser=await User.findOne({email});
        if(!oldUser){
            return res.send("user not exist");
        }
        const secret =JWT_SECRET+oldUser.password;
        const token=jwt.sign({email:oldUser.email,id:oldUser._id},secret,{
            expiresIn:"5m",
        });
        const link=`http://localhost:5000/reset-password/${oldUser._id}/${token}`;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'robinrajpoot009@gmail.com',
              pass: 'ddcysbefuurihtbj'
            }
          });
          
          var mailOptions = {
            from: 'youremail@gmail.com',
            to: 'yourfriend@gmail.com',
            subject: 'password reset',
            text: link,
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        console.log(link);
    } catch(error) {}
})

router.get("/reset-password/:id/:token",async(req,res)=>{
    const{id,token}=req.params;
    console.log(req.params);
    const oldUser=await User.findOne({_id:id});
    if(!oldUser){
        return res.json({status:"user not exist"})
    }
    const secret =JWT_SECRET+oldUser.password;
    try{
        const verify = jwt.verify(token, secret);
        res.render("../views/index", { email: verify.email, status: "Not Verified" });
    }catch(error){
        res.send("not varified");
    }
    
})

router.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
  
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      const encryptedPassword = await bcrypt.hash(password, 10);
      await User.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: encryptedPassword,
          },
        }
      );
      //res.json({status:"password updated"});
      res.render("../views/index", { email: verify.email, status: "verified" });
    } catch (error) {
      console.log(error);
      res.json({ status: "Something Went Wrong" });
    }
  });
  
module.exports=router
const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types;
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
      type:String,
      default:"https://res.cloudinary.com/dpxn5xial/image/upload/v1680987740/Default_pfp.svg_bp065k.png"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})

mongoose.model("User",userSchema)
const express=require("express")
const cors=require("cors")
const app=express()
const mongoose=require("mongoose")
const PORT=process.env.PORT || 5000
const {MONGOURI} =require("./config/keys")

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));

mongoose.connect(MONGOURI)
mongoose.connection.on("connected",()=>{
    console.log("connected to mongo")
})
mongoose.connection.on("error",(err)=>{
    console.log("error in connecting",err)
})
app.use(cors({
    origin:"http://localhost:3000"
}))

require('./models/user')
require('./models/post')
mongoose.model("User")
mongoose.model('Post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"))
    const path =require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(_dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running on port",PORT)
})


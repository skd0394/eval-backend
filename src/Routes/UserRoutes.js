const {Router}=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const UserModel = require('../Models/UserModel')

const userRoute=Router()

userRoute.post('/register',async(req,res)=>{
       const newUser=req.body;
        try {
            let user=await UserModel.findOne({"email":newUser.email})
            console.log(user)
            if(user){
                res.status(400).send("User already exist, please login")
            }else{
                bcrypt.hash(newUser.password, 2, async(err, hash)=> {
                    newUser.password=hash;
                    await UserModel.insertMany([newUser])
                    res.status(200).send({"msg":"User Registered Successfully"})
                });
            }
        } catch (error) {
            res.status(400).send({"msg":error.message})
        }
})

userRoute.post('/login',async(req,res)=>{
        const {email,password}=req.body;
        try {
            const user=await UserModel.findOne({"email":email})
            // console.log(user)
            if(user){
                bcrypt.compare(password,user.password,(err,result)=>{
                    if(result){
                        const token=jwt.sign({"userID":user._id},'helo')
                        res.status(200).send({"msg":"Login Successful","token":token})
                    }else{
                        res.status(200).send({"msg":"Wrong Credentials"})
                    }
                })
            }else{
                res.status(400).send({"msg":"Please Register First"})
            }
        } catch (error) {
            res.status(400).send({"msg":error.message})
        }
})


module.exports=userRoute
const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name : {type:String},
    email : {type:String,unique:true},
    gender : String,
    password : String,
    age : Number,
    city : String,
    is_married : Boolean
})

const UserModel=mongoose.model('user',userSchema)

module.exports=UserModel
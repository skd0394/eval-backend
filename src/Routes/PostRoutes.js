const {Router}=require('express')
const PostModel = require('../Models/PostModel')

const PostRoute=Router()

PostRoute.get('/',async(req,res)=>{
    // console.log(req.body.userID)
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 3;
       const posts= await PostModel.find({"userID":req.body.userID}).skip((page - 1) * perPage)
       .limit(perPage);
       res.status(200).send(posts)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

PostRoute.post('/add',async(req,res)=>{
    try {
        const newPost=req.body
        await PostModel.insertMany([newPost])
        res.status(200).send({"msg":"Post added successfully"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

PostRoute.get('/top',async(req,res)=>{
     try{
        await PostModel.find()
     }catch(error){

     }
})

PostRoute.patch('/update',async(req,res)=>{
    const {updatedPost}=req.body
    try {
        await PostModel.findByIdAndUpdate({"_id":updatedPost._id},{updatedPost})
        res.status(200).send({"msg":"updated successfully"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

PostRoute.delete('/delete',async(req,res)=>{
    const {deletePost}=req.body
    try {
        await PostModel.findByIdAndDelete({"_id":deletePost._id},{deletePost})
        res.status(200).send({"msg":"Deleted successfully"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports=PostRoute
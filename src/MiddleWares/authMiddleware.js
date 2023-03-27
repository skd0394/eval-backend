const jwt=require('jsonwebtoken')


const authCheck=(req,res,next)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,'helo')
    try {
        if(decoded){
            req.body.userID=decoded.userID
            next()
        }else{
            res.status(400).send({"msg":"provide token"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
}

module.exports=authCheck
module.exports=((req,res,next)=>{
    if(req.session.userverify){
       
        res.redirect('/')
    }else{
        next()
    }
})
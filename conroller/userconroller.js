const usercollection = require("../model/user model")
const bcrypt=require('bcryptjs')

const loginget= async(req,res)=>{
  
    if(req.session.userverify){
      const userData = await usercollection.findOne({ _id: req.session.userData._id})
      if(!userData){
        req.session.userverify = false
        return res.redirect('/')
      }
      return res.render('home',{userdetails: userData})
    }
  
    else{
      res.render('login',{signup:req.session.signup,Exists:req.session.exists,invalid:req.session.invalidpass})
      req.session.signup=false
      req.session.exists=false
      req.session.invalidpass=false
      req.session.save()
 
    }
   
}

const signupget=((req,res)=>{
    res.render('signup')
})


 
 const userRegister = async (req, res) => {
   
 
    try {
         
       const bcryptpassword = await bcrypt.hash(req.body.password,10)
 
       const user = new usercollection({
          name: req.body.name,
          email: req.body.email,
          password: bcryptpassword,
          phone: req.body.phone
         })
 
       const userExists = await usercollection.findOne({ $or:[{email: req.body.email},{phone:req.body.phone}] })
       if (userExists) {
          req.session.userExist = true
      
          res.redirect('/signup')
         } else {
          req.session.signup=true
          await user.save()
         
          res.redirect('/')
         }
      }
 
    catch (error) {
       console.log(`THIS IS THE ERROR IN SIGN UP : ${error}`);
    }
 }
 const logionverify=async(req,res)=>{
   try{
      const userdata=await usercollection.findOne({email:req.body.email})
     if(userdata){
       const passwordmatch=await bcrypt.compare(req.body.password,userdata.password)
       if(passwordmatch){
        
    
          
           req.session.userverify=true
           req.session.userData=userdata
           
           
          
           res.redirect('/')
            
          
         
       }else{
         req.session.invalid=true
         res.redirect('/')
       }
     }else{
      req.session.exists=true
      res.redirect('/')
     }
      
   }
   catch(error){
      console.log(error)
   }
 }
 const userlogout=(req,res)=>{
  
    req.session.userverify=false
   res.redirect('/')
  
   
 }

module.exports={loginget,signupget,userRegister,logionverify,userlogout}
const express=require('express')
const userconroller=require('../conroller/userconroller.js')
const userauth=require('../midelewere/userauth.js')
const router=express.Router()


router.get('/',userconroller.loginget)
router.get('/signup',userauth,userconroller.signupget)

router.post('/signup',userconroller.userRegister)
router.post('/login',userconroller.logionverify)
router.get('/logout',userconroller.userlogout)


module.exports=router
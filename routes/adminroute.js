const express=require('express')
const admincontroller=require('../conroller/admincontroler')
const adminauth=require('../midelewere/adminauth')
const router=express.Router()




router.get('/admin',admincontroller.adminget)
router.post('/admin',admincontroller.adminlogin)
router.post('/logout',admincontroller.adminlogout)
router.post('/adminsearch',admincontroller.usersearch)
router.get('/adminedit/:id',adminauth,admincontroller.edituser)
router.put('/updateuser/:id',admincontroller.updateuser)
router.delete('/deleteuser/:id',admincontroller.deleteuser)
router.post('/addUser',admincontroller.adduser)
module.exports=router
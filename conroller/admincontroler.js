const usercollection = require('../model/user model')
const bcrypt = require('bcryptjs')



const adminget = async (req, res) => {
    if (req.session.logged) {
        if (req.session.search) {
            res.render('adminhome', { userdetails: req.session.search })
            req.session.search = false
            return req.session.save()
        }
        const userdata = await usercollection.find()
        // setTimeout(() => {
        //     req.session.logged = false;
        //     req.session.save()
        // }, 9000)
        
        res.render('adminhome', { userdetails: userdata })
        req.session.userAdd = false
    } else {
        res.render('admin')
    }
}
const adminlogin = ((req, res) => {


    if (req.body.email == process.env.EMAIL && req.body.password == process.env.PASSWORD) {
        req.session.logged = true


        res.redirect('/admin')
    }
    else {
        req.session.logged = false
        res.redirect('/admin')
    }
})
const adminlogout = ((req, res) => {
    req.session.logged = false
    res.redirect('/admin')
})
const usersearch = async (req, res) => {

    try {
        const searchuser = await usercollection.find({ name: { $regex: req.body.search, $options: 'i' } })
        req.session.search = searchuser
        res.redirect('/admin')
    } catch (error) {
        console.log(error)
    }

}
const edituser = async (req, res) => {
    try {
        const details = await usercollection.findById({ _id: req.params.id })
        res.render('adminedit', { details })
    }
    catch (error) {
        console.log(error)
    }
}
const updateuser = async (req, res) => {
    try {

        const { name, email, phone } = req.body
        const usercheck = await usercollection.findOne({ $or: [{ email }, { phone }] })
        if (usercheck && req.params.id != usercheck._id) {
            res.send({ mailexists: true })
        } else {
            await usercollection.findByIdAndUpdate({ _id: req.params.id }, { $set: { name, email, phone } })
            res.send({ success: true })
        }
    } catch (error) {
        consolelog(error.message)
    }
}
const deleteuser = async (req, res) => {

    try {
        await usercollection.deleteOne({ _id: req.params.id })
        res.send({ success: true })
    } catch (error) {
        console.log(error)
    }
}
const adduser = async (req, res) => {
    console.log(req.body)
    try {
        const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
        const newUser = new usercollection({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: encryptedPassword,
        });
        const checkAdduser = await usercollection.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] });
        console.log(checkAdduser)

        if (checkAdduser) {
            res.status(208).send({ emailExists: true })
        } else {
            req.session.userAdd = true
            newUser.save();
            res.status(200).send({ success: true })

        }
    } catch (error) {
        console.log(error);
    }


}

module.exports = { adminget, adminlogin, adminlogout, usersearch, edituser, updateuser, deleteuser, adduser }
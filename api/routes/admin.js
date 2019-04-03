const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const Admin = require('../models/admin.models')
const User = require('../models/user.models')
const jwt = require('jsonwebtoken')
const key = require('../core/jwt_key')
const checkAuth = require('../middleware/check-token')

const store = require('store')

router.get('/',checkAuth,(req,res, next)=>{
    const token = req.headers.authorization.split(" ")[1]
    const dataUser = jwt.decode(token, key).status
    if(dataUser === "admin"){
        Admin.find()
        .exec()
        .then(datas => {
            var response = {
                count : datas.length,
                users : datas.map(data=>{
                    return{
                        nama : data.nama,
                        email : data.email,
                        password : data.password,
                        _id : data._id,
                        request : {
                            type : 'GET',
                            url : 'http://localhost:4000/admin/'+data._id
                        }
                    }
                })
            }
            
            res.status(200).json(response)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error : err
            })
        })
    }
    else{
        res.status(401).json({
            message : "Auth Failed"
        })
    }
})

router.get('/lihatUser',checkAuth,(req,res, next)=>{
    const token = req.headers.authorization.split(" ")[1]
    const dataUser = jwt.decode(token, key).status
    if(dataUser === "admin"){
        User.find()
        .exec()
        .then(datas => {
            store.set('token', token)
            var response = {
                count : datas.length,
                users : datas.map(data=>{
                    return{
                        nama : data.nama,
                        email : data.email,
                        password : data.password,
                        gender : data.gender,
                        _id : data._id,
                        request : {
                            type : 'GET',
                            url : 'http://localhost:4000/admin/lihatUser/'+data._id,
                            store : store.get('token')
                        }
                    }
                })
            }
            
            res.status(200).json(response)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error : err
            })
        })
    }
    else{
        res.status(401).json({
            message : "Auth Failed"
        })
    }
})


router.post('/tambahUser',checkAuth,(req,res, next)=>{
    const token = req.headers.authorization.split(" ")[1]
    const dataUser = jwt.decode(token, key).status
    if(dataUser === "admin"){
        var salt = bcrypt.genSaltSync(10)

        var hash = bcrypt.hashSync(req.body.password, salt)

        const user = new User({
            _id : mongoose.Types.ObjectId(),
            nama : req.body.nama,
            email : req.body.email,
            password : hash,
            gender : req.body.gender
        })

        user.save().then(result => {
            console.log(result)
            res.status(201).json({
                message : "Create new user successfully",
                createdUser : {
                    _result : result._result,
                    nama : result.nama,
                    email : result.email,
                    password : hash,
                    gender : result.gender,
                    request : {
                        type : "GET",
                        url : "http://localhost:4000/admin/"+result._id
                    }
                }
            })
        })
        .catch(err=>console.log(err))
    }
    else{
        res.status(401).json({
            message : "Auth Failed"
        })
    }

})

router.post('/tambahAdmin',checkAuth,(req,res, next)=>{
    const token = req.headers.authorization.split(" ")[1]
    const dataUser = jwt.decode(token, key).status
    if(dataUser === "admin"){
        var salt = bcrypt.genSaltSync(10)

        var hash = bcrypt.hashSync(req.body.password, salt)

        const admin = new Admin({
            _id : mongoose.Types.ObjectId(),
            nama : req.body.nama,
            email : req.body.email,
            password : hash,
            gender : req.body.gender
        })

        admin.save().then(result => {
            console.log(result)
            res.status(201).json({
                message : "Create new user successfully",
                createdUser : {
                    _result : result._result,
                    nama : result.nama,
                    email : result.email,
                    password : hash,
                    gender : result.gender,
                    request : {
                        type : "GET",
                        url : "http://localhost:4000/admin/"+result._id
                    }
                }
            })
        })
        .catch(err=>console.log(err))
    }
    else{
        res.status(401).json({
            message : "Auth Failed"
        })
    }
})

router.get('/lihatUser/:id', checkAuth, (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]
    const dataUser = jwt.decode(token, key).status

    if(dataUser === "admin"){
        const id = req.params.id
        User.findById(id)
        .exec()
        .then(data => {
            console.log(data)
            res.status(200).json({
                user : data,
                request : {
                    type: "GET",
                    url : "http://localhost:4000/admin"
                }
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({error : err})
        })
    }
    else{
        res.status(401).json({
            message : "Auth Failed"
        })
    }
    
})

// untuk merubah sebahagian isi item (misal, update nama atau email)
router.patch('/ubahUser/:id', checkAuth, (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]
    const dataUser = jwt.decode(token, key).status
    
    if(dataUser === "admin"){
        const id = req.params.id
        const updateOps = {}

        for(var ops of req.body){
            updateOps[ops.propName] = ops.value
        }

        User.update({_id:id},{
            $set : updateOps
        })
        .exec()
        .then(data=>{
            console.log(data)
            res.status(200).json({
                user : data,
                message : 'User berhasil di update',
                request : {
                    type :"GET",
                    url : "http://localhost:4000/admin/"+id
                }
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({error:err})
        })
    }
    else{
        res.status(401).json({
            message : "Auth Failed"
        })
    }
})

router.put('/ubahUser/:id', checkAuth, (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]
    const dataUser = jwt.decode(token, key).status
    
    if(dataUser === "admin"){
       User.findByIdAndUpdate(req.params.id, req.body, (err, post)=>{
           if(err){
               console.log(err)
           }

           res.json(post)
       })
    }
    else{
        res.status(401).json({
            message : "Auth Failed"
        })
    }
})

router.delete('/hapusUser/:id', checkAuth, (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]
    const dataUser = jwt.decode(token, key).status

    if(dataUser === "admin"){
        const id = req.params.id
        User.remove({_id : id})
        .exec()
        .then(data=>{
            res.status(200).json({
                message : "User berhasil di hapus",
                requet : {
                    type : "POST",
                    url : "http://localhost:4000/admin",
                    body : {
                        nama : "String",
                        email : "String",
                        password : "String",
                        gender : "String"
                    }
                }
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({error:err})
        })
    }
    else{
        res.status(401).json({
            message : "Auth Failed"
        })
    }
})

module.exports = router
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user.models')
const Admin = require('../models/admin.models')
const jwt = require('jsonwebtoken')
const key = require('../core/jwt_key')
const request = require('request')

router.post('/daftar', (req,res,next)=>{
    
    User.find({email : req.body.email})
    .exec()
    .then(user =>{
        if(user.length >= 1){
            console.log(user)
            return res.status(409).json({
                message : "Email telah digunakan",
                data : user
            })
        }
        else{
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
                            url : "http://localhost:4000/user/"+result._id
                        }
                    }
                })
            })
            .catch(err=>console.log(err))
        }
    })
    .catch()

})

router.get('/daftar', (req,res,next)=>{
    res.sendFile(__dirname +"/public/login-user.html")
})

router.get('/', (req,res,next)=>{
    res.sendFile(__dirname+"/public/")
})

router.get('/login',(req,res,next)=>{
    res.status(200).json({
        message : "Form login user disini"
    })
})

router.post('/login', (req,res,next)=>{
    User.find({email : req.body.email})
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(401).json({
                message : "Auth Failed"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err,result) =>{
            if(err){
                return res.status(401).json({
                    message : "Auth Failed"
                })
            }

            if(result){
                const token = jwt.sign({
                    email : user[0].email,
                    userId : user[0]._id,
                    status : 'user'
                }, key, {
                    expiresIn : "2h"
                })

                return res.status(200).json({
                    message : "Auth successful",
                    token : token,
                    user : user
                })
            }

            return res.status(401).json({
                message : "Auth Failed"
                
            })
        } )
    })
    .catch()
})

router.post('/loginAsAdmin', (req,res,next)=>{
    Admin.find({email : req.body.email})
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(401).json({
                message : "Auth Failed"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err,result) =>{
            if(err){
                return res.status(401).json({
                    message : "Auth Failed"
                })
            }

            if(result){
                const token = jwt.sign({
                    email : user[0].email,
                    userId : user[0]._id,
                    status : 'admin'
                }, key, {
                    expiresIn : "2h"
                })

                request({
                    headers :{
                        'Content-Type' : 'application/x-www-form-urlencoded',
                        'Authorization' : token
                    }
                }, function(err,res,body){
                    
                })

                return res.status(200).json({
                    message : "Auth successful",
                    token : token
                })
            }

            return res.status(401).json({
                message : "Auth Failed"
                
            })
        } )
    })
    .catch()
})

router.get('/loginAsAdmin', (req,res)=>{
    res.status(200).json({
        message : "Login sebagai admin"
    })
})


module.exports = router
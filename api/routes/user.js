const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user.models')
const checkAuth = require('../middleware/check-token')
const key = require('../core/jwt_key')
const jwt = require('jsonwebtoken')

// router.get('/',checkAuth,(req,res, next)=>{
    
//     User.find()
//     .exec()
//     .then(datas => {
//         var response = {
//             count : datas.length,
//             users : datas.map(data=>{
//                 return{
//                     nama : data.nama,
//                     email : data.email,
//                     password : data.password,
//                     _id : data._id,
//                     request : {
//                         type : 'GET',
//                         url : 'http://localhost:4000/user/'+data._id
//                     }
//                 }
//             })
//         }
        
//         res.status(200).json(response)
//     })
//     .catch(err=>{
//         console.log(err)
//         res.status(500).json({
//             error : err
//         })
//     })
// })

router.get('/:id',checkAuth, (req,res,next)=>{
    const id = req.params.id
    const token = req.headers.authorization.split(" ")[1]
    const dataUser = jwt.decode(token, key).status
    if(dataUser === 'user') {
        User.findById(id)
        .exec()
        .then(data => {
            // console.log(data)
            res.status(200).json({
                user : data,
                request : {
                    type: "GET",
                    url : "http://localhost:4000/user"
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
router.patch('/:id',checkAuth, (req,res,next)=>{
    const id = req.params.id
    const token = req.headers.authorization.split(" ")[1]
    const dataUser = jwt.decode(token, key).status
    if(dataUser === 'user'){
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
                    url : "http://localhost:4000/user/"+id
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

router.put('/:id',checkAuth, (req,res,next)=>{
    const id = req.params.id
    const token = req.headers.authorization.split(" ")[1]
    const dataUser = jwt.decode(token, key).status
    if(dataUser === 'user'){
        User.findByIdAndUpdate(id, req.body, (err,post)=>{
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

// router.delete('/:id', checkAuth, (req,res,next)=>{
//     const id = req.params.id
//     User.remove({_id : id})
//     .exec()
//     .then(data=>{
//         res.status(200).json({
//             message : "User berhasil di hapus",
//             requet : {
//                 type : "POST",
//                 url : "http://localhost:4000/user",
//                 body : {
//                     nama : "String",
//                     email : "String",
//                     password : "String",
//                     gender : "String"
//                 }
//             }
//         })
//     })
//     .catch(err=>{
//         console.log(err)
//         res.status(500).json({error:err})
//     })
// })

module.exports = router
const jwt = require('jsonwebtoken')
const key = require('../core/jwt_key')
const store = require('store')

module.exports = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        
        const decoded = jwt.verify(token, key)
        req.userData = decoded
        
        next()
    }
    catch(error){
        return res.status(401).json({
            message: "Auth Failed"
        })
    }
}
const express = require('express')
const morgan  = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = require('./api/models/db')
const cors = require('cors')

const port = process.env.PORT || 4000

const app = express()
const userRoutes = require('./api/routes/user')
const adminRoutes = require('./api/routes/admin')
const indexRoutes = require('./api/routes/index')

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

// routes
app.use('/user', userRoutes)
app.use('/admin', adminRoutes)
app.use('/', indexRoutes)
// app.use(express.static('public'))

app.use((req,res,next)=>{
    const error = new Error('404 Not Found')
    error.status = 404
    next(error)
})

app.use((err, req,res,next)=>{
    res.status(err.status || 500)
    res.json({
        error : {
            message : err.message
        }
    })
})


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})
require('dotenv').config()
const { connect } = require('mongoose')
const cors = require('cors')
const express = require('express')
const app = express()

const users = require('./routes/users')
const notes = require('./routes/notes')

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/users', users)
app.use('/notes', notes)
app.get('/*', (req, res)=>{
    res.json({message:'Welcome to the API'})
})

connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connected to MongoDB')
    })
    .catch((err)=>{
        console.log(err)
    })

    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
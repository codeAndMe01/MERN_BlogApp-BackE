const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const userRouter = require('./routes/user-routes');
const blogRouter = require('./routes/blog-routes');
const env = require('dotenv').config()

const URL= process.env.MONGO_URL
mongoose.connect(URL)
.then(()=>{console.log("DB Connected")})
// QemKljV13XACeOUl

app.use(cors())

app.use(express.json())

app.use(userRouter)
app.use(blogRouter)

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`connect to ${PORT}`)
})
const express = require('express')
const app = express()
require('./db/mongoose')



const userRouter = require('./routers/user')
const sign_upRouter = require('./routers/sign_up')
const loginRouter =require('./routers/login')
const taskRouter = require('./routers/task')


app.use(express.json())


app.use('/users',userRouter)
app.use('/sign_up',sign_upRouter)
app.use('/login',loginRouter)
app.use('/tasks',taskRouter)

module.exports = app
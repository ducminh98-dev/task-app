const express = require('express')
const app = express()
const cors = require('cors')
require('./db/mongoose')



const userRouter = require('./routers/user')
const sign_upRouter = require('./routers/sign_up')
const loginRouter =require('./routers/login')
const taskRouter = require('./routers/task')
const bookRouter = require('./routers/book')

app.use(express.json())
app.use(cors())

app.use('/users',userRouter)
app.use('/sign_up',sign_upRouter)
app.use('/login',loginRouter)
app.use('/tasks',taskRouter)
app.use('/books',bookRouter)
module.exports = app
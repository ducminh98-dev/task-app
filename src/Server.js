const app = require('./app')
const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is running' + ' '+ port)
    
})

console.log(process.env.MONGODB_URL)
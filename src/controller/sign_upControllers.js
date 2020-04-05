const User = require('../models/user')

module.exports = {

    post: async (req,res) => {
        const data = new User(req.body)
        try{
             await data.save()
            res.status(201).send(data)
        }catch(e){
            res.status(401).send(e)
        }
    }

}
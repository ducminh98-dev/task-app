const User = require('../models/user')

module.exports = {

    post: async (req,res) => {
        try{
             const data = await User.create(req.body)
           return res.send(data).status(201)
        }catch(e){
            res.status(401).send(e)
        }
    }

}
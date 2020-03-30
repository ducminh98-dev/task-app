const User = require('../models/user')

module.exports = {

    get: async (req,res) => {
        try{
            res.send(req.user)
        }
        catch(e){
            res.status(500).send(e)
        }
    },


    patch: async (req,res)=> {

        let updates = Object.keys(req.body)
        let allowUpdates = ["name", "phone"]
        let isValidOperation = updates.every((update) => allowUpdates.includes(update))
        if( !isValidOperation) {
         res.status(401).send('Invalid Updates')
        }

        try{

            updates.forEach((update) => req.user[update] = req.body[update])
            await req.user.save()
            res.send(req.user).status(201)
        }catch(e){
            res.status(500)
        }    
    },

    delete: async (req,res) => {
        
        try{
           await req.user.remove()
            res.send(req.user).status(200)
        }catch(e){
            res.send(e)
        }
    }


}
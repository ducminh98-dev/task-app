const User = require('../models/user')

module.exports = {

    post: async (req,res) => {
       try{
           const user = await User.findByEmailPassword(req.body.email,req.body.password)
           const token = await user.gererateAuthToken()
           res.send({user, token})
       }catch(err){
           res.status(401).send(err)
       }

    },

    logout: async (req,res) => {
        try {
            req.user.tokens = req.tokens.filter((token) => {
                return token.token !== req.token
            })
            await req.user.save()
            res.status(200).send("log outed")
        }catch(e){
            res.status(500).send()
        }

    },

    logall: async (erq,res) => {
        try {
            req.user.tokens = []
            await req.user.save()
            res.send("log outed all")
        }catch(e){
            res.status(500).send()
        }
    }
}
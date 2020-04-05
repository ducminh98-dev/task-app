const Task = require('../models/task')

module.exports = {

    get: async (req,res) => {
        const match ={}
        const sort ={}
        if(req.query.completed) {
            match.completed = req.query.completed === 'true'
        }
        if(req.query.sortBy){
            let parth = req.sortBy.split(':')

            sort[parth[0]] = sort[parth[1]] === 'desc' ? -1 : 1
        }
        try{


        await req.user.populate({
                path: 'tasks',
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort
                }
        }).execPopulate();
        
            res.send(req.user.tasks).status(200)
        }catch(err){
            res.status(500).send("cant get")
        }
    
    },

    post: async (req,res) => {
        try{

        const data =  await Task.create({
                ...req.body,
                'owner': req.user._id
            })
            await data.save()
            res.status(201)
            res.send(data)
        }catch(err){
            res.send(err)
        }
    },
    

    patch: async (req,res) => {
        let updates = Object.keys(req.body)
        let allowUpdate = ['name','description', 'completed' ]
        let isValidOperation = updates.every((update) => allowUpdate.includes(update))
        if( !isValidOperation){
            res.status(401).send("invalid updates")
        }

        try{

            let task = await Task.findOne({
                _id: req.params.id,
                owner: req.user._id
            })

            if( !task ){
                res.send("invalid updates").status(401)
            }

            updates.forEach((update) => task[updates] = req.body[updates] )
            await task.save()
            res.send(task).status(201)
        }catch(e){

            res.status(401).send()
        }

    },

    delete: async (req,res) => {

        try{
             let data = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
             if( !data ){
                 res.status(404).send("not found")
             }
             res.status(200).send(data)
        }catch(e){
            res.status(500)
        }
    }

}
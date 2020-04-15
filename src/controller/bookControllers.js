const Book = require('../models/book')

module.exports = {

    get: async(req,res) => {
    
        try{
            const books = await Book.find()
            res.status(200).send(books)
        }catch(err){
            res.status(500).send(err)
        }
    
    },

    post: async(req,res) => {
        try{
            const books = await Book.create({
                ...req.body,
                'author': req.user._id
            })
            await books.save()
            res.status(201).send(books)
        }catch(err){
            res.status(401).send(err)
        }

    }
}
const mongoose =  require('mongoose')

const bookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 75
        },
        description: {
            type: String, 
            maxlength: 255,
            required:true,
            trim: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }
    },{
        timestamps: true
    }
);

const Books = mongoose.model("Books", bookSchema,"books")
module.exports = Books;
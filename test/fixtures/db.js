const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')



const userNoneId = new mongoose.Types.ObjectId()
const userNone = {
    _id: userNoneId,
    name: "Ducminh98",
    password: "123456",
    email:  "ducminh98@gmail.com",
    tokens: [
        {
            token: jwt.sign({_id: userNoneId},process.env.SECRET_TOKEN)
        }
    ]
}

const userTwoID =new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoID,
    name: "minhdz98",
    password: "123456",
    email:  "minh98@gmail.com",
    tokens: [
        {
            token: jwt.sign({_id: userTwoID},process.env.SECRET_TOKEN)
        }
    ]
}


const taskOne ={
    _id: new mongoose.Types.ObjectId(),
    name: "One",
    description: "TaskOne",
    completed: false,
    owner: userNone._id
}

const taskTwo ={
    _id: new mongoose.Types.ObjectId(),
    name: "Two",
    description: "TaskTwo",
    completed: true,
    owner: userNone._id

}
const taskThird ={
    _id: new mongoose.Types.ObjectId(),
    name: "Third",
    description: "TaskThird",
    completed: false,
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userNone).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThird).save()
}




module.exports = {
    userNoneId,
    userNone,
    userTwoID,
    userTwo,
    taskOne,
    taskTwo,
    taskThird,
    setupDatabase,
}

    
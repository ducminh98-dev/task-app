const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {userNoneId,
    userNone,
    userTwo,
    taskOne,
    taskTwo,
    taskThird,
    setupDatabase, } = require('./fixtures/db')
beforeEach(setupDatabase)

test('should create new task', async () => {
    const response = request(app).post('/tasks')
                        .set('Authorization', `Bearer ${userNone.tokens[0].token}`) 
                        .send({
                            name: "kiss crush",
                            description: "pacpacpapccp",
                        }).expect(201)
    const task = await Task.findById((await response).body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})


test('should get all task of user', async () => {
    const response = await request(app).get('/tasks')
                        .set('Authorization', `Bearer ${userNone.tokens[0].token}`)
                        .send()
                        .expect(200) 
    expect(response.body.length).toEqual(2)
})


test('Should not delete other users tasks', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})  



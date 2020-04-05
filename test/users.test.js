const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {userNoneId, userNone, setupDatabase} =require('./fixtures/db')

//this method will be call every time when method test complete....
beforeEach(setupDatabase)
//................
//...............

//sign_up user
test('should sign up a new users', async () => {
   const response = await request(app).post('/sign_up').send({
        name: 'duc minh',
        email: 'minhdzvl@gmail.com',
        password: '123456'
    }).expect(201)
    
    //Assert that the database was challge corrcectly
    const user = User.findById(response.body._id)
    expect(user).not.toBeNull()

    
    //Assertions about the response
    expect(response.body).not.toMatchObject({
        name: 'duc minh',
        email:'minhdzvl@gmail.com',
        password: '123456'//wrong
    })

})

// login 
test('should login user', async () =>{
    await  request(app).post('/login').send({
        email: userNone.email,
        password: userNone.password
    }).expect(200)  
})


// cant login
test('Should not login nonexistuser', async () =>{
    await request(app).post('/login').send({
        email: userNone.email,
        password: 'mot23456'
    }).expect(401)
})


// get profile of user
test('should get user profile ', async() => {
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${ userNone.tokens[0].token}`)
        .send()
        .expect(200)
})


// test cant get profile user
test('should dont get user profile', async () => {
    await request(app).get('/users/me')
        .set('Authorization', `Bearer adsdfsgsdfsdfsdfsad`)
        .send()
        .expect(401)
})

//test delete user 
test('should delete user', async () => {
    await request(app).delete('/users')
        .set('Authorization', `Bearer ${userNone.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userNoneId)
    expect(user).toBeNull()
})


//test cant delete user 
test('cant delete user ', async() => {
    await request(app).delete('/users')
        .set('Authorization', `${userNone.tokens[0].token}hahahahhaha`)
        .send()
        .expect(401)
})

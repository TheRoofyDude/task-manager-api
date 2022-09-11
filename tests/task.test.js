const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { userOne, 
    userOneId, 
    userTwoId, 
    userTwo, 
    taskOne,
    taskTwo,
    taskThree, 
    setupDatabase 
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Should display all task for user one', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toBe(2)
    
})

test('Should not delete taskone by user two', async () => {
    const response = await request(app)
        .delete('/task/:id')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send({ _id: taskOne._id })
        .expect(404)
    expect(taskOne).not.toBeNull()
})
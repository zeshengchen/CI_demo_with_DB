import request from 'supertest'
import app from '../user_profile.js'

describe('POST /profile', function () {
    it('valid input 1', function (done) {
        request(app)
            .post('/profile')
            .send({
                first_name: 'Zesheng',
                last_name: 'Chen'
            })
            .expect(201, {}, done)
    })

    it('valid input 2', function (done) {
        request(app)
            .post('/profile')
            .send({
                first_name: 'Caleb',
                last_name: 'Chen'
            })
            .expect(201, {}, done)
    })

    it('invalid input 1', function (done) {
        request(app)
            .post('/profile')
            .send({
                first_name: 'Zesheng'
            })
            .expect(400, {}, done)
    })

    it('invalid input 2', function (done) {
        request(app)
            .post('/profile')
            .send({
                last_name: 'Chen'
            })
            .expect(400, {}, done)
    })
})

describe('Update /profile', function () {
    it('update a user', function (done) {
        request(app)
            .put('/profile/0')
            .send({
                first_name: 'Josephine',
                last_name: 'Chen'
            })
            .expect(204, {}, done)
    })
})

describe('Get /profile', function () {
    it('get users', function (done) {
        request(app)
            .get('/profile')
            .expect(200,
                [{ first_name: 'Josephine', last_name: 'Chen' },
                { first_name: 'Caleb', last_name: 'Chen' }]
                , done)
    })

    it('get a user', function (done) {
        request(app)
            .get('/profile/?id=0')
            .expect(200,
                { first_name: 'Josephine', last_name: 'Chen' }
                , done)
    })
})

describe('Delete /profile', function () {
    it('delete user 1', function (done) {
        request(app)
            .delete('/profile/Josephine')
            .expect(204, {}, done)
    })

    it('delete user 2', function (done) {
        request(app)
            .delete('/profile/Caleb')
            .expect(204, {}, done)
    })
})

const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = mongoose.model('User')

const helperConfigs = require('./test_helper');

describe('User', () => {
    

    it('Register User: Check if user exits on database', (done) => {

        User.findOne({ email: 'test@test.com' })
                .then(user => {
                    assert(user !== null);
                    done();
                });
    });

    it('Login User: handles a POST request to /api/users/login', (done) => {

        request(app)
            .post('/api/users/login')
            .send({ user: { email: 'test@test.com', password: "123456ab" } })
            .end((err, response) => {
                assert(response.body.user.email === 'test@test.com')
                done();
            });
    });

    it('Login User: Missing credentials', (done) => {

        request(app)
            .post('/api/users/login')
            .send({ user: {password: "123456ab" } })
            .end((err, response) => {
                assert(response.status === 422);
                done();
            });
    });


    it('Get User: handles a GET request to /api/user', (done) => {

        request(app)
            .get('/api/user')
            .set('Authorization', `Token ${helperConfigs.userToken}`)
            .end((err, response) => {
                assert(response.body.user.email === 'test@test.com')
                done();
            });
    });

});
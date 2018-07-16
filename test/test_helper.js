const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

let helperConfigs = {};

//Executes once before test block
before(() => {
    mongoose.connect('mongodb://localhost/test_adminconsultorio');
    mongoose.connection
        .once('open', () => {})
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});

//Drop Database
beforeEach((done) => {

    const { users, projects, pacients } = mongoose.connection.collections;
    users.drop(() => {
        projects.drop(() => {
            pacients.drop(() => {
                done();
            })
        })
    });
});

//Register and Login User
beforeEach((done) => {
    request(app)
        .post('/api/users')
        .send({ user: { username: "test", email: 'test@test.com', password: "123456ab" } })
        .end((err, response) => {
            helperConfigs.userToken = response.body.user.token
            done();
        });
});

module.exports = helperConfigs;
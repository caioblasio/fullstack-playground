const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Project = mongoose.model('Project');

const helperConfigs = require('./test_helper');

describe.only('Project', () => {
    
    it('Creates a Project: handles a POST to /api/projects', (done) => {
        request(app)
            .post('/api/projects')
            .send({ name: "Test Project" })
            .set('Authorization', `Token ${helperConfigs.userToken}`)
            .end((err, response) => {
                assert(response.body.name === 'Test Project')
                done();
            });
    });

});
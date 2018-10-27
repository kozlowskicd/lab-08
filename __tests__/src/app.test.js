'use strict';

const {server} = require('../../src/app.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('api server', () => {
  it('should respond with a 404 on an invalid route', () => {
    return mockRequest
      .get('/foo')
      .then(results => {
        expect(results.status).toBe(404);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });
  it('should respond with a 404 on an invalid method', () => {
    return mockRequest
      .post('/api/v1/notes/12')
      .then(results => {
        expect(results.status).toBe(404);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });
  it('should respond proprly on request to /api/v1/notes', () => {
    return mockRequest
      .get('/api/v1/notes')
      .then(results => {
        expect(results.status).toBe(200);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });
  it('should be able to post to /api/v1/notes', () => {
    let obj = {title:'test',text:'foo'};
    return mockRequest
      .post('/api/v1/notes')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.title).toEqual(obj.title);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });
});
describe('user routes', () => {
  it('404s when on a bad route', () => {
    return mockRequest
      .get('/api/v1/wrongname')
      .then(results => {
        expect(results.status).toBe(404);
      });
  });
  it('returns get on /api/v1/users', () => {
    return mockRequest
      .get('/api/v1/users')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });
  it('returns get on /api/v1/users:id', () => {
    return mockRequest
      .get('/api/v1/users/2')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });
  it('can post on /api/v1/users', () => {
    let postData = {name:'testing', text:'test text'};
    return mockRequest
      .post('/api/v1/users')
      .send(postData)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.name).toEqual(postData.name);
      });
  });
  it('can delete data', () => {
    return mockRequest
      .delete('/api/v1/users/2')
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body._id).toBeFalsy();
      });
  });
});
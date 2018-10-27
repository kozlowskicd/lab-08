'use strict';

import express from 'express';

import notes from '../models/notes.js';
import router from '../middleware/model-finder.js';

const router = express.Router();

let sendJSON = (data,response) => {
  response.statusCode = 200;
  response.statusMessage = 'OK';
  response.setHeader('Content-Type', 'application/json');
  response.write( JSON.stringify(data) );
  response.end();
};

// const notes = {};



router.get('/api/:model/notes', (request,response,next) => {
  notes.find()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      sendJSON(output, response);
    })
    .catch( next );
});

router.get('/api/:model/notes/:id', (request,response,next) => {
  notes.find({_id:request.params.id})
    .then( result => sendJSON(result, response) )
    .catch( next );
});

router.post('/api/:model/notes', (request,response,next) => {
  notes.save(request.body)
    .then( result => sendJSON(result, response) )
    .catch( next );
});

router.put('/api/:model/notes/:id', (request,response,next) => {
  notes.save(request.params.id, request.body)
    .then( result => sendJSON(result, response) )
    .catch( next );
});

router.patch('/api/:model/notes/:id', (request,response,next) => {
  notes.patch(request.params.id, request.body)
    .then( result => sendJSON(result, response) )
    .catch( next );
});

router.delete('/api/:model/notes/:id', (request,response,next) => {
  notes.delete(request.params.id)
    .then( result => sendJSON(result, response) )
    .catch( next );
});

export default router;

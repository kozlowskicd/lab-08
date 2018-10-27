'use strict';

import uuid from 'uuid/v1';
import fs from 'fs';
import util from 'util';

const writeToFile = util.promisify(fs.writeFile);
let storage = {};
let databaseLocation = '../../../data/users.json';
let database = require(databaseLocation);

storage.find = query => {
  let id = query && query._id;
  return new Promise( (resolve,reject) => {
    if (id) {
      if(database[id]) {resolve(database[id]);}
      else {reject('Not Found');}
    }
    else {
      console.log(Object.keys(database));
      const results = Object.keys(database).map( key => {
        return database[key];
      });
      resolve(results);
    }
  });
};

storage.delete = id => {
  return new Promise( (resolve,reject) => {
    if ( database[id] ) {
      delete database[id];
      storage.saveDatabase()
        .then(() => resolve(database[id]))
        .catch(err => reject(err));
    }
    else {
      let response = { error: `${id} not found` };
      reject(response);
    }
  });
};

storage.save = (data) => {
  return new Promise( (resolve,reject) => {
    data._id = data._id || uuid();
    let record = Object.assign({}, database[data._id], data);
    database[record._id] = record;
    storage.saveDatabase()
      .then(() => resolve(database[data._id]))
      .catch(err => reject(err));
  });
};

storage.saveDatabase = () => {
  let data = JSON.stringify(database);
  return writeToFile(databaseLocation, data)
    .then(result => true)
    .catch(err => err);
};

export default storage;
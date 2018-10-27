'use strict';

// import storage from '../lib/storage/memory.js';
import storage from '../lib/storage/file.js';
// import storage from 'mongostuff';


class Tasks {

  static findOne(id) {
    let query = { _id:id };
    return this.find(query);
  }

  static find(query) {
    console.log('from tasks');
    return storage.find(query);
  }

  static save(data) {
    return storage.save(data);
  }

  static delete(id) {
    return storage.delete(id);
  }

  static put(id, data) {
    return storage.save(data);
  }

  static patch(id, data) {
    data._id = id;
    return storage.save(data);
  }

}

export default Tasks;

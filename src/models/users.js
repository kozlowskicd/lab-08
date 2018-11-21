'use strict';

// import storage from '../lib/storage/memory.js';
import storage from '../lib/storage/file.js';
// import storage from 'mongostuff';

class Users {
  static findOne(id) {
    let query = {_id:id};
    return this.find(query);
  }
  static find(query) {
    return storage.find(query);
  }
  static save(data) {
    validateInput(data);
    return storage.save(data);
  }
  static delete(id) {
    console.log(id);
    return storage.delete(id);
  }
  static put(id, data) {
    data._id = id;
    return storage.save(data);
  }
  static patch(id, data) {
    data._id = id;
    return storage.save(data);
  }
}
const validateInput = (data) => {
  if (data.firstname && data.lastname && data.email && data.role) {
    if (data.role === 'user' || data.role === 'editor' || data.role === 'admin') {
      if (data.email == /^[\w]+@+[\w]+.+[\w]/) {
        return(data);
      }else {return(null);}
    }else {return(null);}
  }else {return(null);}
};

// _id, firstname, lastname, email, role; 
// Perform the following data validations on save and update:

// All fields are required
// email is a valid email address
// role is one of the following values: user, editor, admin

export default Users;
'use strict';

var fs = require('fs');
var Contacts = {}

Contacts.pull = function(cb){
  fs.readFile('./models/contacts.json', function(err, data){
    if(err) throw err;
    var contacts = JSON.parse(data);
    
    cb(err, contacts || []);
  });
};
Contacts.remove = function(index, cb){
  Contacts.pull(function(err, contacts){
    if(err) return cb(err);
    contacts.splice(index, 1);
    console.log('contact removed:', contacts);
    var data = JSON.stringify(contacts);
    fs.writeFile('./models/contacts.json', data, function(err){
      if(err) return cb(err);
      cb(null);
    })
  });
};
Contacts.edit = function(contactInfo, cb){
  Contacts.pull(function(err, contacts){
    if(err) return cb(err);
    contacts[contactInfo.index] = contactInfo.contact
    var data = JSON.stringify(contacts)
    console.log('contact edit:', data)
    fs.writeFile('./models/contacts.json', data, function(err){
      if(err) return cb(err);
      cb(null);
    })
  })
}
Contacts.create = function(contact, cb){
  Contacts.pull(function(err, contacts){
    if(err) return cb(err);
    contacts.push(contact);
    var data = JSON.stringify(contacts);
    console.log('database ops:', data)
    fs.writeFile('./models/contacts.json', data, function(err){
      if(err) return cb(err);
      cb(null);
    })
  });
};

module.exports = Contacts;

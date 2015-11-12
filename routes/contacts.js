var express = require('express');
var router = express.Router();
var Contacts = require('../models/contactFunctions.js')
  router.get('/', function(req, res){
  var sendData;
  Contacts.pull(function(err, contacts){
    sendData = contacts
    console.log(sendData)
    if(sendData){
    res.render('contacts', {contacts: sendData || []});
  }
  })
  console.log(sendData)
});

router.post('/delete', function(req, res){
  var index = (req.body.deleteIndex);
  Contacts.remove(index, function(err){
    if(err) console.log('OH NO AN ERROR!', err);
    else {
      console.log("Contact successfully removed");
      res.send('Contact Deleted')
    }
  });
});

router.post('/edit', function(req, res){
  res.send(req.body)
  var index = (req.body.index)
  var contact = (req.body.contact)
  Contacts.edit(req.body, function(err){
    if(err) console.log('OH NO AN ERROR', err);
    else console.log('Contact successfully edited.')
  })
})

router.post('/', function(req,res){
  var contact = req.body
  Contacts.create(contact, function(err){
    if(err) console.log('OH NO AN ERROR', err);
    else console.log('Contact successfully created')
  });
  
  var sendData;
  Contacts.pull(function(err, contacts){
    console.log('send data:', contacts)
    if(err) throw err;
    sendData =  contacts;
    res.send(sendData)
     
  })  
});

module.exports = router;

var Contacts = require('./models/contactFunctions.js');

var contact = {name: 'jesse', number: 'canada', email : 'ilovecanada@gmail.com', address: '1234 niagra falls'}

Contacts.create(contact, function(err){
  if(err) console.log('OH NO AN ERROR', err);
  else console.log('Contact successfully created')
});

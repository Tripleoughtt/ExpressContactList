$('document').ready(init);

function init(){
  $('#submit').on('click', sendContact);
  $('.append').on('click', '.edit',  editContact)
  $('.append').on('click', '.delete', removeContact);
  $('.submit').on('click', sendEdit)
}

function sendContact(){
  var name = $('#name').val();
  var number = $('#number').val();
  var email = $('#email').val();
  var address = $('#address').val();
  var contactInfo = {name: name, number: number, email: email, address: address }
  console.log(contactInfo)
    $.ajax({
      type: 'POST',
      url: '/contacts',
      data:  contactInfo
    })
  .done(function(data){
    createNewContact(contactInfo);
    console.log(data);
  })
  .fail(function(err){
    console.log(err)
  });
}
var currContact;
function editContact(e){
   var elementEdit = $(this).closest('tr')
   currContact = elementEdit.index()
   $('.newName').val((elementEdit.children('.name').text()))
   $('.newEmail').val((elementEdit.children('.email').text()))
   $('.newAddress').val((elementEdit.children('.address').text()))
   $('.newPhone').val((elementEdit.children('.number').text()))

  //var contactInfo = ({ index: editIndex, contact:{name: editName, number: editNum, email: editEmail, address: editAddress}})
  console.log('going to edit contact')
  console.log(currContact)
  //$.post('/contacts/edit', contactInfo);
  //.done(function(data){

  //});
}

function removeContact(e){
  var elementDelete = $(this).closest('tr');
  var deleteIndex = elementDelete.index();
  console.log(deleteIndex);
  console.log('going to remove contact')
  $.post('/contacts/delete', {deleteIndex: deleteIndex})
  .done(function(data){
    console.log(deleteIndex)
    contactDelete(deleteIndex);
  });
}

function createAllContacts(data){
    var elements = $();
    data.forEach(function(contact){
      var $tr = $('.template').clone();
      console.log($tr)
      var $name = contact.name;
      var $num = contact.number;
      var $email = contact.email;
      var $address = contact.address;
      $tr.children('.name').text($name)
      $tr.children(".number").text($num)
      $tr.children(".email").text($email)
      $tr.children(".address").text($address)
      $tr.removeClass('template')
      elements = elements.add($tr)
    })
    console.log(elements)
    $('.append').append(elements);
}

function createNewContact(contact){
      var $tr = $('.template').clone();
      console.log($tr);
      var $name = contact.name;
      var $num = contact.number;
      var $email = contact.email;
      var $address = contact.address;
      $tr.children('.name').text($name);
      $tr.children(".number").text($num);
      $tr.children(".email").text($email);
      $tr.children(".address").text($address);
      $tr.removeClass('template');
      $('.append').append($tr);
  }
function contactDelete(index){
  if(index > 1){
  $('.append').children(`tr:nth-child(${index})`).remove()
  } else if(index === 0){
    console.log('okaywhatsup')
    $('.append').children('tr:first-child').remove();
  }
}

function sendEdit(){
  var editIndex = currContact;
  var editName =  $('.newName').val();
  var editEmail = $('.newEmail').val();
  var editAddress  = $('.newAddress').val();
  var editNum = $('.newPhone').val();
  var contactInfo = ({ index: editIndex, contact:{name: editName, number: editNum, email: editEmail, address: editAddress}})
  console.log(contactInfo)
  $.post('/contacts/edit', contactInfo)
  .done(function(data){
    console.log(data)
    if(editIndex > 0){
      var currRow = $('.append').children(`tr:nth-child(${editIndex})`)
      currRow.children('.name').text(editName);
      currRow.children('.email').text(editEmail)
      currRow.children('.number').text(editNum);
      currRow.children('.address').text(editAddress);
    } else { 
      var currRow = $('.append').children(`tr:first-child`)
      currRow.children('.name').text(editName);
      currRow.children('.email').text(editEmail)
      currRow.children('.number').text(editNum);
      currRow.children('.address').text(editAddress);
    }
  })
}

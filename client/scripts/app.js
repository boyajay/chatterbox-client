// YOUR CODE HERE:
var app ={};
app.server = 'https://api.parse.com/1/classes/chatterbox'; 

app.send = function(){


};
$.get(app.server, getInfo);

app.init = function(){};

function getInfo(data){
  var dataHolder = data;
  for(var i = 0; i < dataHolder.results.length; i++) {
    var dataName = dataHolder.results[i].username;
    var dataText = dataHolder.results[i].text;
    var username;
    var text;

    if(dataName !== undefined){
     username = dataName.match(/[^\<\>\(\)\'\"\{\}\&\|\[\]]+/ig);
     }
     if(dataText !== undefined){
     text = dataText.match(/[^\<\>\(\)\'\"\{\}\&\|\[\]]+/ig);
     }
    $("#chats").append( username + ": " + text + '<br>');
  }
}


// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'https://api.parse.com/1/classes/chatterbox',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message');
//   }
// });

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };
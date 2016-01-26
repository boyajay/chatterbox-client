// YOUR CODE HERE:
var app ={};
app.server = 'https://api.parse.com/1/classes/chatterbox?limit=1000'; 



//$('.submit').on('click', app.send);
app.send = function(){
  //get the text from the input html field
  var msg = $('.input').val();
  console.log(msg, "msg");
  var msgObj = {
    username: "BoyaANDHamzah",
    text: msg,
    roomname: "public"
  };
  // console.log(msgObj, "msgObj!");

  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(msgObj),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
  test();
};

function test (){
  console.log(app.server);
  $.get(app.server, getInfo);
}

$.get(app.server, getInfo);

app.init = function(){};

function getInfo(data){
  var dataHolder = data;
  $("#chats").text(' ');
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
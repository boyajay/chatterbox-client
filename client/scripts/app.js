// YOUR CODE HERE:
var app ={};
app.server = 'https://api.parse.com/1/classes/chatterbox?limit=1000'; 



//$('.submit').on('click', app.send);
app.send = function(){
  //get the text from the input html field
  var msg = $('.input').val();
  var usr = $('.name').val();
  var rmname = $('.room').val()|| "public";
  console.log(msg, "msg");
  var msgObj = {
    username: usr,
    text: msg,
    roomname: rmname
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
  $('select').empty();
  $("#chats").empty();
  var rooms = [];
  for(var i = 0; i < dataHolder.results.length; i++) {
    var dataName = dataHolder.results[i].username;
    var dataText = dataHolder.results[i].text;
    var currentroom = dataHolder.results[i].roomname;
    // console.log("currentroom is "+ currentroom );
    var username;
    var text;
    var roomName;
    if(dataName !== undefined){
     username = dataName.match(/[^\<\>\(\)\'\"\{\}\&\|\[\]]+/ig);
     }
    if(dataText !== undefined){
     text = dataText.match(/[^\<\>\(\)\'\"\{\}\&\|\[\]]+/ig);
     }
    $("#chats").prepend( username + ": " + text + '<br>');
    

    if(currentroom !== undefined){
     roomName= currentroom.match(/[^\<\>\(\)\'\"\{\}\&\|\[\]]+/ig);
    
     }
    
    if (roomName && rooms.indexOf(roomName[0]) === -1){
      rooms.push(roomName[0]);
     
    }
  }
  for(var j = 0; j < rooms.length; j++) {
    $('select').append("<option value="+ rooms[j] + ">" + rooms[j] + "</option>");
  }
}


// YOUR CODE HERE:
var app ={};
app.server = 'https://api.parse.com/1/classes/chatterbox?limit=1000'; 

var friendsSelected = [];
app.send = function(){
  var msg = $('.input').val();
  var usr = $('.name').val();
  var rmname = $('.room').val()|| "public";
  console.log(msg, "msg");
  var msgObj = {
    username: usr,
    text: msg,
    roomname: rmname
  };
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
  app.refreshFeed();
};

app.refreshFeed = function(roomname){
  var obj ={
    "order" : "-createdAt" 
  };
  if(roomname){
    obj.where = {"roomname": {"$regex": $("#roomMenu :selected").text()}};
  }
   $.ajax({
    url: app.server,
    type: 'GET',
    data: obj,
    contentType: 'application/json',
    success: function(data){console.log("refreshing"); getInfo(data);},
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};

$.get(app.server, app.refreshFeed);

app.filterEscapes = function(string){
  return string.match(/[^\<\>\(\)\"\{\}\&\|\[\]]+/ig);
};

app.init = function(){};

  var rooms = [];
  var dataHolder;
function getInfo(data){
  dataHolder = data;
  $('select').empty();
  $("#chats").empty();
  for(var i =0; i < dataHolder.results.length; i++) {
    var dataName = dataHolder.results[i].username;
    var dataText = dataHolder.results[i].text;
    var currentroom = dataHolder.results[i].roomname;
    // console.log("currentroom is "+ currentroom );
    var username;
    var text;
    var roomName;
    if(dataName){
     username = app.filterEscapes(dataName);
     }
    if(dataText){
     text = app.filterEscapes(dataText);
     }
    $("#chats").append("<div class='posts'>"+ username + ": " + text + ' </div> <br>');
    

    if(currentroom){
     roomName = app.filterEscapes(currentroom);
    
     }
    
    if (roomName && rooms.indexOf(roomName[0]) === -1){
      rooms.push(roomName[0]);
     
    }

  }
  for(var j = 0; j < rooms.length; j++) {
    $('select').append("<option value="+ rooms[j] + ">" + rooms[j] + "</option>");
  }
  app.friendMatcher();

}
app.friendMatcher = function (){
  var fullList = $('.posts');
  for(var k = 0; k < fullList.length; k++){
    for(var j =0; j <friendsSelected.length; j++){
      if(fullList[k].innerHTML.match(/[^:]+/)[0] === friendsSelected[j]){
        console.log("match");
        $(fullList[k]).addClass('username');
      }
    }
  }  
  //friendsSelected  append to id "friendsList
  $('#friendsList span').empty();
  for (var i=0; i < friendsSelected.length; i++){
    $('#friendsList span').append("<div class='aFriend'>" + friendsSelected[i] + "</div>");
  console.log(friendsSelected, friendsSelected[i]);
  }

};

app.roomSelect= function (){
  var roomNameSelected = $("#roomMenu :selected").text();
  app.refreshFeed(roomNameSelected);
};


app.friendMaker = function(){

  var currentName = $(this).text().match(/[^:]+/)[0];
  var fullList = $('.posts');
  if (friendsSelected.indexOf(currentName) ===-1){
    friendsSelected.push(currentName);
  }
  app.friendMatcher();

};
  $(document).on('click', '.posts' , function(){app.friendMaker.call(this);});




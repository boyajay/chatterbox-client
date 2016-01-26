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
  refreshFeed();
};


function refreshFeed (roomname){
  var obj ={
    "order" : "-createdAt" 
  };
  if(roomname){
    obj.where = {"roomname": {"$regex": $("#roomMenu :selected").text()}};
  }
//{"name":{"$regex":"\Qtest\E"}}

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

  //$.get(app.server, getInfo);
}

$.get(app.server, refreshFeed);

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
     username = dataName.match(/[^\<\>\(\)\"\{\}\&\|\[\]]+/ig);
     }
    if(dataText){
     text = dataText.match(/[^\<\>\(\)\"\{\}\&\|\[\]]+/ig);
     }
    $("#chats").append("<div class='posts'>"+ username + ": " + text + ' </div> <br>');
    

    if(currentroom){
     roomName = currentroom.match(/[^\<\>\(\)\"\{\}\&\|\[\]]+/ig);
    
     }
    
    if (roomName && rooms.indexOf(roomName[0]) === -1){
      rooms.push(roomName[0]);
     
    }

  }
  for(var j = 0; j < rooms.length; j++) {
    $('select').append("<option value="+ rooms[j] + ">" + rooms[j] + "</option>");
  }
}


function roomSelect(){
  var roomNameSelected = $("#roomMenu :selected").text();
  refreshFeed(roomNameSelected);
}

app.friendMaker = function(){
  var fullList = $('.posts');
  // console.log(fullList, "fullList");
  // console.log(fullList[0].innerHTML);
  for(var i = 0; i < fullList.length; i++){
    if(fullList[i].innerHTML.match(/[^:]+/)[0] === $(this).text().match(/[^:]+/)[0]){
      console.log("match");
      $(fullList[i]).addClass('username');
    }
  }
  // var sentence = $(this).text();
  // console.log(sentence.match(/[^:]+/)[0]);
  // console.log(dataHolder.results[10].username);
};
  $(document).on('click', '.posts' , function(){app.friendMaker.call(this);});




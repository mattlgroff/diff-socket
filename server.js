const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client){
  console.log("User connected.");
  console.log(client);

  client.on('event', function(data){
	console.log(data);
});
  client.on('disconnect', function(){
	console.log("User disconnected.");
});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

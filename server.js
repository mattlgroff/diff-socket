const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8080;
const diffDetector = require('./controllers/diffDetector.js');
const URL = process.env.URL_TO_DIFF || 'http://localhost:8080';

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client){

  console.log("User connected.");

  client.on('chat message', function(msg){
    console.log(diffDetector.isDiff(URL));

    diffDetector.isDiff(URL, function(diff){
      if(diff){
        console.log("IsDiff is true.");
        io.emit('server response', `Change detected.`);
      }
      else{
        console.log("IsDiff is false.");
        io.emit('server response', `No change detected.`);
      }
    });

  });

  client.on('disconnect', function(){
  	console.log("User disconnected.");
  });

});

http.listen(PORT, () => console.log(`Diff Socket listening at: ${PORT}`));

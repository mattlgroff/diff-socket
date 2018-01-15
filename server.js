const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const diffDetector = require('./controllers/diffDetector.js');
const PORT = process.env.PORT || 8080;
const cron = require('./controllers/cron.js');
require('dotenv').config();
const SECONDS = process.env.TIME_IN_SECONDS || 60;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client){

  const URL_TO_DIFF = client.handshake.headers.diff_url;

  diffDetector.firstRun(URL_TO_DIFF);

  console.log("User connected.");

  cron.seconds(URL_TO_DIFF, io, SECONDS);

  client.on('disconnect', function(){
  	console.log("User disconnected.");
  });

});

http.listen(PORT, () => console.log(`Diff Socket listening at: ${PORT}`));

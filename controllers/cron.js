const cron = require('node-cron');
const diffDetector = require('./diffDetector.js');

module.exports = {
  seconds: function(url ,io, seconds){
    cron.schedule(`*/${seconds} * * * * *`, function(){
      //console.log(`running diffDetector every ${seconds} seconds`);

      diffDetector.isDiff(url, function(diff){
        //Diffence Detected
        if(diff){
          io.emit('server response', `Change detected.`);
        }
        //No Difference Detected
        else{
          // io.emit('server response', `No change detected.`);
        }
      });
    });
  }
}
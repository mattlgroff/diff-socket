const request = require('request');
const fs = require('fs');
const crypto = require('crypto');

module.exports = {
  isDiff: function(url, cb){

    const filename = `./diffys/${this.extractHostname(url)}.md5`;

    fs.readFile(filename, 'utf8', (err, oldScrape) => {
      if(err){
        console.error(err);
        throw err;
      }
      //Request after reading the stored file.
      request(url, (error, response, html) => {
          if(error){
            console.error(`Problem loading ${url}`);
            console.error(error);
            return cb(error);
          }
          //No Error Occured
          else{
            let oldHash = oldScrape.toString().trim();
            let newHtml = html.toString().trim();
            let newHash = crypto.createHash('md5').update(newHtml).digest("hex");

            if(oldHash !== newHash){
              console.log(`Diff detected on ${this.extractHostname(url)}`);   
              console.log(`Old Hash: ${oldHash}`);
              console.log(`New Hash: ${newHash}`);


              fs.writeFile(filename, newHash , 'utf8', (err, data) => {
                if(err){
                  console.error(err);
                  throw err;
                }
                //console.log("New file written.");
                return cb(true);
              });
            }
            else{
              //console.log("Nothing new.");
              return cb(false);
            }

          }

      });//End Request

    });//End FS

  },
  firstRun: function(url){

    request(url, (error, response, html) => {

      if(error){
        console.error(`Problem loading ${url}`);
        console.error(error);
        return;
      }
      //No Error Occured
      else{
        let newHtml = html.toString().trim();
        let newHash = crypto.createHash('md5').update(newHtml).digest("hex");

        const filename = `./diffys/${this.extractHostname(url)}.md5`;
        
        fs.writeFile(filename, newHash , 'utf8', (err, data) => {
          if(err){
            console.error(err);
            throw err;
          }
          console.log(`Initializing diff-socket for ${this.extractHostname(url)}`);
          return;
        });
    
      }

    });//End Request
  },
  extractHostname: function(url){
    let hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
  }
}


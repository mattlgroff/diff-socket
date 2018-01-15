const request = require('request');
const diff = require('diff');
const fs = require('fs');

module.exports = {
  isDiff: function(url, cb){

    const filename = `./diffys/${this.extractHostname(url)}.html`;

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
            let newHtml = html.toString().trim();
            let oldHtml = oldScrape.toString().trim();

            let diffy = diff.diffChars(oldHtml,newHtml);
            let diffArr = [];
            //Map over differences.
            diffy.map(diff => {
              if(diff.added == true || diff.removed == true){
                diffArr.push('dummy');
              }
            });

            if(diffArr.length){
              console.log("Diff detected!");

              const filename = `./diffys/${this.extractHostname(url)}.html`;

              fs.writeFile(filename, newHtml , 'utf8', (err, data) => {
                if(err){
                  console.error(err);
                  throw err;
                }
                console.log("New file written.");
                return cb(true);
              });
            }
            else{
              console.log("Nothing new.");
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

        const filename = `./diffys/${this.extractHostname(url)}.html`;
        
        fs.writeFile(filename, newHtml , 'utf8', (err, data) => {
          if(err){
            console.error(err);
            throw err;
          }
          console.log("First run, new file written.");
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


const request = require('request');

module.exports = {
  oldScrape: "",
  isDiff: function(url, cb){

    request(url, function(error, response, html){

      if(error){
        console.error(`Problem loading ${url}`);
        console.error(error);
        return cb(error);
      }
      //No Error Occured
      else{
        let newHtml = html.toString();
        
        if(newHtml === this.oldScrape){
          console.log("Nothing new.")
          return cb(false);
        }
        else{
          console.log("Diff detected!");
          this.oldScrape = newHtml;
          return cb(true);
        }
      }

    });

  }
}


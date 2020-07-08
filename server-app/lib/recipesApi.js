//recipesApi

var request = require("request");
const recipeUtil = require('./recipeUtil.js');

const method = 'GET';
const url = 'https://yummly2.p.rapidapi.com/feeds/search';
const fat_KCALMax = '1000';
const maxTotalTimeInSeconds = 7200;
const  options = (url) => {
  var ot = {
    method: method,
    url: url,
    qs: {
      FAT_KCALMax: fat_KCALMax,
      maxTotalTimeInSeconds: maxTotalTimeInSeconds,
      allowedAttribute: 'diet-lacto-vegetarian%2Cdiet-low-fodmap',
      q: 'chicken soup',
      start: '0',
      maxResult: '18'
    },
    headers: {
      'x-rapidapi-host': 'yummly2.p.rapidapi.com',
      'x-rapidapi-key': '8de187489dmsh1cf623bbd30b485p169573jsnd406ecef6352'
    }
  }
  return ot;
};

const https = require('https');


https.get(url, (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error to get from RapiAPI: " + err.message);
});


const  sendRequest = (req, res, options) => {
  request(options, function (error, response, body) {
    if (error){
      //throw new Error(error);
      res.status(500).json({ error: error })
      //return Promise.reject('ERROR: ' + error);
    } 
    try{
      res.format ({
        'application/json': function() {
           body  = recipeUtil.jsonParser(body);
           res.send(body);
        },
        'default': function() {
           res.status(406).send('Content Type is Not Acceptable');
        }
     });

    }catch(err){
      console.log('err-->> ',err);
      res.send({error:err});
    }
  });
}

const  sendFullRequest = (req, res, options) => {
  request(options, function (error, response, body) {
    if (error){
      //throw new Error(error);
      res.status(500).json({ error: error })
      //return Promise.reject('ERROR: ' + error);
    } 
    try{
      res.format ({
        'application/json': function() {
           res.send(body);
        },
        'default': function() {
           res.status(406).send('Content Type is Not Acceptable');
        }
     });

    }catch(err){
      console.log('err-->> ',err);
      res.status(500).json({ error: error })
    }
  });
}
module.exports = {
  sendRequest: sendRequest,
  sendFullRequest: sendFullRequest,
  options: options,
  url: url
};


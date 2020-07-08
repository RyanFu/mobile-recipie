/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
  
var rp = require("request-promise");
  
function main(params) {
    
    var input_ingredients = params.ingredients.join(" ");
    var maxResult = params.maxResult || 1;

    var options = {
        uri: 'https://yummly2.p.rapidapi.com/feeds/search',
        qs: {
            maxResult: maxResult,
            q: input_ingredients
        },
        headers: {
            "x-rapidapi-host": "yummly2.p.rapidapi.com",
            "x-rapidapi-key": "8de187489dmsh1cf623bbd30b485p169573jsnd406ecef6352"
        },
        json: true
    };

    return rp(options)
    .then(function (resp) {
      return {result: resp};
    })
    .catch(function (err) {
      return {result: err};
    }); 
    
}
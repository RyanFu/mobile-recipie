
/* Model:
{
 trackingId:      String,
 linkTAg;         String,
 course:          [],
 dish:            String,
 description:     String,
 technique:       [0-3]
 preparationStepCount:number,
 nutrition:       [],
 video:           [],
 images:          url,
 keywords:        [0-10], 
 ingredientLines: [{}],
 guidedVariations:[],
 actions:         []
}
*/
function jsonParser(json) {
  try{
    var res = {};
    console.log('in parser');
    json = JSON.parse(json);
    res.trackingId = json.feed[0].display.displayName || null; 
    res.linkTag = json.feed[0].seo.firebase.webUrl || null;
    res.course = json.feed[0].content.tags.course[0].display || null;
    res.dish = json.feed[0].content.tags.dish[0].display || null;
    res.description = json.feed[0].content.description.text || null;
    res.technique = [];
    res.technique = json.feed[0].content.guidedVariations || null;
    res.preparationStepCount = json.feed[0].content.relatedProducts.preparationStepCount || null;
    res.nutrition = json.feed[0].content.nutrition || null;
    res.video = json.feed[0].content.videos.videoUrls || null;
    res.images = json.feed[0].content.details.images[0].resizableImageUrl || null;
    res.keywords = json.feed[0].content.details.keywords || null ;
    res.ingredienLines = json.feed[0].content.ingredientLines || null;
    res.guidedVariations = json.feed[0].content.guidedVariations || null;
    res.actions = json.feed[0].content.guidedVariations[0].actions || null;
    return res
  } catch(err){
    //handleError(res, err);               
    console.log("Error: " , err)
    return {};                                                     
  }                    
}

const status = {
  api: "cognizant-chef-recipe",
  company: "Cognizant.com",
  status: 'ok',
  timestamp: new Date()
}
module.exports = {
  jsonParser: jsonParser,
  status: status
};

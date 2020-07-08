const Cloudant = require('@cloudant/cloudant');

const cloudant_id = process.env.CLOUDANT_ID || '<cloudant_id>'
const cloudant_apikey = process.env.CLOUDANT_IAM_APIKEY || '<cloudant_apikey>';

// Local storage design
// {id: '', name: '', description:'', ingredients:'', steps:'', imageUrl:''}
//
// Cloudant DB to store hackathon-recipes
//{'id': [{id: '', name: '', description:'', ingredients:'', steps:'', imageUrl:'', }]}

// UUID creation
const uuidv4 = require('uuid/v4');

var cloudant = new Cloudant({
    account: cloudant_id,
    plugins: {
      iamauth: {
        iamApiKey: cloudant_apikey
      }
    }
  })

// Cloudant DB reference
let db;
let db_users = "hackathon-users";
let db_recipes = "hackathon-recipes";
let db_name =  "hackathon-recipes" //"community_db";

/**
 * Connects to the Cloudant DB, creating it if does not already exist
 * @return {Promise} - when resolved, contains the db, ready to go
 */
const dbCloudantConnect = () => {
    return new Promise((resolve, reject) => {
        Cloudant({  // eslint-disable-line
            account: cloudant_id,
                plugins: {
                    iamauth: {
                        iamApiKey: cloudant_apikey
                    }
                }
        }, ((err, cloudant) => {
            if (err) {
                console.log('Connect failure: ' + err.message + ' for Cloudant ID: ' +
                    cloudant_id);
                reject(err);
            } else {
                cloudant.db.list().then((body) => {
                    if (!body.includes(db_name)) {
                        console.log('DB Does not exist..creating: ' + db_name);
                        cloudant.db.create(db_name).then(() => {
                            if (err) {
                                console.log('DB Create failure: ' + err.message + ' for Cloudant ID: ' +
                                cloudant_id);
                                reject(err);
                            }
                        })
                    }
                    let db = cloudant.use(db_name);
                    console.log('Connect success! Connected to DB: ' + db_name);
                    resolve(db);
                }).catch((err) => { console.log(err); reject(err); });
            }
        }));
    });
}

// Initialize the DB when this module is loaded
(function getDbConnection() {
    console.log('Initializing Cloudant connection...', 'getDbConnection()');
    dbCloudantConnect().then((database) => {
        console.log('Cloudant connection initialized.', 'getDbConnection()');
        db = database;
    }).catch((err) => {
        console.log('Error while initializing DB: ' + err.message, 'getDbConnection()');
        throw err;
    });
})();

/**
 * Find all resources that match the specified partial name.
 * 
 * @param {String} type
 * @param {String} partialName
 * @param {String} userID
 * 
 * @return {Promise} Promise - 
 *  resolve(): all resource objects that contain the partial
 *          name, type or userID provided, or an empty array if nothing
 *          could be located that matches. 
 *  reject(): the err object from the underlying data store
 */
function find(type, partialName, userID) {
    return new Promise((resolve, reject) => {
        let selector = {}
        if (type) {
            selector['type'] = type;
        }
        if (partialName) {
            let search = `(?i).*${partialName}.*`;
            selector['name'] = {'$regex': search};

        }
        if (userID) {
            selector['userID'] = userID;
        }
        
        db.find({ 
            'selector': selector
        }, (err, documents) => {
            if (err) {
                reject(err);
            } else {
                resolve({ data: JSON.stringify(documents.docs), statusCode: 200});
            }
        });
    });
}

/**
 * Delete a resource that matches a ID.
 * 
 * @param {String} id
 * 
 * @return {Promise} Promise - 
 *  resolve(): Status code as to whether to the object was deleted
 *  reject(): the err object from the underlying data store
 */
function deleteById(id, rev) {
    return new Promise((resolve, reject) => {
        db.get(id, (err, document) => {
            if (err) {
                resolve(err.statusCode);
            } else {
                db.destroy(id, document._rev, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(200);
                    }
                })
            }            
        })
    });
}

/**
 * Create a resource with the specified attributes
 * 
 * @param {String} type - the type of the item
 * @param {String} name - the name of the item
 * @param {String} description - the description of the item
 * @param {String} quantity - the quantity available 
 * @param {String} location - the GPS location of the item
 * @param {String} contact - the contact info 
 * @param {String} userID - the ID of the user 
 * @param {String} id - the ID of the user 
 * @param {String} ingredients - the ingredients
 * @param {String} steps - the steps
 * @param {String} imageUrl - the image url
 * 
 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes
 */
function create(type, name, description, quantity, location, contact, unit, userID, id, ingredients, steps, imageUrl ) {
    return new Promise((resolve, reject) => {
        let itemId = uuidv4();
        let timestamp = Date.now();
        let data = {
            type: type,
            name: name,
            description: description,
            quantity: quantity,
            unit: unit,
            location: location,
            contact: contact,
            id: id,
            ingrediets: ingredients,
            steps, imageUrl
        };
        let item = {
            _id: itemId,
            id: itemId,
            userID: userID,
            data: data,
            timestamp: timestamp
        };
        db.insert(item, (err, result) => {
            if (err) {
                console.log('Error occurred: ' + err.message, 'create()');
                reject(err);
            } else {
                resolve({ data: { createdId: result.id, createdRevId: result.rev }, statusCode: 201 });
            }
        });
    });
}

/**
 * Update a resource with the requested new attribute values
 * 
 * @param {String} id - the ID of the item (required)
 * 
 * The following parameters can be null
 * 
 * @param {String} type - the type of the item
 * @param {String} name - the name of the item
 * @param {String} description - the description of the item
 * @param {String} quantity - the quantity available 
 * @param {String} location - the GPS location of the item
 * @param {String} contact - the contact info 
 * @param {String} userID - the ID of the user 
 * 
 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes
 */
function update(id, type, name, description, quantity, location, contact, unit, userID, _id, ingredients, steps, imageUrl) {
    return new Promise((resolve, reject) => {
        db.get(id, (err, document) => {
            if (err) {
                resolve({statusCode: err.statusCode});
            } else {
                let item = {
                    _id: document._id,
                    _rev: document._rev,            // Specifiying the _rev turns this into an updat
                    data: document.data
                };
                if (type) {item.data["type"] = type} else {item.data["type"] = document.type};
                if (name) {item["data"]["name"] = name} else {item["data"]["name"] = document.name};
                if (id) {item["id"] = id;} else {item["id"] = document.id};
                if (userID) { item["userID"] = userID;} else {item["userID"] = document.userID};
                if (description) {item["data"]["description"] = description; } else {item["data"]["description"] = document.description};
                if (quantity) {item["data"]["quantity"] = quantity;} else {item["data"]["quantity"] = document.quantity};
                if (location) {item["data"]["location"] = location;} else {item["data"]["location"] = document.location};
                if (contact) {item["data"]["contact"] = contact;} else {item["data"]["contact"] = document.contact};
                if (unit) { item["data"]["unit"] = unit;} else {item["unit"] = document.unit};                
                if (_id) { item["data"]["id"] = _id;} else {item["data"]["id"] = document.userID};
                if (ingredients) { item["data"]["ingredients"] = ingredients;} else {item["data"]["ingredients"] = document.ingredients};
                if (steps) { item["data"]["steps"] = steps;} else {item["data"]["steps"] = document.steps};
                if (imageUrl) { item["data"]["imageUrl"] = imageUrl;} else {item["data"]["imageUrl"] = document.imageUrl};

                item["timestamp"] = Date.now();
                db.insert(item, (err, result) => {
                    if (err) {
                        console.log('Error occurred: ' + err.message, 'create()');
                        reject(err);
                    } else {
                        resolve({ data: { updatedRevId: result.rev }, statusCode: 200 });
                    }
                });
            }            
        })
    });
}

module.exports = {
    deleteById: deleteById,
    create: create,
    update: update,
    find: find
  };
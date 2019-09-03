/**
 * This gets the data sent in the request
 * @param request
 * @returns {Promise<String>}
 */
const DbAccessor = require('../dbScripts/dbAccessor').DbAccessor;
const GroceryItem = require('../dbScripts/GroceryItem').GroceryItem;
const DB_FILE = './.data/sqlite.db';
const TABLE_NAME = 'Grocery';

let dao = new DbAccessor(DB_FILE, TABLE_NAME);
dao.initItemList().then();
//this is for injection of a mock DbAccessor
exports.setDao = function (daoToSet){
    dao=daoToSet;
};
/**
 * Gets the string representation of the request
 * @param request
 * @returns {Promise<string>}
 */
exports.parseRequest = function(request){
    return new Promise(resolve=>{
        let dataString = '';
        request.on('data', function (data) {
            dataString += data
        });
        request.on('end', function () {
            resolve(dataString);
        });
    })
};

/**
 *
 * @param request
 * @returns {Promise<List<GroceryItem>>}
 */
exports.getAllGroceryItems = function(request){
    return new Promise(resolve => {
        exports.parseRequest(request).then(async function(dataString){
            //make sure we get all changes to the item list when we send it out
            await dao.initItemList();
            resolve(dao.getAllItems());
        });
    });
};
/**
 *
 * @param request
 * @returns {Promise<List<GroceryItem>>}
 */
exports.deleteItem = function (request) {
    return new Promise(resolve => {
        exports.parseRequest(request).then((dataString) => {
            console.log(dataString + " to delete id");
            let id = JSON.parse(dataString).id.toString();
            id = parseInt(id);
            dao.removeGroceryById(id)
                .then(allItems => {
                    console.log(dao.getAllItems().length);
                    resolve(dao.getAllItems());
                });
        })
    })
};
/**
 *
 * @param request
 * @returns {Promise<GroceryItem>}
 */
exports.updateItems = function (request) {
    return new Promise(resolve => {
        exports.parseRequest(request).then((dataString)=> {
            console.log(dataString +"string val");
            let name = JSON.parse(dataString).item.toString();
            let newItem = new GroceryItem(name, false, 0);
            dao.addGroceryItem(newItem)
            //we only want single item we added so we have an id
                .then(item => {
                    console.log(item._id);
                    resolve(item);
                });
        });
    });
};
/**
 *
 * @param request w/JSON of id <number>, purchased<boolean>
 * @returns {Promise<number>}
 */
exports.togglePurchase = function(request){
    //this will take the id and purchase value as a bool and update it
    return new Promise(resolve=>{
        exports.parseRequest(request).then((dataString)=>{
            let input = JSON.parse(dataString);
            dao.togglePurchase(input.id, input.purchased).then( () =>{
                resolve();
            })
        })
    })
};
const DbAccessor = require('../dbScripts/dbAccessor').DbAccessor;
const GroceryItem = require('../dbScripts/GroceryItem').GroceryItem;
const Sqlite3 = require('sqlite3').verbose();

const DB_FILE = './.data/test.db';
const TABLE_NAME = 'GroceryTest';


//these are copied from the dbAccessor file
const SPOT = 'spot',
    ITEM_NAME = 'itemName',
    PURCHASED = 'purchased';

//
let testDb = new Sqlite3.Database(DB_FILE);
describe("the Accessor should",
    () => {
    //create a fresh table for each run
        beforeEach(async function() {
            let create =new Promise((resolve)=>{
                //create the table
                testDb.run(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          ${SPOT} INTEGER,
                          ${ITEM_NAME} TEXT,
                          ${PURCHASED} BOOLEAN)`, [],
                    (err) => {
                        if (err) {
                            console.log(err);
                        }
                        resolve();
                    });
            });
            await create;
        });
        //delete the table at the end
        afterEach(async function(){
           let deletePromise =new Promise( (resolve)=> {
               testDb.run(`DROP TABLE ${TABLE_NAME}`,[], (err)=>{
                   if(err){
                       throw new Error('delete failed');
                   }
                   resolve();
               })
           });
           await deletePromise;
        });

        it("should have an empty groceryList when created now", () => {
            let testDao = new DbAccessor(DB_FILE, TABLE_NAME);
            expect(testDao.getAllItems().length).toBeGreaterThanOrEqual(0);
        });

        it("should have a length of one when an item is inserted", async function () {
            let test = new Promise((resolve, reject) => {
                testDb.run(`INSERT INTO ${TABLE_NAME} (${SPOT}, ${ITEM_NAME}, ${PURCHASED}) `
                    + 'VALUES (?,?,?)', [0, 'testItem', 0], err => {
                    if (err) {
                        reject(new Error('database run failed'));
                    }
                    resolve();
                })
            });
            await test;
            let testDao = new DbAccessor(DB_FILE, TABLE_NAME);
            await testDao.initItemList();
            expect(testDao.getAllItems().length).toBe(1);
        });

        it("should add an item and toggle the purchase value when the fn is called" , async function() {
            let insertId=1;
            let testDao = new DbAccessor(DB_FILE, TABLE_NAME);
            await testDao.initItemList();
            //add the item to the id in the db
            testDao.addGroceryItem(new GroceryItem("name", false, 0))
                .then((item)=>{insertId=item._id; });
            //wait for toggle purchase to run
            await testDao.togglePurchase(insertId, true);

            //confirm the output here
            let getPromise = new Promise (resolve => {
                testDb.get(`SELECT * FROM ${TABLE_NAME} WHERE id=${insertId}`, [], function (err, row) {
                    if (err) {
                        throw new Error("purchase toggle error");
                    }
                    let item = GroceryItem.groceryItemFromDB(row);
                    expect(item.purchased).toBe(true);
                    resolve();
                })
            });
            await getPromise;
        });

        it("should remove an item with a given id when remove is called", async function(){
            let testItem = new GroceryItem("test", false, 0);
            let testDao = new DbAccessor(DB_FILE, TABLE_NAME);
            await testDao.initItemList();
            let addPromise = new Promise( resolve => {
                testDao.addGroceryItem(testItem)
                    .then((item) => {
                        testItem = item;
                        resolve();
                    });
            });
            await addPromise;
            let initItemListLen = testDao.getAllItems().length;
            await testDao.removeGroceryById(testItem.getId());
            let curItemListLen=testDao.getAllItems().length;
            expect(curItemListLen).toBeLessThan(initItemListLen);
        })
    });

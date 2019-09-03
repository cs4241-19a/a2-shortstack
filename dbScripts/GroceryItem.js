
//Use and ID of -1 to say this needs to be added, not updated
const INIT_ID = -1;
class GroceryItem{
    _id;
    itemName;
    purchased;
    spot; //this is the position in the list

    /**
     * Create a new grocery item
     * @param {String} itemName
     * @param {Boolean} purchased
     * @param {Number} spot
     */
    constructor(itemName, purchased, spot){
        //we can set the id automatically by using SELECT last_insert_row_id()
        this.itemName=itemName;
        this.purchased=purchased;
        this.spot=spot;
    }

    /**
     * Get the ID
     * @returns {Number}
     */
    getId(){
        return this._id;
    }

    /**
     * This creates a groceryItem from a row in the database
     * @return {GroceryItem}
     */
    static groceryItemFromDB(row){
        //because the bool is stored as 1 or 0, we need to update that here
        let purchased = !!row.purchased;
        let groceryItem = new GroceryItem(row.itemName, purchased, row.spot);
        //set the id from the database ID.
        groceryItem._id=row.id;
        return groceryItem;
    }

    /**
     * see if two grocery items are equal by ids
     * @param {GroceryItem}g1
     * @param {GroceryItem}g2
     * @returns {*}
     */
    static idEqual(g1, g2){
        return g1._id === g2._id;
    }
}
exports.GroceryItem=GroceryItem;
import CONSTANTS from './constants.mjs';
import {insertItem} from './itemDisplay.mjs';



const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault();
    const input = document.querySelector( '#yourname' ),
        json = { item: input.value },
        body = JSON.stringify( json );
    fetch( CONSTANTS.SUBMIT, {
        method:'POST',
        body
    })
        //get the response json and print the output
        .then((response)=>response.json())
        .then(function (item) {
            console.log("sending item");
            //this should put the item into the divs when its submitted.
            insertItem(item);
        });
    input.value="";
    return false;
};

const updateList = function(items){
    let list = document.getElementById('table_contents');
    list.innerText="";
    items.forEach((item)=>{
        list.innerText+=item._id +" "+item.itemName+ ' \n';
    })
};
    const addButton = document.getElementById( 'submit' );
    const deleteButton=document.getElementById('delete');
    addButton.onclick = submit;

console.log("Welcome to assignment 2!");
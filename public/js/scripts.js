console.log("Welcome to assignment 2!")

$(document).ready(function() {
    $('#example').DataTable( {
        "ajax": 'fullOrders.json'
    } );
} );


const addNewOrder = function(e) {
    e.preventDefault();

    const newOrder = {
        username: document.getElementById("username").value,
        topping1: document.getElementById("topping1").value,
        topping2: document.getElementById("topping2").value
    };

    const body = JSON.stringify(newOrder);
    fetch( '/submit', {
        method:'POST',
        body
    }).then( function( response ) {
        document.getElementById("order-confirmed").style.display = "flex";
        document.getElementById("form").style.display = "none";
        resetForm();
    });

    return false
};

const updateOrder = (e) => {
    e.preventDefault();

    const updatedOrder = {
        ordernum: document.getElementById("update-button").dataset.index,
        username: document.getElementById("update-username").value,
        topping1: document.getElementById("update-topping1").value,
        topping2: document.getElementById("update-topping2").value
    };

    const body = JSON.stringify(updatedOrder);
    fetch( '/update', {
        method:'POST',
        body
    })
    .then( function( response ) {
        viewOrderTable();
    });

    return false
};

const fetchCurrentOrders = async function() {
    const response = await fetch('/orders', {method: 'GET'});
    const data = await response.json();
    const orders = data.data;

    let HTMLDiv = document.getElementById("orders");

    HTMLDiv.innerHTML = '<tr>\n' + '<th>Name</th>\n' +
        '<th>Topping #1</th>\n' + '<th>Topping #2</th>\n' +
        '<th>Price</th>\n' + '<th></th>\n' +
        '<th></th>\n' + '</tr>';

    for (let i = 0; i < orders.length; i++) {
        const currentOrder = orders[i];
        const orderString = JSON.stringify(orders[i]);
        let row = '<tr>\n';
        row += (`<td> ${currentOrder.username} </td>\n`);
        row += (`<td> ${currentOrder.topping1} </td>\n`);
        row += (`<td> ${currentOrder.topping2} </td>\n`);
        row += (`<td> ${currentOrder.price} </td>\n`);
        row += (`<td> <button id="update-button-${i}" class="table-button" style="font-size: 1vw" onclick="viewUpdateForm(${i})" data-string=`
            + encodeURIComponent(orderString) +
            `>Edit</button> </td>\n`);
        row += (`<td> <button id="delete-button-${i}" class="table-button" style="font-size: 1vw" onclick="deleteOrder(${i})">Delete</button> </td>\n`);
        row += '</tr>';
        HTMLDiv.innerHTML += row;
    }

    return false;
};

const deleteOrder = function(num) {
    const orderNum = {orderNum: num};
    const body = JSON.stringify(orderNum);
    fetch( '/delete', {
        method:'POST',
        body
    });
    fetchCurrentOrders();
};

const viewOrderTable = function() {
    document.getElementById('table').style.display = "flex";
    document.getElementById('form').style.display = "none";
    document.getElementById('update-form').style.display = "none";
    document.getElementById('order-confirmed').style.display = "none";

    fetchCurrentOrders();
    return false;
};

const viewOrderForm = function() {
    document.getElementById('table').style.display = "none";
    document.getElementById('form').style.display = "block";
    document.getElementById('update-form').style.display = "none";
    document.getElementById('order-confirmed').style.display = "none";
    resetForm();
};

const viewUpdateForm = function(num) {
    let order = decodeURIComponent(document.getElementById(`update-button-${num}`).dataset.string);
    order = JSON.parse(order);

    document.getElementById('table').style.display = "none";
    document.getElementById('update-form').style.display = "block";
    document.getElementById("update-button").dataset.index = num;
    document.getElementById("update-username").value = order.username;
    document.getElementById("update-topping1").value = order.topping1;
    document.getElementById("update-topping2").value = order.topping2;

    return false;
};

const resetForm = () => {
    document.getElementById("username").value = "";
    document.getElementById("topping1").value = "";
    document.getElementById("topping2").value = "";
};
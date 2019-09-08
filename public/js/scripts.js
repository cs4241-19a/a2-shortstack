// ES Modules syntax
import Unsplash from 'unsplash-js';

// require syntax
const Unsplash = require('unsplash-js').default;

const unsplash = new Unsplash({
  applicationId: "210c371817cd6adae5a2fd6484fb09a9c92f0fec9d3443744a797518224071ef",
  secret: "fd62ab61acfdb6f6a1a725f41856dff34770e89a875c51224515c1c2aca625da"
});

const randPhoto = function() {
  unsplash.search.photos("dogs", 1)
  .then(toJson)
  .then(json => {
    // Your code
  });
}

const loadFavorites = async function() {
  const resp = await fetch('/orders', { method: 'GET' });
  const data = await resp.json();
  const orders = data.data;
  let htmlDiv = document.getElementById('orders');
  htmlDiv.innerHTML = '<tr>\n' +
          '              <th>Name</th>\n' +
          '              <th>Dream</th>\n' +
          '              <th>Pork</th>\n' +
          '              <th>Garlic</th>\n' +
          '              <th>Price</th>\n' +
          '              <th></th>\n' +
          '              <th></th>\n' +
          '            </tr>';
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const stringOrder = JSON.stringify(orders[i]);
    const garlic = (order.garlic ? 'Yes' : 'No');
    let newRow = '<tr>\n';
    newRow += (`<td> ${order.name} </td>\n`);
    newRow += (`<td> ${order.dream} </td>\n`);
    newRow += (`<td> ${order.amountOfPork} pieces</td>\n`);
    newRow += (`<td> ${garlic} </td>\n`);
    newRow += (`<td> ${order.price} </td>\n`);
    newRow += (`<td> <button id="update-button-${i}" class="table-button" style="font-size: 1vw" onclick="viewUpdateForm(${i})" data-string=`
            + encodeURIComponent(stringOrder) +
            `>Edit</button> </td>\n`);
    newRow += (`<td> <button id="delete-button-${i}" class="table-button" style="font-size: 1vw" onclick="deleteOrder(${i})">Delete</button> </td>\n`);
    newRow += '</tr>';
    htmlDiv.innerHTML += newRow;
  }

  return false;
};

window.onload = function(){
  loadFavorites
}

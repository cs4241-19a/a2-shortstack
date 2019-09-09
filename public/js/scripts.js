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
  const resp = await fetch('/', { method: 'GET' });
  const data = await resp.json();
  const favs = data.data;
  
   /*var html = "<table border='1|1'>";
    for (var i = 0; i < rows.length; i++) {
        html+="<tr>";
        html+="<td>"+rows[i].name+"</td>";
        html+="<td>"+rows[i].age+"</td>";
        html+="<td>"+rows[i].email+"</td>";

        html+="</tr>";

    }
    html+="</table>";
    $("div").html(html);*/
  
  <div class="card">
          <div class="card-body">
            <h5 class="card-title">Yeezy</h5>
            <p class="card-text"><small class="text-muted">Category</small></p>
            <p class="card-text">Price</p>
          </div>
          <div class="card-footer bg-transparent">Rating</div>
        </div>
  
  let html = document.getElementById('favorites');
  html.innerHtml = "<div class='card'>"
  
  for (let i = 0; i < favs.length; i++) {
    const item = item[i];
    const strItem = JSON.stringify(item[i]);
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

window.onload = function() {
  loadFavorites()
};

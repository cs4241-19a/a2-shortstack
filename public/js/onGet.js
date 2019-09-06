// clear webpage
// document.body.isnnerHTML = ''

// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
function timeConverter(UNIX_timestamp){
    let a = new Date(Number(UNIX_timestamp))
    var year = a.getFullYear();
    var month = a.getMonth();
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

let getTableEntry = function(title, notes, priority, utctime){
    return `                             
    <tr>
    <th scope="row">`+ title +`</th>
    <td>`+ notes +`</td>
    <td>`+ priority +`</td>
    <td>`+ timeConverter(utctime) +`</td>
    <td><button id="edit" class="btn btn-primary" onclick="window.location.href ='/edit?time=`+ utctime +`&title=`+title+`&notes=`+notes+`&priority=`+priority+`';">Edit</button></td>
    </tr>`;
}

const selector = '#list #list_div1 #list_div2 #list_div3 #list_table #table_body'

console.log( 'sending GET' )
fetch( '/get', {
    method:'GET' 
  })
    .then(response => response.json())
    .then(data => {
    // do something with the response 
    console.log( data )
    let arrayLength = data.length;
    for( let i = 0; i < arrayLength; i++ ) {
        let entry = data[i]
        $( selector ).append( getTableEntry(entry.title, entry.notes, entry.priority, entry.unixtime) )
      }
  })


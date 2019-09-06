function getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value.replace(/%20/g, ' ');
    });
    return vars;
}

// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
function timeConverter(UNIX_timestamp){
    let a = new Date(Number(UNIX_timestamp))
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = a.getMonth();
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

let getTableEntry = function(title, notes, priority, utctime){
    return `                             
    <tr>
    <th scope="row">`+ title +`</th>
    <td>`+ notes +`</td>
    <td>`+ priority +`</td>
    <td>`+ timeConverter(utctime) +`</td>
    <td><a href="/delete?`+ utctime +`">DELETE</a></td>
    </tr>`;
}

const selector = '#list #list_div1 #list_div2 #list_div3 #list_table #table_body'

var urlVars = getUrlVars()
        
$( '#table_body' ).append( getTableEntry(urlVars.title, urlVars.notes, urlVars.priority, urlVars.time) )

document.querySelector("#inputTime").setAttribute('value', urlVars.time)
document.querySelector("#inputTitle").setAttribute('value', urlVars.title)
document.querySelector("#inputNotes").setAttribute('value', urlVars.notes)
document.querySelector("#gridRadios" + urlVars.priority).setAttribute('checked', 1)
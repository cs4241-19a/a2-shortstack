let bookcase = []

window.onload = function() {
  fetch( '/books', {
      method:'GET'
    })
    .then( function( response ) {
      response.json().then(function(data) {
        bookcase = Object.values(data)
        
        let tb = "<table border = '3'"
        tb+= "<tr>"
        tb+="<td> ID</td>"
        tb+="<td> Title</td>"
        tb+="<td> Author</td>"
        tb+="<td> Description</td>"
        tb+="<td> Publication Year</td>"
        tb+="<td> Century</td>"
        tb+="</tr>"
        
        let j = 0
       
        for(let i = 0; i < bookcase.length; i++){
          let yr = parseInt(bookcase[i].year)
          
          if(yr >= 1301 && yr <= 1400){
            tb+= "<tr>"
            tb+="<td>"+j+"</td>"
            tb+="<td>"+bookcase[i].title+"</td>"
            tb+="<td>"+bookcase[i].author+"</td>"
            tb+="<td>"+bookcase[i].descr+"</td>"
            tb+="<td>"+bookcase[i].year+"</td>"
            tb+="<td> 14th</td>"
            tb+="</tr>"
          }
          else if(yr >= 1401 && yr <= 1500){
            tb+= "<tr>"
            tb+="<td>"+j+"</td>"
            tb+="<td>"+bookcase[i].title+"</td>"
            tb+="<td>"+bookcase[i].author+"</td>"
            tb+="<td>"+bookcase[i].descr+"</td>"
            tb+="<td>"+bookcase[i].year+"</td>"
            tb+="<td> 15th</td>"
            tb+="</tr>"
          }
          else if(yr >= 1501 && yr <= 1600){
             tb+= "<tr>"
            tb+="<td>"+j+"</td>"
            tb+="<td>"+bookcase[i].title+"</td>"
            tb+="<td>"+bookcase[i].author+"</td>"
            tb+="<td>"+bookcase[i].descr+"</td>"
            tb+="<td>"+bookcase[i].year+"</td>"          
            tb+="<td> 16th</td>"
            tb+="</tr>"
          }
          else if(yr >= 1601 && yr <= 1700){
            tb+= "<tr>"
            tb+="<td>"+j+"</td>"
            tb+="<td>"+bookcase[i].title+"</td>"
            tb+="<td>"+bookcase[i].author+"</td>"
            tb+="<td>"+bookcase[i].descr+"</td>"
            tb+="<td>"+bookcase[i].year+"</td>"
            tb+="<td> 17th</td>"
            tb+="</tr>"
          }
          else if(yr >= 1701 && yr <= 1800){
            tb+= "<tr>"
            tb+="<td>"+j+"</td>"
            tb+="<td>"+bookcase[i].title+"</td>"
            tb+="<td>"+bookcase[i].author+"</td>"
            tb+="<td>"+bookcase[i].descr+"</td>"
            tb+="<td>"+bookcase[i].year+"</td>"
            tb+="<td> 18th</td>"
            tb+="</tr>"
          }
          else if(yr >= 1801 && yr <= 1900){
            tb+= "<tr>"
            tb+="<td>"+j+"</td>"
            tb+="<td>"+bookcase[i].title+"</td>"
            tb+="<td>"+bookcase[i].author+"</td>"
            tb+="<td>"+bookcase[i].descr+"</td>"
            tb+="<td>"+bookcase[i].year+"</td>"
            tb+="<td> 19th</td>"
            tb+="</tr>"
          }
          else if(yr >= 1901 && yr <= 2000){
            tb+= "<tr>"
            tb+="<td>"+j+"</td>"
            tb+="<td>"+bookcase[i].title+"</td>"
            tb+="<td>"+bookcase[i].author+"</td>"
            tb+="<td>"+bookcase[i].descr+"</td>"
            tb+="<td>"+bookcase[i].year+"</td>"
            tb+="<td> 20th</td>"
            tb+="</tr>"
          }
          else if(yr >= 2001 && yr <= 2100){
            tb+= "<tr>"
            tb+="<td>"+j+"</td>"
            tb+="<td>"+bookcase[i].title+"</td>"
            tb+="<td>"+bookcase[i].author+"</td>"
            tb+="<td>"+bookcase[i].descr+"</td>"
            tb+="<td>"+bookcase[i].year+"</td>"
            tb+="<td> 21th</td>"
            tb+="</tr>"
          }
          else{
            j--
          }
          j++
          console.log(data)
        }
        tb+="</table>"
        document.getElementById('table').innerHTML = tb
     
       const button = document.querySelector( '#backButton' )
       button.onclick = backToHome
      })
    })
  }

const backToHome = function(e){
    e.preventDefault();
    window.location = "index.html"
  }


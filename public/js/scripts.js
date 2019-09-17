function submit(  ) {
    
    console.log("Testing for name " + document.getElementById('yourname') )
    document.getElementById('info').submit()
    setTimeout(function(){
      clearTable()
      getData()
    },1000)
    

    

    return false
  }
  
  function onDelete(){
    document.getElementById('delete').submit()
    setTimeout(function(){
      clearTable()
      document.getElementById("dataTable").deleteRow(1)
      getData()
    },1000)
    
    return false
  }

 
    
    
    
    function clearTable()
    {
      
      $.get('/data',function(response){
        
        response.forEach(function(item){
          console.log("cleariunug list" )
          document.getElementById("dataTable").deleteRow(1)
        })
        
      })
     
      console.log("Table has been reset")
    }
    
    function getData()
    {
      $.get('/data',function(response){
       
          
          response.forEach(function(item){
          console.log("item is " +item)
          $('#dataTable').append('<tr><td>' + item.name + '</td><td>' + item.year + '</td><td>' + item.inches  + '</td><td>' + item.cm + '</td></tr>')
          console.log("wrote " + item.name)
        })
          
      
        
      })
      console.log("Done writing")
    }



function signUp(){
    
  
  console.log("Testing for name " + document.getElementById('yourname') )
  document.getElementById('signup').submit()
    
  
  
  /*
  fetch( '/signup', {
  method:'POST',
      body:JSON.stringify({ username:document.getElementById("jusername").value, password:document.getElementById("jpassword").value }),
      headers: { 'Content-Type': 'application/json' }
 
})
.then( res => res.json() )
    .then( console.log )
        
  */
    return false
  }
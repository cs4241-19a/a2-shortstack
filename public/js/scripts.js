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
          $('#dataTable').append('<tr><td>' + item.name + '</td><td>' + item.year + '</td><td>' + item.inches   + '</td></tr>')
          console.log("wrote " + item.name)
        })
          
      
        
      })
      console.log("Done writing")
    }



function login(){
    
  
  console.log("Testing for name " + document.getElementById('login').username.value )
  document.getElementById('login').submit()
    
  

    return false
  }


function signUp(){
    
  
  console.log("Testing for name " + document.getElementById('signup').username.value )
  document.getElementById('signup').submit()
    
  
  
    return false
  }
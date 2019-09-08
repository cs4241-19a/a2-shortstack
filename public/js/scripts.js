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

 
    
    /*const myDelete = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const deleteName = document.querySelector( '#delname' ),
          name = deleteName.value
    

    fetch( '/Ondelete', {
      method:'POST',
      name 
    })
    .then( function( response ) {
      // do something with the reponse 
      alert(name)
      console.log( response )
      
    })

    return false
  }*/
    
    
    
    function clearTable()
    {
      //$('#dataTable:not(:first)').empty()
      $.get('/data',function(response){
        
        response.forEach(function(item){
          console.log("cleariunug list" )
          document.getElementById("dataTable").deleteRow(1)
        })
        
      })
      /*for(let i=1; i < document.getElementById("dataTable").rows.length; i++)
        {
          document.getElementById("dataTable").deleteRow(i)
        }*/
      //document.getElementById("dataTable").deleteRow(1)
      console.log("Table has been reset")
    }
    
    function getData()
    {
      $.get('/data',function(response){
        //clearTable(document.getElementById("dataTable"))
        //clearTable()
        
       // setTimeout(function(){
          
          response.forEach(function(item){
          console.log("item is " +item)
          $('#dataTable').append('<tr><td>' + item.name + '</td><td>' + item.year + '</td><td>' + item.inches  + '</td><td>' + item.cm + '</td></tr>')
          console.log("wrote " + item.name)
        })
          
        //},2000)
        
      })
      console.log("Done writing")
    }
    
    
  
    

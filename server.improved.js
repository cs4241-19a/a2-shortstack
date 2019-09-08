const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const userList = [
  {name:'cat',
   items:[
     {
       'itemName':'a2',
       'time': '50 hours',
       'duedate': '9/9/2019',
       'daysleft': '1',
       'notes':'Start Early!',
       'id':'0',
     },
   ]
   
   },
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  } 
})

const handleGet = function( request, response ) {
  switch( request.url ) {
    case '/':
      sendFile( response, 'public/index.html' )
      break
    case '/index.html':
      sendFile( response, 'public/index.html' )
      break
    case '/style.css':
      sendFile( response, 'public/css/style.css')
      break
    case '/userpage.html':
      sendFile( response, 'public/userpage.html')
      break
    case '/scripts.js':
      sendFile( response, 'public/js/scripts.js')
      break
    case '/dataDump': 
      sendData( response, userList)
      break
    default:
      response.end( '404 Error: File Not Found' )
  } 
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })
    
  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )
        
    switch(request.url) { 
      case '/Submit': 
        sendFile( response, 'userpage.html')
        break
      case '/loadTable': 
        const username = JSON.parse(dataString).username
        const user = getUser(username)
        sendData( response, user)
        break
      case '/addTask': 
        const taskData = JSON.parse(dataString)
        const task = taskData.task
        const taskId = addId(task)
        task.duedate = calcDueDate(task.daysleft)
        const taskUsername = taskData.username
        const taskUser = getUser(taskUsername)
        taskUser.items.push(task)
        break
      case '/delTask': 
        const delTaskData = JSON.parse(dataString)
        const delTaskUsername = delTaskData.username
        const delTaskUser = getUser(delTaskUsername)
        const idNum = delTaskData.id 
        const deleteMe = deleteTask(delTaskUser, idNum)
        break 
     case '/modifyRow':
        const modifyRowData = JSON.parse(dataString)
        const modifyRowUsername = modifyRowData.username
        const modifyRowUser = getUser(modifyRowUsername)
        const modifyTaskId = modifyRowData.id 
        const rowInfo = findTask(modifyRowUser, modifyTaskId)
        sendData(response, rowInfo)
        break
      case '/enterChanges': 
        const modifiedTaskData = JSON.parse(dataString)
        const modifiedTask = modifiedTaskData.task
        const modifiedTaskId = modifiedTaskData.id
        const usernameOfMod = modifiedTaskData.username
        const userOfMod = getUser(usernameOfMod)
        const foundTask = findTask(userOfMod, modifiedTaskId)
        foundTask.itemName = modifiedTask.itemName
        foundTask.time = modifiedTask.time
        foundTask.daysleft = modifiedTask.daysleft
        foundTask.duedate = modifiedTask.duedate
        foundTask.notes = modifiedTask.notes
        break 
      default: 
        response.end( '404 Error: File Not Found' )
    }
    
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{
       
       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )
     }
   })
}

//Used to establish the tasks in the table of someone already in the system (and to send back the info to fill the modifyRow form)
const sendData = function( response, json) { 
  const type = mime.getType( json ) 
  
  console.log(JSON.stringify(json))
  response.writeHeader( 200, { 'Content-Type': type })
  response.end(JSON.stringify( json ))
}

//Looks for the user in the list to try to return their data
function getUser( username ){ 
  for(let x = 0; x < userList.length; x++){
    let thisUser = userList[x]
    if(thisUser.name === username){
      return thisUser;
    }
  }
  return createUser(username)
}

// Creates a new user -> only called if a username is not previously found
function createUser(username){
  const newUser = {name: username, items:[]}
  userList.push(newUser)
  return newUser
}

//Used in adding a task (to create an ID for it)
let uniqueId = 1 
function addId(task){ 
  task.id = uniqueId
  uniqueId = uniqueId + 1
}

//Used in modifyRow and enterChanges, used to find associated task from the user and task id
function findTask(user, Id){ 
  for(let x = 0; x < user.items.length; x++){
    let thisTask = user.items[x]
    if(thisTask.id == Id){
      return thisTask
    }
  }
  return null // if the task isn't there it will show up as null in the table
}

//Used in deleting a task
function deleteTask(user, id){ 
  user.items = user.items.filter(function(x){ 
     return x.id != id 
  })
}

//Integrated Server logic, caclulates the due date after the user inputs how many days they have to complete the task
function calcDueDate(daysLeft){
   const daysTill = parseInt(daysLeft)
   var today = new Date()
   today.setDate(today.getDate() + daysTill)
   const mm = today.getMonth() + 1
   const dd = today.getDate()
   const yyyy = today.getFullYear()
   return mm + '/' + dd + '/' + yyyy
}

server.listen( process.env.PORT || port )
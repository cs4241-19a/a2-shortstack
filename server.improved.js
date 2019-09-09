const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      moment = require( 'moment' ),
      dir  = 'public/',
      port = 3000

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 
  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if (filename.indexOf("?") > -1) { // Handle GET params, two get request made on front end
    const parsedRequest = filename.split("?");
    sendFile( response, parsedRequest[0]);
  } else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })
  request.on( 'end', function() {
    console.log("Server received\n" + dataString);
    const obj = JSON.parse(dataString);

    if (obj.type != null && obj.type === "update") {
      FileManager.updateEventAvailibilty(obj.eventID, obj.availability, obj.name);
    }
    else if (PostValidation.validate(obj)) {
      FileManager.saveJSON(obj)
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

/*
Need to assert a few things before saving the event JSON
1a.) Dates formatted as yyyy-mm-dd to yyyy-mm-dd
1b.) First date occurs before second date
2.) Start time is a valid military time
3.) End time is a valid military time
*/
const PostValidation = {
  validate: function(event) {
    return this.validateDates(event.potentialDates) && this.validateTime(event.startTime) && this.validateTime(event.endTime);
  },
  validateDates: function(dates) {
    const parsedDates = dates.split(" to ");
    if (parsedDates.length === 2) { // got 2 dates
      const startDate = moment(parsedDates[0], 'YYYY-MM-DD');
      const endDate = moment(parsedDates[1], "YYYY-MM-DD");
      if (startDate.isValid() && endDate.isValid()) { // valid format
        if (startDate.isBefore(endDate)) { // start before end
          return true;
        }
        else {
          console.log("Start date after end date");
        }
      } else {
        console.log("Dates aren't valid format");
      }
    } else {
      console.log("Didn't receive 2 dates");
    }
    return false;
  },
  validateTime: function(time) {
    return time[0] <= 24 && time[0] >= 0;
  }
}

const FileManager = {
  saveJSON: function(jsonFile) {
    const eventHash = "exampleEvent3"; // TODO: SWITCH this
    jsonFile.potentialDates = this.converDayRangeToArray(jsonFile.potentialDates); 
    fs.writeFile('./public/events/' + eventHash + '.json', JSON.stringify(jsonFile), function (err) {
      if (err) throw err;
    });
    console.log('Event saved to ' + './public/events/' + eventHash);
  },
  converDayRangeToArray: function(dayRange) {
    var dates = [];
    const parsedDates = dayRange.split(" to ");
    var currDate = moment(parsedDates[0]).startOf('day');
    var lastDate = moment(parsedDates[1]).startOf('day');

    dates.push(currDate.clone().toDate());
    while(currDate.add(1, 'days').diff(lastDate) <= 0) {
        console.log(currDate.toDate());
        dates.push(currDate.clone().toDate());
    }

    return dates;
  },
  updateEventAvailibilty: function(eventID, availability, name){
    console.log("Loading >>> " + "./public/events/" + eventID + ".json");
    let jsonFile = fs.readFileSync("./public/events/" + eventID + ".json", {encoding: "utf-8"}, function (err) {
      if (err) throw err;
    });
    const event = JSON.parse(jsonFile);

    console.log("The event name is " + event.eventName);
    event.participants.push({
      "name": name,
      "availability": availability
    });
    console.log(event.participants);
    const newJsonFile = JSON.stringify(event)
    console.log("Saving as " + newJsonFile);
    fs.writeFile('./public/events/' + eventID+ '.json',newJsonFile, function (err) {
      if (err) throw err;
    });
    console.log('Event updated at to ' + './public/events/' + eventID + ".json");
  }
}


server.listen( process.env.PORT || port )

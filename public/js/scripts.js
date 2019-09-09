
const NUMTRIALS = 2  // number of trials before results show
trialCounter = 0 // keeps track of how many trials have been completed.

//Happens first for the first trial:

actualPerc = 100
startTime = new Date()
toggle = false

// Updates the toggle option to show or remove results on toggle
function CheckboxClick()
{
	checkBox = document.getElementById("toggle");
	toggle = checkBox.checked;
	if (toggle)
	{
		document.getElementById("results").style.color = "#555";
	}
	else{
		document.getElementById("results").style.color = "white";
	}

}

// When the continue button is clicked
function OnSubmit()
{
	endTime = new Date();
	time = endTime - startTime; //in ms
	time /= 1000;

	UpdateData(time, actualPerc);
	trialCounter++;

		d1 = parseInt(Math.random()*300,0)
		d2 = parseInt(Math.random()*300,0)
		actualPerc = FindActual(d1,d2)
		CreateNewBlocks(d1,d2)
	
	
}

// gets the actual size percent difference
function FindActual(d1,d2)
{
	if (d1 == d2 )
	{
		return 100
	}
	else if (d1 < d2)
	{
		
		return (d1/d2)*100
	}
	else
	{
		return (d2/d1)*100
	}
}

// sends a POST request to store the json data in the server
function AddToJSON(dataToAppend){
	
	json = {time: dataToAppend[0], guess: dataToAppend[1], actual: dataToAppend[2] }
		
	body = JSON.stringify(json)
		  
    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
 //     console.log( response )
    })
    return false
  }

// creates new blocks and updates global variables
function CreateNewBlocks(d1, d2)
{
	document.getElementById("square1").style.height = d1 + "px";
	document.getElementById("square2").style.height = d2 + "px";
	document.getElementById("square1").style.width = d1 + "px";
	document.getElementById("square2").style.width = d2 + "px";
	startTime = new Date();
	
}

// get request to get the updated server data and display the results
function ShowResults()
{
	document.getElementById("results").innerHTML = "Your Results: </br>"
	/*const request = async () => {
    const response = await fetch('/data');
    json = await response.json();
    //console.log(json);
	} */
	

//	request();

	fetch("/data")
	.then(res => res.json())
	.then(function (data) { 
		result = data 
	//	console.log(result.length);
	
		for (var i = 0; i < result.length; i++){
			var obj = result[i];

			document.getElementById("results").innerHTML += "Trial " + (i+1) + ": " 
			document.getElementById("results").innerHTML += 
				"<ul> <li> Elapsed Time: " + obj.time + " seconds </li>" +
				"<li> Your Guess: " + obj.guess + " </li>" +
				"<li> Actual Percentage: " + obj.actual + " </li>" +
				"<li> Percent Error: " + obj.percentError + " </li> <ul>" ;
			
		} 
	
	});

}

	

//
function UpdateData(time,actual) {
		
		formElement = document.forms['response'].elements['percentage'].value;
		console.log(time);
		dataToAppend = [time, parseFloat(formElement), actual]	//creates an array of [time, user response, actual]	
		if (dataToAppend[1] === null)
		{
			dataToAppend[1] = 0
		}
		console.log(dataToAppend[0]);
		AddToJSON(dataToAppend);
		
		if(toggle)
		{
			ShowResults();
		}
		// clears the data for the next trial
		dataToAppend = [];
		
		document.forms['response'].reset();  		
		
}

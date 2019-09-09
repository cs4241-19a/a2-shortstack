const form = document.querySelector('form')
const ul = document.querySelector('ul')
const button = document.querySelector('button')
const input = document.getElementById('name')
let itemsArray = localStorage.getItem('names') ? JSON.parse(localStorage.getItem('names')) : []

localStorage.setItem('names', JSON.stringify(itemsArray))
const data = JSON.parse(localStorage.getItem('names'))

const liMaker = text => {
    const li = document.createElement('li')
    li.textContent = text
    ul.appendChild(li)
}

form.addEventListener('submit', function(e) {
    e.preventDefault()

    itemsArray.push(input.value)
    localStorage.setItem('names', JSON.stringify(itemsArray))
    liMaker(input.value)
    input.value = ''
})

data.forEach(item => {
    liMaker(item)
})

button.addEventListener('click', function() {
    localStorage.clear()
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }
})

function getBMI () {
    //Obtain user inputs
    var height=Number(document.getElementById("height").value);
    var heightunits=document.getElementById("heightunits").value;
    var weight=Number(document.getElementById("weight").value);
    var weightunits=document.getElementById("weightunits").value;


    //Convert all units to metric
    if (heightunits=="inches") height/=39.3700787;
    if (weightunits=="lb") weight/=2.20462;

    //Perform calculation
    var BMI=weight/Math.pow(height,2);

    //Display result of calculation
    document.getElementById("output").innerText=Math.round(BMI*100)/100;

}
var submissions=[];
function saveSubmissions(){
    var submission = document.getElementById("name").value;
    submissions.push("name");
    console.log(submissions);
    document.getElementById("finalBMI").value=submissions;
    console.log(document.getElementById("finalBMI").value);
}
document.getElementById("name").innerHTML = submissions;

function write_below(form)
{
    var output = document.forms.write.output_towrite.value;
    document.getElementById('write_here').innerHTML="Your input was:"+output;
    return false;
}

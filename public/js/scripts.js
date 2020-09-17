console.log("Welcome to assignment 2!")

var addBox=document.getElementById("addBox")
var cal=document.getElementById("cal")
var hist=document.getElementById("hist")
var today=document.getElementById("today")
var prog=document.getElementById("playProg")

document.getElementById("addBtn").addEventListener("click",function () {
    if (addBox.style.visibility === 'hidden') {
        addBox.style.visibility = 'visible';
        const button = document.querySelector( '#submit' )
          button.onclick = submit
    } else {
        addBox.style.visibility = 'hidden';
    }

})

document.getElementById("history").addEventListener("click",function () {
    hist.style.display = 'inline';
    cal.style.display="none";
    prog.style.display='none'
  document.getElementById("mainContainer").style.overflowY="hidden"
})

document.getElementById("today").addEventListener("click", function () {
    cal.style.display='inline'
    hist.style.display='none'
    prog.style.display='none'
  document.getElementById("mainContainer").style.overflowY="scroll"
})

document.getElementById("progress").addEventListener("click", function () {
    playProg()
  document.getElementById("mainContainer").style.overflowY="hidden"
})

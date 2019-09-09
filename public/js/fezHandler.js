/*
 * Handling of FEZ tetromino code
 * by Terry Hearst
 */

//                        UP   D  UP SPACE D   A   A DOWN
const solutionKeyCodes = [38, 68, 38, 32, 68, 65, 65, 40]

let currentIndex = 0;

window.onkeydown = function(event)
{
  const keyCode = event.keyCode
  if (solutionKeyCodes[currentIndex] == keyCode)
  {
    currentIndex++
    if (currentIndex === 8)
    {
      // SUCCESS!!
      currentIndex = 0
      
      let audio = new Audio("https://cdn.glitch.com/5668e6b6-5a6e-45ac-b545-993e29da4410%2FFezPuzzleSolved.wav?v=1567987129774")
      audio.loop = false
      audio.play()
      
      // This is delayed by a bit because otherwise the sound will not play until you have closed the alert
      window.setTimeout(function() { alert("You've entered the code!!!") }, 250)
    }
  }
  else
  {
    // Wrong code, reset index
    currentIndex = 0
  }
}
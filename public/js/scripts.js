/*
 * Short Stack - client side script
 * by Terry Hearst
 */


/* --- BUTTON: SEND CHAT --- */

const submit = function(e)
{
  // prevent default form action from being carried out
  e.preventDefault()

  const nameInput = document.querySelector("#username"),
        contentInput = document.querySelector("#contents"),
        json = 
        {
          "action": "submit",
          "username": nameInput.value.trim(),
          "contents": contentInput.value.trim()
        },
        body = JSON.stringify(json)

  if (json.username === "" || json.contents === "")
  {
    alert("Make sure you fill in the username and contents fields!")
    return;
  }

  fetch("/submit",
  {
    method: "POST",
    body
  })
  .then(function(response)
  {
    // do something with the reponse
    console.log(response)

    location.reload() // lol
  })

  return false
}


/* --- BUTTON: RESET ALL CHATS --- */

const resetAllChats = function(e)
{
  // prevent default form action from being carried out
  e.preventDefault()

  const json = 
        {
          "action": "resetAllChats"
        },
        body = JSON.stringify(json)

  fetch("/submit",
  {
    method: "POST",
    body
  })
  .then(function(response)
  {
    // do something with the reponse
    console.log(response)
    
    // Reload page to see new contents
    location.reload()
  })

  return false
}


/* --- PAGE INITIALIZATION SCRIPT --- */

window.onload = function()
{
  // Bind the buttons to their appropriate functions
  const chatButton = document.querySelector("#send-button")
  chatButton.onclick = submit
  const resetButton = document.querySelector("#reset-button")
  resetButton.onclick = resetAllChats
  
  // Create the html table based on the JSON of chats
  const chatContents = document.querySelector("#chat-contents")
  fetch("/chats",
  {
    method: "GET"
  })
  .then(function(response)
  {
    return response.json()
  })
  .then(function(myJson)
  {
    //console.log(myJson)

    let htmlStr = "<table>"

    for (const chatNum in myJson)
    {
      const chat = myJson[chatNum]

      htmlStr += "<tr>"

      htmlStr += "<th class=\"chat-username\">" + chat.username + "</th>"
      htmlStr += "<th class=\"chat-contents\">" + chat.contents + "</th>"

      const timeDate = new Date(chat.time)
      const timeStr = timeDate.toLocaleDateString() + "<br/>" + timeDate.toLocaleTimeString()

      htmlStr += "<th class=\"chat-timestamp\">" + timeStr + "</th>"

      htmlStr += "</tr>"
    }

    htmlStr += "</table>"

    chatContents.innerHTML = htmlStr
  })
}
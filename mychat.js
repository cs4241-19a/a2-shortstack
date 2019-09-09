/*
 * Chat module for Short Stack
 * by Terry Hearst
 */

// Define variable which will hold array of chats
let appData

// Add a chat message to the array
const addChat = function(username, contents)
{
  const chatObj =
  {
    "username": username,
    "contents": contents,
    "time": new Date(),
  }
  appData.push(chatObj)
}

// Get list of all chat messages
const getChats = function()
{
  return appData;
}

// Initialize list of chats, and populate with example chats
const initChats = function()
{
  appData = []
  addChat("thearst3rd", "Welcome to the chatroom!")
  addChat("thearst3rd", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")
  addChat(
    "<img src=\"https://cdn.glitch.com/5668e6b6-5a6e-45ac-b545-993e29da4410%2FFezName.png?v=1567996543318\" alt=\"FEZ\">",
    "<img src=\"https://cdn.glitch.com/5668e6b6-5a6e-45ac-b545-993e29da4410%2FFezSecret.png?v=1567996576568\" alt=\"A FEZ tetromino code\">")
  addChat("thearst3rd", "(If you have never played the game FEZ, please check out <a href=\"fez.html\">this link</a> for an explanation)")
}


// Add functions to "exports" so they are exposed to the module
exports.addChat = addChat
exports.getChats = getChats
exports.initChats = initChats
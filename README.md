Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

https://a2-thearst3rd.glitch.me/

## BIG CHAT

Big Chat is a simple forum that allows multiple people to post chats on a website which can be viewed by others.

Big Chat has multiple features that would be expected of an application of it's type, such as:
- Entering your name
- Viewing the contents of the messages
- Timestamps which are locally converted to your time zone

Additionally, there exists functionality to wipe the existing chat messages and restart with the default chat messages that are left automatically.

However, there are some drawbacks. In order to view new chat messages coming in, the user needs to refresh the page. This is done automatically upon submitting a chat message, but in case any other user submits a message, the page must be refreshed before that message is loaded.

Lastly, if you have played the video game FEZ, there is a secret easter egg for being able to solve a puzzle. There is also a link on the website which 

Check it out at the link:

https://a2-thearst3rd.glitch.me/

## Technical Achievements
- **Supports Any Number of Concurrent Users**: Because each of the messages are timestamped, multiple users can enter messages at the same time and anyone can see those messages and when they were typed. I tested this with 3 seperate users at one time.
- **Safe Handling of Blank Fields**: Before submitting the form, the client will validate that the fields are all properly filled in before sending a POST request. It will display an alert if the fields are not properly completed.
- **Generation of Chats Table**: A client side script fetches all of the chat information from the server and then dynamically generates the table of elements. It properly adds the class tags to each element so that the CSS can properly make it look pretty.
- **Entering of a Secret Code**: With my FEZ secret, the user can enter a secret code by pressing a certain button combination. My code listens to all button presses, and keeps track of all button presses to check if it matches with the correct code.
- **Playback of Audio File**: Additionaly, when the FEZ secret is triggered, it will play the sound effect from the game which plays when you complete a secret. It streams the files from glitch's assets, and also displays an alert to the user. While I'm at it, I'll say that I also use glitch assets to show the FEZ name and puzzle as part of the default chats.

### Design Achievements
- **Global Font Changing**: The first few lines of css enable the entire webpage to change fonts without needing to add repeated code to every css element. I used this to make the font bigger and more ledgible.
- **Centered Page**: The "content" class allows me to seperate the main body of the page from the background and add spacing on the sides to keep the page centered, while keeping the text from being too far away from the edges. I used different pixel numbers in my main page and the FEZ explanation page to suit the contents of the page.
- **`big-text` CSS Class**: By developing a very simple class, I can make any text bigger relative to the text around it. I utilize this on multiple elements throughout the webpage, for example it is how I made the capital letters bigger than the lowercase letters, even though they're all technically capital letters.
- **Different Chat Table Classes**: In the chat output, there are different classes for the username, content, and timestamp columns. These classes allow the CSS to properly align, weigh, and color the text to look pleasing and readable.
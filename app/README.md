Dan Duff A2 README
---

## Programming Language Identity Quiz
This project is a buzzfeed-style online quiz which can determine which programming language you are. 
Each question answered will attribute points to particular languages, with the final result being the culminations of all questions.
While the points attributed have very loose connections to the language themselves contextually, results are consistent and recorded.
Said point are assigned via classNames that are built into the selected answers, which each question attributing multiple points.

A main-menu page and scoreboard page (in addition to the quiz page itself) provide another layer of interactivity.
- Anytime a user submits the quiz, their results are added to the server's array database. 
- The databse starts with various built-in answers to show fully functionality of the scoreboard page, where you can see other user's results via a GET request. 
- Scoreboard table is dynamically generated based on the number of individuals who answered the quiz.
- Retaking the quiz under the same name modifies the data on the server, updating the value of the user got a different secondary result. 

This quiz was done via JavaScript and HTML, using POST and GET request to communicate with a js server file.
- GET Requests were used to extract both files and database information from the server.
- POST Requests were used to add and modify quiz data.
- Data is stored peristently on the server using an array of result objects 
  (In the event Glitch restarts their server, all data outside the built-in 9 base results will be deleted. This is out of both client and developer control)
- Database fields include: Name, (Programming) Language, and the date when the quiz was completed. 
  Completion date could be used for further data analysis (if Glitch does not remove the data from the server via restarting).
  
The overall goal of the project is designed to provide a fun experience while interacting with the app, using a theme that all Computer Science majors can identify; programming languages.
While this project does not solve world hunger, it does provide a user the opportunity to find out what programming language they are. 
Specific provided results are purely for entertainment purposes. In testing with multiple friends, I've found that the quiz (and its questions) do seem to entertain.

https://a2-dandaman2.glitch.me/

## Technical Achievements
- **Tech Achievement 1**: Used JQuery selectors and modifiers to both manipulate DOM elements, as well as apply functionality to multiple elements at once.
- **Tech Achievement 2**: Used a peristent database file to store quiz results. 
- **Tech Achievement 3**: Used GET and POST requests built from vanilla JavaScript to send and retrieve data from the server.

### Design/Evaluation Achievements
- **Design Achievement 1**: Shown on the main-menu screen and on the quiz screen, CSS animations both move elements, as well as add artistic flair.
- **Design Achievement 2**: After taking the quiz, a database call is made to find all users that answered similarly. 
- **Design Achievement 3**: Used images that are stored locally on the glitch server.
- **Design Achievement 4**: Uses the user's birthday result as a method of resolving any ties. This is done by iterating through all tied values via the index modulo the month


## Pirate Crew Generator
This project is a Pirate Crew generator used for generating and keeping track of members in a pirate crew
- You generate a crew by selcting the crew member you wish to add's rank from a drop down menu and entering their name and year of birth into repective feilds and pressing the submit button.
- The current crew will is shown in a table on screen.
- Any crew member can be modified by entering thier name into the name feild, entering thier new rank and/or year of birth and then pressing the modify button.
- Any crew member can also be removed from the crew by entering their name into the name feild and pressing the delete button.
- "Reset" and "Clear" buttons are also present under the crew table which, when pressed, will reset the crew back to the default list and clear the entire crew respectively


https://a2-brian-earl.glitch.me/

## Technical Achievements
- **Tech Achievement 1**: Rewrote the server using Express to handle the Post and Get requests 
- **Tech Achievement 2**: Implemented Jquery in the client to handle Get requests and manipulate HTML elements
- **Tech Achievement 3**: Used SQLite as a database to store the users data on the server
- **Tech Achievement 4**: Generate a unique id for each entry based on the crew member's name  

### Design/Evaluation Achievements
- **Design Achievement 1**: Changed the color scheme to a sepia tone color pallete well as making changes to the HTML elements such as adding borders in the table and changing the spacing between elements to make the whole website more readable, as seen in style.css
- **Design Achievement 2**: Used the website https://www.bestcssbuttongenerator.com/ to generate css code for the buttons
- **Design Achievement 3**: Used the website enjoycss.com to generate css code for the inputs
- **Design Achievement 4**: Disallowed invalid actions such as trying to delete or modifying a crew memvers who are not in the table or adding a crew member that is already in the table by using alerts telling the user that their input is invalid
- **Design Achievement 5**: Sort the table by the crew member's rank in the same way it is arranged in the drop down menu 
## TaskTracker
TaskTracker is an online tool developed specifically for you to keep a list of things. 
Organize, track and check of items from lists, whether it's a shopping list or a task list for your chores, and manage all of these lists in a personalized dashboard. 
Each user can have multiple boards and can sign in to them using their username and the name for the board anytime.
Each board can have multiple lists (functionality not added - only a demo exists)
Each list can have multiple tasks. You can edit the list name, add new tasks, delete tasks and edit the tasks.
The tasks are shown as a list.
It's useful to have all of your lists stored at the same place, and a possible tracking option (not implemented) can notify you when a task is due. It's
also useful to divide up your lists into different boards to categorize and organize them. 

http://a2-manasmehta18-Manas-Mehta.glitch.me

## Technical Achievements
- **Tech Achievement 1**: Maintained a remote database using firebase
- **Tech Achievement 2**: created sign-in feature based on user input
- **Tech Achievement 3**: maintained 2 html pages and designed flow of data between them using local storage
- **Tech Achievement 4**: used accurate get and post methods to make sure that all pages load
- **Tech Achievement 5**: stored data for each user, board and list using nested JSON objects
- **Tech Achievement 6**: output the relevant data based on user input by posting and reading from the database
- **Tech Achievement 7**: Used one continue button (on index.html) to use the input provided to get the data from the database and move to the next page (task.html) and output
relevant fields in elements on the page
- **Tech Achievement 8**: Modify, delete and add also modifies the database, and after every call to do so, fetches the recently updates data from the database and reflects the
changes on the screen
- **Tech Achievement 9**: Used server logic to create custom email for user based on the username provided
- **Tech Achievement 10**: Loop through the list of tasks and display them every time window is loaded, task is modified, added or deleted to display the most recent update
- **Tech Achievement 11**: Allow the user to delete tasks using just the task IDs because of the way the tasks are stored in the database
- **Tech Achievement 12**: User data divided by username and board name, ensuring some data abstraction and encapsulation
- **Tech Achievement 13**: Added database button on front page to view the database by iterating through all of its content and the nested JSON objects to view all the data

NOTE: To get access to the database on firebase, slack me your Gmail IDs so I can add you to the project.
NOTE: If the first time you enter the name, username, etc. and it doesnt work, (and a gray title bar is displayed with no list name and tasks, and nothing 
output on the server side console), click on the logout button and try doing it again. Worst case scenario: 3 tries, Best Case: 1 try
NOTE: Sign in only works after a board and username has been used to register before. Different sign in for each user and for each board for a user
NOTE: Not much error handling involved so make sure data entered is right, same for the second page

### Design/Evaluation Achievements
- **Design Achievement 1**: Hardcoded all the css stylesheets from scratch with animations and pretty design elements 
- **Design Achievement 2**: All the color schemes are well thought over
- **Design Achievement 3**: Added sticky navbar, aos animations and output elements to the screen based on inputs

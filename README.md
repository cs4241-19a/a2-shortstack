Kent Libby's Grocery List application
---

## Grocery List Online
- **Project domain area**: This project serves as an online grocery list
- **The main challenge the application addresses**: This application allows the user to create a grocery list that is synchronized across all devices accessing it.
- **Key innovations**: By using a database the data is stored permanently, and allows users to see the same data.
- **Main results**: This application does address the problem as the list can be written on a pc, then manipulate on a 
smartphone
- **Additional implications**: Creating a user system to allow visitors to make their own lists would improve usabality.
Additionally being able to reorder items would broaden the use cases for the application

http://a2-kdoje.glitch.me/

## User guide:
- **Important Note**: because the database writes are slow, clicking the check mark or submit button too fast, can 
cause the site to lag.
----
- To enter an item, simply type the item name in the bar that says "item" and press enter or submit
- Press the checkbox to mark an item as purchased, and click the x button to delete it.
- If you access the list from another device, the items will be synchronized across both.

## Rubric notes:
- a `Server` The server.js file handles serving files, and the dbAccessor handles the data storage and updates.
- a `Results` the dbAccessor's class getAllItems will return all items in memory.
- a `Form/Entry` This is the item input bar and the "cards" generated when an item is added
- a `Server Logic` This is handled by the dbAccessor object
    - `Derived field` The derived datafield is the ID since it is generated based off when the row is inserted. 


## Technical Achievements
- **Fixed issue with dynamically attaching button listeners**: As mentioned in my message to the TAs, assigning the
listeners to the buttons individually didn't work. As a result I needed to attach the listeners to all buttons
whenever a new item was added.
- **Used Sqlite3 for database solutions**: This involved determining how to use the APIs, and making sure the promises 
were chained properly. Additionally the latency from the database means adding, or "checking off" items too quickly can
cause the webpage to freeze.
- **Used esm to import a file on the front and back end**: To simplify the request router I created a constants module 
to share the request urls between both. However, it is impossible to import the same files on the front and back end. So
I used the esm package to enable these imports
- **Created unit tests for dbaccessor class**: testing the database using only end to end tests isn't reliable so I 
created unit tests for the database. From this I could ensure the database could handle the required functionality. 
- **Enabled unit testing with esm**: Because the database uses the module imports, I created a jasmine test runner. This 
test runner can take advantage of the esm package for imports. 

### Design/Evaluation Achievements
- **Optimized front end to display changes before writing them to the db**: To reduce user perceived latency I have the 
display update before it writes out to the database. 
- **Used database for persistent data storage**: The database will be created if it doesn't exist, and otherwise will
populate the list with whatever items were in the database
- **Displayed the list items as "cards"**: When you press the submit button, it will add the item to the list. It will
also generate a button to check off the item and a button to delete it
- **Created a system to mark items as purchased**: When you press the checkmark next to the card it will change the color.
This indicates to the user that the item is purchased.

Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## Bill Tracker
This single page web application is an easy way to keep track of your bills. Basic information such as the bill name, date, amount, and if it has been paid are entered by the user and stored on the server, where an additional "Priority" field is derrived from the information. All bills are displayed in a table, where they can be edited or deleted. Changes are stored in memory, and UI table is always up-to-date with the server data. 

The CSS includes styling element, ID, and class selectors, and flexbox was used in the form layout. Two Google fonts, Roboto and Raleway, were also used in this application.

## Technical Achievements
- **Tech Achievement 1**: Used nodemon to automatically restart the server on changed in dev
- **Tech Achievement 2**: Provided basic form validation, such as blocking form submission if there are empty fields, or if a duplicate entry already resides in memory

### Design/Evaluation Achievements
- **Design Achievement 1**: Changed the visibility, text, apperance, and disabled features of various buttons based on application state
- **Design Achievement 2**: Created and applied color palatte (can be found in /public/assets/Bill_Tracker_Palatte.png)
- **Design Achievement 3**: Styled color of table rows to reflect the priority level of the bill. Responds to data edits and additions
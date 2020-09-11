Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## Bill Tracker

Molly Wirtz http://a2-mollywirtz.glitch.me

This single page web application is an easy way to keep track of your bills. Basic information such as the bill name, date, amount, and if it has been paid are entered by the user and stored on the server, where an additional `Priority` field is derrived from the information. All bills are displayed in a table, where they can be edited or deleted. Changes are stored in memory, and UI table is always up-to-date with the server data. 

The CSS includes styling element, ID, and class selectors, and flexbox was used in the form layout. Two Google fonts, Roboto and Raleway, were also used in this application.

# Graders Make Note**:
The HTML file validates with one warning for date input not being supported on all browsers. To solve this, I used a polyfill as described in Technical Achievement 4. Please be aware that while this is a working solution, the warning was not eliminated in validation.

This site is hosted on Glitch at Molly Wirtz http://a1-mollywirtz.glitch.me, but if it were to be run locally, please use the command `nodemon server` to start the application. You may have to install nodemon (`npm install --save-dev nodemon`) and better-dom (`npm install better-dateinput-polyfill better-dom`). 

## Technical Achievements
- **Tech Achievement 1**: Created a single page appliation that provides a form for users to submit data and always shows the current state of the server-side data. 
- **Tech Achievement 2**: Provided basic form validation, such as blocking form submission if there are empty fields, or if a duplicate entry already resides in memory.
- **Tech Achievement 3**: Used nodemon to automatically restart the server on saved changes in dev
- **Tech Achievement 4**: Installed a polyfill package (better-dateinput-polyfill) to ensure support of the date input type across all browsers. Used the script tag to add package to project on client side, and added logic to serve files on server side.  

### Design/Evaluation Achievements
- **Design Achievement 1**: Changed the visibility, text, apperance, and disabled features of various buttons and input elements based on application state
- **Design Achievement 2**: Created and applied color palatte to the application (/public/assets/Bill_Tracker_Palatte.png)
- **Design Achievement 3**: Styled the color of table rows to reflect the priority level of the bill. Responds to data edits and additions.
- **Design Achievement 4**: Changed cursor from default to pointer on clickable elements
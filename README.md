Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===



## Student Height Converter
This application is used to record students' names, class years and height in inches and returns the students height in centimeters. The data is stored in a server until the server restarts.
The user will input a student's data into the field on the left side and click submit. The fields are for the student's name, class year, and height in inches. If a user would like to remove a student from the list
they would need to input the student's name into the right side text box and click on delete. It will only delete the proper field if the name is typed exactly as shown in the table, ie capitalization and spelling.
The table has been prefilled with info of three students. The table will appear when data is added to it.

- This application is used to quickly convert the student's height from inches to centimeters. 
- This application addresses the problem of knowing what the conversion from inches to centimeters is.
- Future work includes optimizing some of the tabling functions to display the information.

CSS changes include moving the table to the center of the webpage, placing the input and delete fields side by side around the table and modifying the buttons to appear larger.


Justin Kreiselman (jkreiselman)
https://a2-kreiselman-justin-kreiselman.glitch.me

## Technical Achievements
- **Tech Achievement 1**: Used express js (https://expressjs.com/) to streamline get/post requests and functions. This can be seen in server.improved.js in the .get and .post functions as well as in scripts.js for the getData()
    and clearData() functions.
    
- **Tech Achievement 2**: Used jquery (https://jquery.com/) to help with manipulating the data to display it in the table. This can be seen in scripts.js in the getData() function.



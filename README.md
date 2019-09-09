Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===
---

## Create a Harry Potter Character
Janette Fong
[https://a2-jlfong.glitch.me/](https://a2-jlfong.glitch.me/)

The user can create their own Harry Potter character by filling out the form.  Once they submitted their information, a table with current added characters is displayed.
Depending on what they answered for the survey question, their character will be sorted into one of the Hogwarts Houses (Gryffindor, Hufflepuff, Ravenclaw, Slytherin).

## Requirements Met
- Server
- Results (table)
- HTML Form (divs and table)
- Server logic (sorted House)
- CSS selectors (element, id, and class)
- CSS positioning (horizontal: table, side by side: title/image and form)
- CSS in external stylesheet
- Javascript
- Node.js

## Technical Achievements
- **Colored Rows (Technical)**: Depending on which House the character is in, the row will be colored in the House's main color (Gryffindor is red, 
Hufflepuff is yellow, Ravenclaw is blue, Slytherin is green).
- **Editing the Table / Field Checking**: The user is able to edit a character's information from the table.  If their House is changed to a different Housee, the row will change its 
color to match the new House.  If the value for the new House ends up being invalid input, the table will list them as a Muggle (a regular human being with no magical talent).
If their first name, last name, or pronouns are edited to be empty, the table will list those fields as redacted.

### Design/Evaluation Achievements
- **Colored Rows (Design)**: To add on to what I stated in the technical aspect, I wanted to display the rows in these colors so the user can easily differentiate
which characters are in which Houses.
- **Table Row Hovering**: I wanted to implement a way where the user's mouse can interact with the table, so I added in an aspect when the mouse hovers over a row,
the row will highlight the text to alert the user which row their mouse is on.  (Got insipration from [here](https://codepen.io/jackrugile/pen/EyABe)).

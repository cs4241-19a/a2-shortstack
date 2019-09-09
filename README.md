Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Due: September 9th, by 11:59 AM.

This assignment aims to introduce you to the concepts and practice involved in creating a prototype (i.e. not deployment ready) two-tiered web application. 

The baseline aims of this assignment involve creating an application that demonstrates the use of several specific pieces of HTML, CSS, JavaScript, and Node.js functionality.
Another aim of this assignment is to establish creative boundaries in which you and your partner can explore designing, implementing, and evaluating usable, useful, novel, and technically efficient web applications.

Baseline Requirements
---

Note that there is a very large range of application areas and possibilities that meet these baseline requirements.
Games, internet of things, organizational tools, commerce, media - all are possibilities with a two-tiered form-focused web application.

Do not limit yourselves to any of the examples given below. 
Examples like the upcoming `efficiency_ratio` idea for the `cars` dataset are meant to be illustrative and easy to understand.
They are not intended to be sensible or useful ideas.

Your application is required to implement the following functionalities:

- a `Server` which not only serves files, but also maintains a tabular dataset with 3 or more fields related to your application
- a `Results` functionality which shows the entire dataset residing in the server's memory
- a `Form/Entry` functionality which allows a user to add, modify, or delete data items residing in the server's memory
- a `Server Logic` which, upon receiving new or modified "incoming" data, includes and uses a function that adds at least one additional derived field to this incoming data before integrating it with the existing dataset
    - the `Derived field` for a new row of data must be computed based on fields already existing in the row. For example, a `cars` dataset with `year`, `horsepower`, and `fuel_efficiency` may create a new field `efficiency_ratio` by dividing `fuel_efficiency` by `horsepower`

Your application is required to demonstrate the use of the following concepts:

HTML:
- One or more [HTML Forms](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms), with any combination of form tags appropriate for the user input portion of the application
    - Clarification: the results page can be implemented in any way. `<div>`s, `table`s, and `list`s are common choices

CSS:
- CSS styling of the primary visual elements in the application
- Various CSS Selector functionality must be demonstrated:
    - Element selectors
    - ID selectors
    - Class selectors
- CSS positioning and sizing of the primary visual elements in the application:
    - CSS to cause at least one element to be horizontally centered on the page
    - CSS to cause at least one pair of elements to appear side-by-side
    - CSS defined in a maintainable, readable form, in external stylesheets 

JavaScript:
- At minimum, a small amount of front-end JavaScript to get / fetch data from the server; a sample is provided in this repository.

Node.js:
- An HTTP Server that delivers all necessary files and data for the application. A starting point is provided in this repository.

Deliverables
---

Do the following to complete this assignment:

1. Fork the starting project code. This repo contains some starter code that may be used or discarded as needed.
2. Implement your project with the above requirements.
3. Test your project to make sure that when someone goes to your main page, it displays correctly.
4. Deploy your project to Glitch, and fill in the appropriate fields in your package.json file.
5. Ensure that your project has the proper naming scheme `a2-yourname` so we can find it.
6. Modify the Readme to the specifications below.
7. Create and submit a Pull Request to the original repo. Only one member needs to submit a pull request.

Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

## Create a Harry Potter Character
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
- **Editing the Table**: The user is able to edit a character's information from the table.  If their House is changed to a different Housee, the row will change its 
color to match the new House.  If the value for the new House ends up being invalid input, the table will list them as a Muggle (a regular human being with no magical talent).
If their first name, last name, or pronouns are edited to be empty, the table will list those fields as redacted.

### Design/Evaluation Achievements
- **Colored Rows (Design)**: To add on to what I stated in the technical aspect, I wanted to display the rows in these colors so the user can easily differentiate
which characters are in which Houses.
- **Design Achievement 2**: We tested the application with n=X users, finding that...

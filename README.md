Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

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
5. Ensure that your project has the proper naming scheme `a2-yourTeamName` so we can find it.
6. Modify the Readme to the specifications below.
7. Create and submit a Pull Request to the original repo. Only one member needs to submit a pull request.

Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

Title: Log your next adventure

This is an app where users can log their travels. Users input their name, place they started from and place they went to, and the app will give them the distance traveled?

- This project aims to help people keep track of their miles traveled for personal records
- This app aims to give users more insight on the extent of their travels and help them remember where they have been to in more concise way
- This app wants to solve the problem that users can have remembering where they have been after traveling for a long time or frequently
- Future steps for the application would be:
    - Adding the same functionality for flights,
    - Adding dates for more record-keeping, 
    - Adding an option of inputting money spent,
    - Adding the carbon footprint left on each trip
    - Showing trips on Google Maps as pins 
    - Adding button to calculate total miles traveled


## Technical Achievements
- **Tech Achievement 1**: Custom CSS for Bootstrap to change the labels of input text boxes to be bigger and more visible
- **Tech Achievement 2**: Used CSS to modify the font family, color, size, spacing, padding of autofill options when activated by your browser
- **Tech Achievement 3**: Dynamically generated table that automatically loads whenever the submit button is pressed to update the contents of the table
- **Tech Achievement 4**: Table fully created using only JS and Bootstrap
- **Tech Achievement 5**: Used Google Maps API to get the distance and duration of each trip
- **Tech Achievement 6**: Distance and duration also automatically added to the table
- **Tech Achievement 7**: All data is logged into the database after the Submit button is pressed
- **Tech Achievement 8**: Users can pick between modes of transport, which then changes the distance and time traveled
- **Tech Achievement 9**: Data will not be added to the table unless Name, Place From, To and Mode of transport have been filled in
- **Tech Achievement 10**: Table content is not editable for distance and duration so users don't have to worry about changing something wrongly
- **Tech Achievement 11**: Table content can be edited at any point and will right after update the database


### Design/Evaluation Achievements
- **Design Achievement 1**: Used bootstrap to lay out the form in a visually pleasing way
- **Design Achievement 2**: Added floating letters for the title text
- **Design Achievement 3**: Used a video for the background to inspire users
- **Design Achievement 4**: Parallax-style layout where the background stays the same while the content changes 
- **Design Achievement 5**: Jumping arrow to go to area where data is shown in a table 
- **Design Achievement 6**: When your browser's autocomplete is used to auto complete the text boxes, custom layout allows for input that is still visually related to the theme of the site
- **Design Achievement 7**: Used Fontawesome icons for edit and delete functionality
- **Design Achievement 8**: User doesn't need to focus on inputting the places in a well-formatted way to get correct distances. Only exception to this I know of is that when you simply put in Worcester, it automatically thinks you mean Worcester, UK
- **Design Achievement 9**: User can click view places in new page button to go to a new page and only get the place table without other distractions. This can be used for accessibility or simply for cleaner printing of data
- **Design Achievement 10**: The return trip check box used as a reminder for users to count that trip twice
- **Design Achievement 11**: Used flexbox to arrange many elements in the form including the primary and secondary buttons, input fields and radio buttons
- **Design Achievement 12**: Secondary buttons adjust dynamically in size on window size change independently of the bootstrap css
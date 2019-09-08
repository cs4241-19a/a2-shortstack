# Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  

===

## To Don't - A Reminder App for Things NOT To Do

This application is designed to keep track of lists of bad tasks which should be avoided.
It allows the user to view a list of tasks, edit previously existing ones, and create new tasks.
The data is stored in a persistent database (DynamoDB) running in Amazon Web Services.

- Allows for storage of anti-tasks with a title, note and priority
- Has the ability to edit or delete fields in previously existing tasks
- Able to make new tasks
- Data is stored externally from glitch to allow for persistance

http://a2-mhwestwater.glitch.me

### Technical Achievements

- **Connected to Amazon Web Services for DB**: Use AWS DynamoDB for storage of data, making it persistent between server restarts
    - Utilizes AWS Javascript SDK to make requests from within the node server
- **Utilize URL Parameters to Pass Data**: Parameters are encoded in the url redirect for the edit screen
    - To avoid another call to the server going from the display screen to the edit screen passes all of the required parameters in the url
        - EX. `todont.com/edit?time=1567881747611&title=TestTitle`

### Design/Evaluation Achievements

- **CSS Used for Different Element Types**: Shown in `style.css`, element, id, and class selectors are used for formatting
    - Element selectors are used to add padding to the header
    - ID selectors are used for a code block formatting used in the `About` page
    - Class selectors are used for the social icons and other parts of the footer
- **Bootstrap Implementation**: Utilized Bootstrap for overall layout and to make the page responsive.
    - Formatting for common headers and footer with links to github repo
    - Forms and table for data display

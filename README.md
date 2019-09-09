## The Forums
My project is a forum which is creatively named "The Forums". Users can post, edit, or delete any message on the forum. 

This project aims to helps people comunicate big ideas in an simple way. The chalanges are giving people the space to write everything they want while still having it not appear daunting to read. The design of the website is colorful yet rather minimalistic. This helps the users focus on the content.

https://a2-jameskajon.glitch.me

###Requirements

####HTML
- All data stored in the database can be seen on the index page, or a specific forum page.
- All messages and dates are displayed (unless deleted). The user's name can be seen by hovering over a username.

####CSS
- I used element selectors, ID selectors, and class selectors in my style.css file
- I horizontally centered the title (h2) on the forum page in style.css with the `#forum-title` selector
- I made the three name fields in the add form to be side-by-side using the `#add-names`. I added padding with the `#add-names > input:not(:first-child)` selector
- All of my css is in the styles.css file and separated by css for the forum pages and the form modals. However, most of my stying is done by bootstrap classed

####JS
- TODO

####Node.js
- I am using express instead of plain node.js. My back end code is written in the app.js and ForumRouter.js files.
- app.js contains the basic server code.
- ForumRouter.js handles all post and gets.
- Data is stored in a Firebase collection.
- My derived field is the username. The username is calculated like a wpi username for students from the name entered when posting a message.

## Technical Achievements
- **Express**: I used express for my server instead of the starter code. This is in the app.js and ForumRouter.js files
- **Firebase**: I used Firebase, a cloud database service from google, to store the data perminatly. I interact with the database from the backend in the ForumRouter.js file.
- **Handelbars**: I used Handelbars to break my html into templates. I also used handelbar partials to avoid writing duplicate code. this code is in the views folder and the index.hbs and forum.hbs files.
- **Promises**: I used prmises extensivly including chaining them and nesting them. I found this nessasary for the api calls to the database. This is in the ForumRouter.js file

### Design/Evaluation Achievements
- **Bootstrap Models**: I made use of bootstrap models. This can be seen by clicking on one of the add, edit, or delete buttons.
- **Pretiness**: Using bootstrap, I belive I did a good job at making my site look good.
- **Material Icons**: I used a google api to use material icons to make the edit and delete buttons on forum pages.

# CS 4241 Assignment 2: Silly Name Book

Author: Rui Huang

## How to use the web app?
### Run locally
Install `npm` and `Node.js`, then run:

`
$ npm install
$ npm start
`

And go to `localhost:3000`

### Online application
Or you can also view the online application here:

Link to the web app: http://a2-ryc1x.glitch.me

## Summary
- This is a simple name book web app which allows user to manage a list of people
- The user can add a new person to the list or delete a person on the list
- Whenever a person is added/deleted, the page get latest list from the server and refreshes the page
- Navbar and footers are added to the app to make it looks better

### Technical Achievements
- **Delete button**: Added delete button to each row of the table to allow user to delete row easily
- **Auto-reindexing**: The index of rows are calculated automatically each time the page refereshes
- **Age calculation**: The age can be calculated in the server with given date of birth info
- **Navbar & Footer**: Added navbar and footer to provide navigation and additional links
- **Major dropbox**: Read the major.json that stores all major info and filled the dropbox with it

### Design/Evaluation Achievements
- **Footer Design**: Designed the color of the footer and re-defined the anchor element
- **Table Design**: Used the table from bootstrap and tweaked it to make it fit the whole theme
- **Gradient transparent background**: The top background image is gradient transparent which seems really cool
- **Title and subtitle**: I used a semi-transparent black label for name and a hand-written font for subtitle
- **Avatar**: Uploaded an avatar to the app and hover on it will...

## Note
The web app uses resources from following sites:
- Booststrap
- jQuery
- Google Fonts
- League of Legends

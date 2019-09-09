## Fantasy Football Player Tracker

Using this project, anyone can keep track of their fantasy football rosters!
To add a player to a roster one can input their name and their statistics in a game.
When the add player button is pressed, that player is added to the roster. The user can
view the roster by clicking on the show roster button. Here the user can see their players
as well as that players number of points. On the bottom of the roster is the total
number of points between all of the players on the roster. A user can choose to remove a
player from the roster by going back to the add/remove player screen and typing in the name
of the player that you wish to remove and then clicking the remove player with this name
button. This program will allow users to create a roster and keep track of how many points
they will receive in fantasy football.

This program uses various fetch requests to add and remove data from the server. The data that
is stored are JSON objects located in an app data array. When add player is pressed it submits
a post request and adds a JSON object representing that player by taking the statistics input
and storing it. When remove player is pressed it submits a post request and removes the JSON object
of the same player name from the data set. When show roster is pressed it submits a get request
and reveals a table of all of the names retrived from the respective JSON objects as well as the
number of fantasy points calculated from the statistics.

- This project tackles storing persistent data, adding to it, and removing it in a program. This assignment introduced me to the concepts and practice involved in creating a prototype two-tiered web application.
- In order to make it possible to address this project I utilized fetch requests to access information in
  the server and either add, remove, or retrieve it. I also used jQuery as well as other web development tools
  to make a better user experience for the client (css, html identifiers)
- I am very interested in web devlopment in the future and I really enjoyed this assignment. I know that I
  will be able to take what I learned and utilize it in the future (maybe even on my own website which currently
  is just static text and images)

http://a2-andrewlevy395.glitch.me

## Technical Achievements

- **Tech Achievement 1**: Storing Persistent Data on the Server
- **Tech Achievement 2**: Using Fetch Requests
- **Tech Achievement 3**: Using jQuery

### Design/Evaluation Achievements

- **Design Achievement 1**: Shown in `style.css`, the layout of the page is designed for users to easily
  interact with the buttons and view their rosters. The css folder contains an image of a football field
  as the background and a football styled font, both of which are utilized to make the site more immersive
  as a fantasy football site.
- **Design Achievement 2**: Uses multile html documents to make viewing easier, one page for adding plyers
  and one for the roster. The roster format makes viewing fantasy points much easier for the user. Even though
  the player has many stats that are impacting a players score, the user only needs to see the score so it is
  all that is shown in the table (due to equation in roster.html).

Readme
---

## a2-kdreese
Unfortunately, I was not able to complete the project this week. The following description shows the vision for the project, while the following listing details what was actually accomplished.
This program is a memory game. This version is simple at just 3 pairs, but it could easily be expanded to much more if desired.
The player can either play the game that is on the screen or submit their own puzzle to the database.
Whenever the page is refreshed, a new game is pulled from the database and filled into the screen.
On clicking a tile, it's color will change, indicating that it had been flipped.
If the second tile flipped is the same color as the first, they will stay flipped; Otherwise, they will flip back down, returning to the base grey color.
Once all tiles are fully flipped, a congratulations message will pop up and encourage the player to refresh the page and play again.

- HTML: I included a form that intakes colors in a grid-like format in order to store them for use in a future game
- CSS: The primary visual elements of the application were styled for aesthetic purposes
- CSS: Element selectors are used to put a border around the table, set a hover action on the submit button, and set the background color of the page
- CSS: ID selectors are in the js file to select the sections of the game board and change their color when they are flipped
- CSS: Class selectors are used to set the background color for an unflipped tile, and center the heading, form, and submit button at the top of the application
- CSS: The heading, form, and submit button are all centered at the top of the page
- CSS: The style.css file was created in a maintainable, readable form, sorted from element selectors, to ID selectors, to class selectors

http://a2-kdreese.glitch.me

Mastermind

An HTML implementation of the board of the same name.
The player must guess the correct combination of colored balls in order to win.
Each time the player guesses, the server will respond by telling the player how many balls are of the
right color and the right position, as well how many are of the right color but in the wrong position.
This information then allows the player to make increasingly educated guesses until the answer is found.

Although the webpage deosn't seem to do anything in response, they can actually be found in the incoming packets.
On Chrome, these can be found in the developer tools, on the 'Network' tab.

On winning the game, the server will respond by dumping the data stored in the server, including the player's name,
the number of moves in which they won, and the medal awarded to their score.

Every time the page is entered, a new board will be generated. This allows the player to start a new game by refreshing the page,
but also means only one person can play at any given time.

Glitch App: https://a2-javiermarcos.glitch.me

## Technical Achievements
- **Tech Achievement 1**: Made a back and forth between server and client and having the server react to the provided information

### Design/Evaluation Achievements
- **Design Achievement 1**: Introduced a few new fonts and some minor styling of the page.

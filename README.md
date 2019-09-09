Andrew Markoski

Glitch link: http://amarkoski-a2-shortstack.glitch.me/

## Word Counter

This program uses Node.js to count the frequency of unique words in a body of text, as well as their first occurrence in the text. The total number of words in text is also calculated. These statistics are determined on the backend server and returned to the frontend and displayed in a results table. A clear button is provided on the frontend to clear the input area and hide the results table.

This program addresses issues related to working with bodies of text and trying to determine the frequency of different words. It provides a solution to these issues while additionally providing information on the first occurrence of each unique word in a body of text. 

![Initial Page](https://github.com/amarkoski/a2-shortstack/blob/master/public/img/initialSite.PNG)
Initial page


![Page after recieving data from server](https://github.com/amarkoski/a2-shortstack/blob/master/public/img/woodchuckExample.PNG)
Page after recieving data from server

## Technical Achievements
- **Tech Achievement 1**: Shown in `scripts.js`, the frontend uses the submit button to dynamically set values of table and make results visible
- **Tech Achievement 2**: Shown in `scripts.js`, the frontend uses the clear button to dynamically hide results and clear input area
- **Tech Achievement 3**: Using an external script (https://www.w3schools.com/lib/w3.js), the results table can be alphabetically sorted by word
- **Tech Achievement 4**: Shown in `scripts.js`, the frontend uses the submit button to make POST and GET calls
- **Tech Achievement 5**: Shown in `scripts.js`, the frontend processes the array of objects and total word field separetely on client side from single server response
- **Tech Achievement 6**: Shown in `server.improved.js`,  the backend splits words in input string based on spaces and then stores individual words, their frequency, and first occurrence in an array of objects
- **Tech Achievement 7**: Shown in `server.improved.js`, to ensure unique words are counted, words in input string are trimmed, set to lower case, and have their punctuation removed
- **Tech Achievement 8**: Shown in `server.improved.js` and `scripts.js`, the program dynamically creates an arbitrary amount of objects on backend and table rows on frontend depending on nuber of unique words

### Design/Evaluation Achievements
- **Design Achievement 1**: Shown in `style.css`, css is used to set appealing font properties (inspired from https://wdexplorer.com/20-examples-beautiful-css-typography-design/)
- **Design Achievement 2**: Shown in `index.html` and `styles.css`, flex boxes are used for showing the instructions and input text area, and results side by side evenly
- **Design Achievement 3**: Shown in `style.css`, css is used to set appealing button properties (inspired from https://fdossena.com/?p=html5cool/buttons/i.frag)
- **Design Achievement 4**: Shown in `index.html` and `styles.css`, the word table header in the results table has a different color and cursor when hovering over it to indicate that it can be clicked

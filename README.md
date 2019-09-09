README
---

## Pythagorean Theorem Calculator
This website allows users to enter two sides of a right triangle and calculate the hypotenuse.
Enter a and b -> Calculates c

Here is a sample formula for summarizing your activities, talk about:
- This project falls in the domain of mathematics and formula calculations.
- The main challenges it adresses is determining the hypotenuse for right triangles
- The interactable form table make it easy to use the website to solve that problem.
- Yes this solves the problem, users can easily see the length of the third side of their triangles
- Note: the submit data function must be clicked in order for the results table on the right hand side to update

https://a2-cenright7192.glitch.me/ 

## Technical Achievements
- **Editable Form Table**: Shown in `index.html` the page uses editable text boxes. This makes it easy and straightforward for the user to edit certain triangle's side lengths. Also, the delete buttons are dynamically created which allows each triangle to be delted at any time, regardless of the order.
- **Passing Data through Response Objects**: Shown in `server.imporved.js` and `input.html`. I had significant trouble with both sending the response from the server side as well as accessing the body of the response on the client side through the promises. I attended many office hours with Noelle and eventually we figured out the problem. This set me back many days on the project because I was unable to work with data without the server.

### Design/Evaluation Achievements
- **Accesibility**: Shown in `style.css` and `index.html`, the image makes use of an alt tag, the colors on the page are all of acccesible contrast, indicative tags were used when applicable. Aditionally, it is easy to tab through all of the buttons and input buttons in the intended order.
- **Layout**: Shown in `styles.css`, I used flex grid to set up the three columns for the layout which allowed me to changes how they were centered.

## Sources:
- An interactable table: https://www.encodedna.com/javascript/demo/dynamically-add-or-remove-table-rows-using-javascript-and-save-data.htm
- The results table: https://travishorn.com/building-json2table-turn-json-into-an-html-table-a57cf642b84a 

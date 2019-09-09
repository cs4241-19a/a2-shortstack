Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Deliverables
---

Do the following to complete this assignment:

1. Fork the starting project code. This repo contains some starter code that may be used or discarded as needed.
2. Implement your project with the above requirements.
3. Test your project to make sure that when someone goes to your main page, it displays correctly.
4. Deploy your project to Glitch, and fill in the appropriate fields in your package.json file.
5. Ensure that your project has the proper naming scheme `a2-yourname` so we can find it.
6. Modify the Readme to the specifications below.
7. Create and submit a Pull Request to the original repo. Label the pull request as follows: a2-gitusername-firstname-lastname

Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

## Todo Application
  For my project, I decided to put together a simple todo list. 
  The user is able to create a task giving it a person, the task itself, and its priority.
  I wanted to get a better understanding of how the server communicates with the client, and be able to pass data between them so that my page can
  be more responsive. The main challenges I faced were actually implementing the server logic with using a framework like Express. Because this data
  isn't being persisted, the application is pretty much just a prototype, but I was happy to get a much better grasp on the CSS side of the app.
  If I were to keep working on this, I would want the user to be able to create different lists and have a seperate tasks that pertain to each list.
  I will say, the fields are not used to compute an additional field, but all the other requirements are met.
https://a2-brandon-m-navarro-brandon-navarro.glitch.me/

## Technical Achievements
- **Form Submission**: The user is able to fill out a task and have it added to the table displayed on their screen.
- **Form Validation**: The user will not be able to submit a todo if all fields do not contain at least one character.

### Design/Evaluation Achievements
- **Table Styling**: I styled a table so that new todo's are appended. The background color of the children also alternate to 
                     improve the tables readability.
- **Responsive Text Fields**: The text fields will change their border, opacity, and color when the user interacts
- **Styled Input Button**: I styled the input button to give it a more a modern look. I kept in mind the idea of user friendlyness,
                           and made sure to change the mouse to hover, and changed the opacity so the user knows they are on a clickable element.
- **Used Grid Layout**: Originally, I wanted to implement what I mentioned above (tasks and lists), so I thought a grid layout would fit best,
                        but after realizing the time-constraint, I had to pivot to only have one task list. I read up about grids and grid templates
                        on the MDN (https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template) where I was able to quickly style my grid in CSS.
- **Repeating Linear Gradients**: For my websites background, I used CSS property that I had never heard of before. I spent quite a bit of time just 
                                  messing around with different colors and angles. MDN page used for reference: 
                                  (https://developer.mozilla.org/en-US/docs/Web/CSS/repeating-linear-gradient.)
- **Color Pallete**: Used the Adobe color wheel to create the color pallete I used on my site.
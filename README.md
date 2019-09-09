You Final Exam Grade Calculator
===
http://a2-eos7l.glitch.me

This website takes your current overall grade for any class, your desired minimum overall grade in class, the final exam weight, and the course title, to compute the minimum percentage grade required for you to score on the final exam.

To fulfill the requirements:
---
### HTML:

- I have 2 HTML pages, one being the input form and the other being the results page. 

### CSS: 

- The input fields as well as the labels (questions) are placed side-by-side.
- The shaded text-box is centered in the middle of the page.
- I used element, ID and class selectors throughout my code. 


Goals:
---
- This website is designed to help students better understand their grades and keep things organized so they can balance their workload particularly during the final exam time. 
- Because of the update functionality, students can constantly change their current grade in class in order to better monitor their progress. 
- If a student decides to drop/NR certain class, he/she can utilize the delete function to delete the data entry. 

Main Challenges:
---
- I had a hard time understanding the communication between the server and the client.
- I went to all the office hours and am still quite confused. Because I also wanted to use a database for this project, it complicated things even more. 
- I am also a hard-core UI lover and I spent a lot of time trying to make the page look nicer. Due to the time constraints, I gave up on implementing the pre-loading screen (half of the code is still in here) and I failed to learn how to use dataTables which should have made the styling of the tables easier.


Implications:
---
- Right now this website is really meant to be used by one person, because of the way the database is coded. The database takes the course title as the key so any other entry with the same course title will overwrite the database. I don't have enough time to manipulate around with it. However in the future, a password encryption step is surely needed in order to ensure the privacy for different users. 
- I am not sure why I cannot make certain CSS styles apply to the second HTML page even when I appended the "!important" tag to override anything else. Namely, I wanted to make he table round-edged, as well as set the header to be relatively higher than the table. Not working though. I also attempted to add some animation with either CSS or JS libraries and they are malfunctioning as well. The console did not alert me anything and I am wondering if it is due to the bootstrap slider. 
- This code currently doesn't have any input checking algorithm. It should be fairly easy to implement later using PHP libraries though.
- Since I actually have 2 HTML pages, I could have implemented a "back" method so the user can go back. With that being said, it can also be worked around with "edit".


Achievements:
---
### Technical:
- I used Firebase to store my data while also maintaining a local dataset. 
- I created a bootstrapped responsive data from scratch which maintained a consistent color scheme. 
- I was able to maintain 2 separate HTML pages without losing data. 
- I learned to use local storage in order to build the bridge between the first and second page (right now this is not necessary because I don't have any password encryption but it can be useful if I implement that).

### Design:
- I implemented a slider for the front page. The example slider code is found here: https://startbootstrap.com/snippets/full-slider/
- I coded the form entry textbox and table from scratch. I also tried my best to maintain a consistent style throughout all HTML pages (including color and font choices).
- I modified this template and turned it into my Results page: https://templatemag.com/demo/GlobalLanding/. It was difficult to make the layering work properly because of the interaction with the particles. P.S.: In A1 I could not accomplish having both the particles interaction in the background as well as the buttons clickable in the front, but this time it is working. 


Special thanks:
---
Kit Zeller and Manas Mehta helped me a lot through the debugging process. 

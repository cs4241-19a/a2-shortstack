Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

https://paristhecity-a3-paris-lopez.glitch.me/

Based on my experience with creating math problems and designs for mathspring.org, an intelligent tutoring system, 
I decided to create a login page and roster for a set of teachers. While there are many ways to elaborate on my 
original plan, I did not have enough time to explore all of my options for this page. I would have liked to have built 
a page where several users could log-in and look at their roster, as well as the grades that accompany each student. 
The teacher would be able to remove students from their class and add new students. When the 'information' button 
is clicked, the teacher can add grades and assignments to the student chosen. Preferably, there would have been
a navigation bar at the top of the page to switch between assignments and account information for the target student.
Currently, all the information is based on one account of a teacher, and if one were to login as the other
teacher (teacher1, teacher1), the tables would be occupied by only the students of the admin teacher. This was intentional
to get started. My plan was to add an attribute in each object to track the active person. This attribute would be 
set to '0' when the user is not active, and '1' when either a teacher logs on or when a student is chosen and becomes
the 'active' teacher or student. This way all the student information can be gathered from the appropriate sources; 
whether it is a list of students, or a single student.

Because the database, password service, and server required a lot of time to get started, I found myself with less time 
than intended to piece together my design. With the remaining time I was able to build a login page, as well 
as the beginnings of a student roster and list of assignments. Students can be added and removed from the list, 
and the more information button brings the user to the list of assignments. The teacher can add assignments as well 
as remove them. 

Though, I was unable to complete more of my original ideas beyond these features, the web app still 
provides a few options for the user and does so in a responsive and clear manner.

Login information: <br>
Username: admin <br>
Password: admin


## Technical Achievements
- **Tech Achievement 1**: I completed the technical aspect of the assignment 
by creating a lowdb database that stores various information and provides it to the web page when necessary.

### Design/Evaluation Achievements
- **Design Achievement 1**: Prior to the creation of the web application, I put great thought into my ideas and design. 
I found the CSS Template to be greatly limiting, however I was still able to create a clean user interface appropriate 
for its purpose. I prepared my web application with some simple drawings to sketch out my ideas on paper. With a 
prototype in hand, I moved onto building the web app itself.

- **Design Achievement 2**: I utilized a CSS template that provided a majority of the style and the functionality. I
also included a couple of JQuery scripts to make the removal of table rows easier and the connection between multiple
pages. 

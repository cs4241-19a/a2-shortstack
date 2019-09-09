Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Due: September 9th, by 11:59 AM.
Katherine Thompson

## Book Tracker

I love to read but I often find myself forgetting the book suggestions that people tell me, or vice versa not being able to provide suggestions on the spot.
This project is an organizational tool to keep track of all the books you have read and you want to read, showing not only the name of the books and authors
but also a comments section and ratings which furthermore sort the books into sections based on if you did or didn't like them. I've personally already started
using the website, transitioning over from keeping my "To Read" list in my Notes on my phone, which was hard to visualize unlike my website.
While this is a personal organizational tool at this time, in the future I could envision it as a forum for book lovers to share their best/worst book picks.

https://a2-ktrose1.glitch.me/

## Technical Achievements
- **getElement vs. Query**: In my script I used getElementById for most of the things including all the input but I also decided to try using querySelector for the table body data.
I have no prior experience using either of these functionalites so I tried to learn more about/use both.
- **Variety Of Posts**: With my POST handling, I sent and handled different types of body every time. In some cases I sent JSON and in others merely a string of the book name.
I was able to handle different types of POSTs other than just the standard, and only post as much data as I actually needed to carry out the functionality.
- **Form Reset**: Everytime I do something involving a form I not only load the new data but I also reset all the forms. So after you submit a form the data in the input
boxes is reset/taken away. I think this is more visually appealing and it gets a clean slate each time showing that whatever was sent through the form was successful.
- **Status**: My derived data field was status which is one of two values good/bad. The status is derived from the rating where anything 3 or over is good, and under is bad and these are used to sort into the good/bad tables.I chose this as a
way to update books so I can show not only the rating being changed but also the status being updated when the edit function is used, show it moving tables

### Design/Evaluation Achievements
- **Design Achievement 1**: Shown in `style.css`, the code...
- **Design Achievement 2**: We tested the application with n=X users, finding that...

-design: user testing-roommates, something in the css-used flex, buttons change color with hover, multiple tables with sorting

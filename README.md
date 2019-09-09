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

Note: Almost all the time, clicking the buttons will automatically update the tables (I have my loadData function for the tables called in all of the onclick functions) but sometimes
if the website has been sitting open for a while you need to refresh the page if a button was pressed but the tables aren't automatically updating.

Link:
https://a2-ktrose1.glitch.me/

## Technical Achievements
- **getElement vs. Query**: In my script I used getElementById for most of the things including all the input but I also decided to try using querySelector for the table body data.
I have no prior experience using either of these functionalites so I tried to learn more about/use both.
- **Variety Of Posts**: With my POST handling, I sent and handled different types of body every time. In some cases I sent JSON and in others merely a string of the book name.
I was able to handle different types of POSTs other than just the standard, and only post as much data as I actually needed to carry out the functionality.
- **Form Reset**: Everytime I do something involving a form I not only load the new data but I also reset all the forms. So after you submit a form the data in the input
boxes is reset/taken away. I think this is more visually appealing and it gets a clean slate each time showing that whatever was sent through the form was successful.
- **Status**: My derived data field was status which is one of two values good/bad. The status is derived from the rating where anything 3 or over is good, and under is bad and these are used to sort into the good/bad tables.
I chose this as a way to update books so I can show not only the rating being changed but also the status being updated when the edit function is used, showing it moving tables if the rating changes from good to bad or vice versa.

### Design/Evaluation Achievements
- **User Testing**: While working on this project I had both of my roommates play around with it (without direction from me) so that I could be sure that people would understand the flow and functionality of the website intrinsically.
- **Flex**: For creating the side-by-side elements I decided to try out a bit of what we learned in the frog game and used flex.
- **Button CSS**: The buttons all change color with hover. I think this adds a little bit of color to my otherwise rather standard colored page. I also looked into contrast (like we talked about in class) with the color of the button,
the color of the background, and also the color of the text and elements within the page making sure there was enough contrast to be easily readable and visually attractive.
- **Tables**: I not only have one big table showing all of the data, I also have two other tables that, based on my derived field, sort the books into books that the user liked and those that 
they didn't like. They update, as books are edited and ratings are updated. This feature was important to me because in my head I tend to organize books like this so I really wanted it visualized as well.

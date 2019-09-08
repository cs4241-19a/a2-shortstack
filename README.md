## Comment Form
This application allows users to leave comments with contact info to the developer. The main challenge I struggled with was sending the results back to the admin page of the client so that they could be viewed as a table. I ended up settling on fetch as the way to move data from the server to the clientMy primary reason for writing this was as a prototype for my own website, in which I want to have a contact form. Contact forms are often more secure and easier then email. 

There are 2 pages, the user view and the admin view. The user view (/index.html) has the comment form and the admin view lets and admin view all of the comments (/admin.html)

https://a2-davidvollum.glitch.me/

https://a2-davidvollum.glitch.me/admin.html

## Technical Achievements
- Using Push and Fetch I was able to make it so comments can be submited on one page and apear on the other page when the admin clicks refresh
- 2 Pages interacting together

### Design/Evaluation Achievements
- External font used "Roboto" which can be seen on the main index.html page
- I have tested it with many comments and it works well
    - It will lose all of the comments when the server quits
-CSS to center the content horizontaly and change the background color (/styles/style.css)

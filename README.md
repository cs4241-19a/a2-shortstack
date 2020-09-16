Luke Bodwell

https://a2-lbodwell.glitch.me/

## User Manager
This application can be used to keep track of users of some system. New users can be added by supplying a first and last name, an email address, and a date of birth. 
A unique ID is assigned to each user, their first and last name are concatenated together, and their age is computed from their date of birth.
All users are displayed in a table that constantly updates. Users can be modified or removed once added. I used CSS Grid for positioning.

I wanted to mention that my site seems to not validate because of the use of semantic markup tags. When I replace them all with divs it validates fine, but I decided to change them
back for the sake of clarity. I hope that's alright.

## Technical Achievements
- **Single Page App Combining Form and Server Data**: I organized the user data in a dynamic table that is updated every 10 seconds or whenever a request is made to the server to update the data.
Any changes in state are managed on the front-end reactively and requests are made to the API without rerouting.
- **Full CRUD API Support**: I implemented routes for POST, GET, PATCH, and DELETE requests for the user data on the server and state management on the front-end to reflect changes made to data.
Data entries can be created, read, updated, and removed.

## Technical Achievements
- None
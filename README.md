---

# WPI Track and Field Diet Tracker
##### -   https://a2-mjadiletta.glitch.me

## Domain
This project contains a design for an online diet tracker, specifically used for the WPI track and field team. At the beginning of the year my coach asked me if I could design an application that would allow his track athletes to record all
of the food they ate during the day. He specifically wanted to have an easy system that is user friendly. This is the prototype. It allows a user to log in, create a new user, or remove a user.
It allows the user to log information for a single day, and maintain that information in a permanent database. The information a user can add is pretty simple. The interface allows a user to record if he or she
ate carbohydrates, proteins, oils, etc by checking a box. If the user checks the box and clicks submit, the information is updated in the database. A derived field is created called "score" which is the total number of checked boxes, representing how many of
the healthy food groups my coach has specified. 

## Main Challenges and Key Innovations
There were a few main challenges associated with this project. First, I did not know how to do a "single page" web app so I learned how to show and hide html elements. As simple as that sounds, it took me forever to figure it out.
I also had a major issue with passing data from the front end to the back end. Again, this seems pretty simple, but I was using "GET" instead of "POST" trying to pass data, but I could not figure out how to use GET to pass data.
I spent a few hours switching all my code to POST and it finally started working. A final major challenge I encountered was trying to save data. I realize it was out of the scope of the assignment to use a database, but
since this application was for my track coach, I figured it would be best if I just hooked up a database anyway. I tried useing a WPI SQL database, but I ran into serious connection issues because you need to be SSH'd into a 
WPI server to access the SQL database. Then I tried using an external import for a sql database but I couldn't get that working the way I wanted it too. So I resulted to coding my own database and database commands. 
Essentially, I created a JSON database, that responds similarly to SQL. I coded some basic query commands to retreive data. All data is stored in a .json file in the public folder. This innovation for the database, made it
possible for this application to run properly and store data. Another key innovation was an innovation I made for passing data between the front end and the back end. I used api endpoints that essentially acted like query
commands for the database. The system I used was essentially a switch-case statement for all the query commands, but it got the job done. 

## Results and Future Work
The results of this application are very good for a preliminary design. It meets the requirement of storing data, retreiving data, editing data, deleting data. However, it falls short in terms of storing lots of data. 
First, everytime the database is accessed, the entire json file is read in. This means that if I get lots of users with lots of data, it will take a while to quickly read all the data and find the relevant info. Next,
a user can only store a single day of information. Here is the general formatat for the database: {User: {food: true or false, food: true or false, ...}, User2: {food: t or f, food: t or f}, ...}
What I really wanted to see was more like this... {User: {date:{food: true or false, food: true or false}, date: {food: true or false, food: true or false}}, User 2 ...}
This would allow dates to be stored. The only issue I had with implementign this was time. Adding another layer of database management to this project wouldve taken a lot of time that I didn't have. Overall, it's
very doable, it would just take more time. In the future, I will add this functionality. I also think it would be important to encode the database so users can't "steal" track athelets information. It might also be valuable
to add a password when signing in. Again, I could do this myself, but it would take time - future work. 

## Technical Achievements
- **Created JSON Database with Query Commands**: I created a method for storing and retreiving information for users using a JSON database. I setup the database by reading and writing to a JSON file. The file is only one
object, all the data residing in the database. I wrote commands that query the database and retreive the required information and returns the information to the user. 
- **Wrote a whole lot of Java Script for User Interface**: I wrote a lot of javascript that accesses elements by ID, class ect. to have them show and hide at correct times. This allows the user to have a single page website
that has lots of builtin functionality. 
- **Implemented Server logic for handling API endpoint requests**: Whenever a user requests data from the server, the front end sends a request for an API endpoint. Then the server does the correct action based on the 
requested endpoint. This allows for scalability for future additons to the project.

### Design Achievements
- **Cool CSS Button**: I added some really cool css for all the buttons making them change color and shape when you hover over them. The button functinality is all connected with javascript but the visual is controlled
by CSS. I found a version of this button online and I redesigned some of the features to make it my own. 
- **Cool Layout**: I made a really cool layout for the web application with a header, navigation pannel, and information pannel. These are all "buckets" that can have pictures added, text, etc very easily. The pannels 
all have associated css that allows them to look the way they do. 


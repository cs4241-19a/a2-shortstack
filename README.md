## Entertainment Collector
This application allows users to submit their own jokes and facts for 
all to see. The app addresses the problem of not being able to keep track 
of all your great jokes and facts. To solve this problem, a SQLite3 database 
was used to store the content, and an HTML form was used to submit the content.
To view the submitted content, an HTML table is automatically populated using Javascript.
This implementation solves the problem, but is missing certain niceties such as a sign-in
to keep your content safe from others. Future work on this app would include a sign-in, a better 
database system, and the ability for search and sort the content when viewing it.

http://a2-ebgoldstein.glitch.me

## Technical Achievements
- **Tech Achievement 1**: Using Javascript to store information in a SQLite database and recall it
- **Tech Achievement 2**: Using Javascript and Node.js to build a client-server architecture in which the server
 is capable of returning results in a JSON format via HTTP and the client can display those results
- **Tech Achievement 3**: Automatically populating a table with Javascript
- **Tech Achievement 4**: Changing HTML text according to a dropdown using javascript 
### Design/Evaluation Achievements
- **Design Achievement 1**: Shown in `style.css`, the site is styled to be minimalistic and functional.
- **Design Achievement 2**: Shown in `style.css`, the results table uses alternating row colors for easy reading

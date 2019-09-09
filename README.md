## A2-Shortstack
### Occupied

Occupied is a web app that allows you to check if a bathroom stall is open before you get up! When nature calls, just reserve a stall by entering a name and duration of stay. Then you're all set! Head to the head!

This app has a persistent database and syncs the status of each stall every 5 seconds using `fetch()`. The largest challenge to adoption would be getting users to utilize the application, as the data is crowdsourced.

Our results page is the main page itself. The app asynchronously displays the status of the stalls, which are manipulated by the user submitted forms.

The derived field for this project is our `end` column. It is found by taking the current time and adding the length of the reservation to it.

In the future, it would great to have a variable number of stalls as well as a custom time option.

https://a2-tmwbook.glitch.me/


## Technical Achievements
- **Tech Achievement 1**: Uses SQLite for a single file database which gives persistence and allows for data synchronization.
- **Tech Achievement 2**: Uses an Object Relational Mapping (ORM) called `sequelize` to manage all interaction with the database. This will pay off greatly if the application is ever expanded beyond a single table.
- **Tech Achievement 3**: Using `moment.js` enabled a common time library on the frontend and the backend. Because of `moment`, we can display a time remaining field without verbose JavaScript.

### Design/Evaluation Achievements
- **Design Achievement 1**: Included `Materialize` to give the application a flat feel.
- **Design Achievement 2**: Overrided some of the materialize CSS in style.css to fix some of the assumptions that are made about the color accessibility.
## When To Meet - http://a2-jgerulskis.glitch.me
My web application provides users the ability to plan events, without the need to sign in.

I was inspired to make this applicaiton by the website www.When2Meet.com, a site I have used 1 too many times. The UI is cumbersome, especially on mobile devices. I couldn't stand using this application when I knew I could create a better version. My site would allow users to plan events just like When2Meet.com, but with a much better UI. The main focus on this project was user friendly UI elements, that would work just as well on mobile as on desktop.

As it stands today, the application only can plan 1 event at a time. Meaning everytime an event is created, it overrides the existing event. However, all the functionality for planning multiple events is already incorporated except for the backend generating a unique id for each event. To demonstrate the ability that my application has to plan multiple events, I created additional example events which I will talk more about later.

http://a2-jgerulskis.glitch.me

### Technical Achievements
- **Tech Achievement 1**: 2 post request types (1 in eventCreationHandler.js, 1 in eventViewerHandler.js), one creates an event, another modifys the events availibilty (2 forms)
- **Tech Achievement 2**: Front end and back end post request validation to prevent malicous intent ('FormValidation'). It mainly checks the input to make sure it is properly formatted.
- **Tech Achievement 3**: Dynamically created table based on a event details JSON file (In eventViewerHandler.js)
- **Tech Achievement 4**: Dynamically created tabled cell 'click' event callbacks utilizing closure (In eventViewerHandler.js)
- **Tech Achievement 5**: The ability to manage / parse request for infinite amount of events given they all have a different ID (In In eventViewerHandler.js / server.improved.js)
- **Tech Acheivement 6**: JQuery to bind UI elements to HTML, and dynamically inject navbar
- **Tech Acheivement 7**: Used library MomentJS to do operation on DateTimes on the backend. Flatpicker gives the backend a range formatted like yyyy-mm-dd to yyyy-mm-dd. I convert that to an array of dates between the two. It is then given to the client when viewing the event like [yyyy-mm-dd, yyyy-mm-dd, yyyy-mm-dd, ....]
- **Tech Acheivement 8**: Used file system on backend to make events persist as JSONs

### Design/Evaluation Achievements
- **Design Achievement 1**: Bootstrap CDN to quickly create layouts / navigation bar
- **Design Achievement 2**: Used library Flatpickr to create the DateTime UIs on the event creation page. Used native UI on mobile browsers. Key to a user friendly mobile experience.
- **Design Achievement 3**: Custom logo in top left of nav bar.
- **Desgin Achievement 4**: On the event viewer page, the cells with some available people has a custom calculated alpha value intended to create a quick way to determine availabilty. Ex: a cell with 4/5 available people will be much less transperant than a cell with 1/5 availabilty. This makes it easy to view.
- **Design Achievement 5**: Added a gradient background to the body of the html.
- **Desing Achievement 6**: CSS selectors using IDs
- **Design Achievement 7**: CSS to cause form input fields to be horizontally centered on the page
- **Design Achievement 8**: CSS to cause table cells of elements to appear side-by-side
- **Design Achievement 9**: CSS defined in a maintainable, readable form, in external stylesheets 

### How to use
- **Create an event from /index.html or /**
- **View event or add availability at /viewEvent?exampleEvent3**
- **Share the link with whoever else you want to plan with**
- **Happy planning!**

### Demonstration of ability to create infinite events on the server once unique ID function is implemented
- **Use Case 1**: Jack's birthday party! view at /viewEvent.html?exampleEvent1
- **Use Case 2**: Software Engineering Retrospective! view at /viewEvent.html?exampleEvent2
- **Events created in index.html**: Your event! view at /viewEvent.html?exampleEvent3
- Line 110 in server.improved creates the hardcoded event ID, that is where a unique id function should be implemented for the future. Since it is hardcoded it creating new events overrides the hardcoded exampleEvent3 json.

### In depth technical explanation of functionality
I wanted to include a section to thoroughly explain how my application works from a technical stand point while creating an event.
1.) User creates event from the home page (index.html).
    > Frontend validates form
    > A post request is sent to the server
    > Backend validates with MomentJS
    > Manipulates date range to an array of dates
    > Saves to a json file (hard coded as exampleEvent3, could be anything though)
2.) User views event from view event page (viewEvent.html?eventID, eventID can be anything)
    > The front end splits the URL at the '?' to make 2 seperate get request
        - 1 for the html
        - 1 for the JSON file with event details
    > The front end then dynamically creates a table conforming to event details
    > Looks at current availability and colors cells accordingly
3.) User begins selecting his or her available times
    > Front end keeps track of the selected days.
    > Selecting an already selected day removes it from the current user's availability.
    > The user can then submit this availability to the server via a post request.
    > The backend appends that users availabilty to a list.

### Requirements
- a `Server` which not only serves files, but also maintains a tabular dataset with 3 or more fields related to your application

Saves and serves events JSONs from the event folder in the public directory.

- a `Results` functionality which shows the entire dataset residing in the server's memory

the /viewEvent?exampleEvent3 page allows you to view entire dataset of a specific event

- a `Form/Entry` functionality which allows a user to add, modify, or delete data items residing in the server's memory

You can create events at index.html, and add your availibilty to the event on the viewEvent.html page

- a `Server Logic` which, upon receiving new or modified "incoming" data, includes and uses a function that adds at least one additional derived field to this incoming data before integrating it with the existing dataset

Although I do not explicitly add a new field, I strongly beleive my date conversion as explained in my tech acheivements sufficiently fulfills this requirement. Flatpicker gives the backend a range formatted like yyyy-mm-dd to yyyy-mm-dd. I convert that to an array of dates between the two. It is then given to the client when viewing the event like [yyyy-mm-dd, yyyy-mm-dd, yyyy-mm-dd, ....] instead of as a range. Although this isn't an additional field, it is a derivative field of what we were originally given based on the input. 

### Created with help from the following libraries

Flatpickr > https://flatpickr.js.org/getting-started/
MomentJS  > https://momentjs.com/
Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Due: September 9th, by 11:59 AM.

This assignment aims to introduce you to the concepts and practice involved in creating a prototype (i.e. not deployment ready) two-tiered web application. 

The baseline aims of this assignment involve creating an application that demonstrates the use of several specific pieces of HTML, CSS, JavaScript, and Node.js functionality.
Another aim of this assignment is to establish creative boundaries in which you and your partner can explore designing, implementing, and evaluating usable, useful, novel, and technically efficient web applications.

Baseline Requirements
---

Note that there is a very large range of application areas and possibilities that meet these baseline requirements.
Games, internet of things, organizational tools, commerce, media - all are possibilities with a two-tiered form-focused web application.

Do not limit yourselves to any of the examples given below. 
Examples like the upcoming `efficiency_ratio` idea for the `cars` dataset are meant to be illustrative and easy to understand.
They are not intended to be sensible or useful ideas.

Your application is required to implement the following functionalities:

- a `Server` which not only serves files, but also maintains a tabular dataset with 3 or more fields related to your application
- a `Results` functionality which shows the entire dataset residing in the server's memory
- a `Form/Entry` functionality which allows a user to add, modify, or delete data items residing in the server's memory
- a `Server Logic` which, upon receiving new or modified "incoming" data, includes and uses a function that adds at least one additional derived field to this incoming data before integrating it with the existing dataset
    - the `Derived field` for a new row of data must be computed based on fields already existing in the row. For example, a `cars` dataset with `year`, `horsepower`, and `fuel_efficiency` may create a new field `efficiency_ratio` by dividing `fuel_efficiency` by `horsepower`

Your application is required to demonstrate the use of the following concepts:

HTML:
- One or more [HTML Forms](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms), with any combination of form tags appropriate for the user input portion of the application
    - Clarification: the results page can be implemented in any way. `<div>`s, `table`s, and `list`s are common choices

CSS:
- CSS styling of the primary visual elements in the application
- Various CSS Selector functionality must be demonstrated:
    - Element selectors
    - ID selectors
    - Class selectors
- CSS positioning and sizing of the primary visual elements in the application:
    - CSS to cause at least one element to be horizontally centered on the page
    - CSS to cause at least one pair of elements to appear side-by-side
    - CSS defined in a maintainable, readable form, in external stylesheets 

JavaScript:
- At minimum, a small amount of front-end JavaScript to get / fetch data from the server; a sample is provided in this repository.

Node.js:
- An HTTP Server that delivers all necessary files and data for the application. A starting point is provided in this repository.

Deliverables
---

Do the following to complete this assignment:

1. Fork the starting project code. This repo contains some starter code that may be used or discarded as needed.
2. Implement your project with the above requirements.
3. Test your project to make sure that when someone goes to your main page, it displays correctly.
4. Deploy your project to Glitch, and fill in the appropriate fields in your package.json file.
5. Ensure that your project has the proper naming scheme `a2-yourname` so we can find it.
6. Modify the Readme to the specifications below.
7. Create and submit a Pull Request to the original repo. Only one member needs to submit a pull request.

Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

## Triage
Triage helps you keep track of tasks you have to do. It has support for recommended deadlines, and hard deadlines, as for many classes they have recommend doing certain problems after lecture but may only collect homework once a week. There's support for multiple levels of importance and for difficulty. It uses all of the just mentioned filed to calculate a priority score, which is displayed on the web app and is used to sort the list of tasks. This differentiates itself from other existing options.

![image](https://user-images.githubusercontent.com/13973198/64527783-d4680f80-d2d4-11e9-9ccb-6936853ab8c4.png)


http://a2-jcharante.glitch.me

## Meeting Requirements

- We must have a derived field added by the server. This is the priority score, which is generated on the server. For the source, see the `modifyData` case under the `handlePost` function in `server.improved.js`.
- `server.improved.js` serves the website and the api server. Our web app was compiled into a static single page application, and GET requests to this server are resolved by returning the corresponding file under `triage-spa/dist/spa/`
- Each item in our todo list is stored in `itemsStore` on our server. Each item is an object. Every time an item is created, modified, or deleted, a POST request is sent to this server. When loading the web app, it sends a request to the server to retrieve the items in memory.
- HTML
  - We opted to use input tags in favor of HTML forms, but you can see that they exist when adding items. You can click on the text of items (picture below) to edit them, or select a new option on a dropdown box. 

![image](https://user-images.githubusercontent.com/13973198/64530129-66bee200-d2da-11e9-9975-a1f3cf88582d.png)

- CSS
  - CSS styling of the primary visual elements in the application
    - We are utilizing a framework that has some styling out of the box, but we are supplementing it by using `#AC2B37` as our primary color theme (screenshots out of date).
    - In addition, we set the background of the todo list entries by whether their status ( Not Started, In Progress, Done).
  - Various CSS Selector functionality must be demonstrated:
    - Element selectors
      - [This is used to bold the text under the mouse cursor.](https://user-images.githubusercontent.com/13973198/64532947-7e00ce00-d2e0-11e9-93ae-8286c1f66f6c.png)
    - ID selectors
      - [This is used to select the header of the results table and bold the text contained within it.](https://user-images.githubusercontent.com/13973198/64533159-f36c9e80-d2e0-11e9-9fe6-977d1959e124.png)
    - Class selectors
      - We use class selectors on our text fields for each item. This is to apply a `min-height` attribute to them. This is explained alongside the code in `triage-spa/src/components/Item.vue` line 81.
      - We dynamically determine which class selectors to add to an Item, and used it for setting the background color of items according to their status.
- Javascript
    - Javascript is clearly used throughout the application. Some of its usage is explained below under the `Client has its own State Tracking` Technical Achievement.
- Node.js
  - The starter server is expanded upon to support our custom API requests and to deliver files from the project submodule.

## Technical Achievements
- **Persistent Memory**: On server shutdown, a `data.json` file is saved to disk containing the entries on our todo list. On server startup, the `data.json` file is loaded from the filesystem if it exists.
- **Easy to add new features**: Since our item entries are represented by objects / dictionaries, whenever we want to add a new field (such as `difficulty`), then we only need to modify the client (located under `triage-spa`). We have a general modify item endpoint on the API end of the server, which uses `Object.assign()` to only update fields that are sent to the server.
- **Client has its own State Tracking**: The client utilizes Flux/Redux like state manager (Vuex). This allows it to be integrated with development tools such as the Vue Devtools, which means that you can track mutations to the state and time travel between different version of the state to debug UI issues. In addition, this allows us to write middleware in our state handlers that allows us to notify the server to changes in our state, to instantly save any changes done on the client.

### Design/Evaluation Achievements
- **Design Achievement 1**: Shown in `style.css`, the code...
- **Design Achievement 2**: We tested the application with n=X users, finding that...
- **Delete Entry Option merged into status**: As you can see below, we have a dropdown that allows us to set the status of an item (Not Started, In Progress, Done). In addition we added an option to delete the item. We have an event handler watching to see if Delete is selected, and if so then we don't change the status, but instead launch a Prompt to see if the user can confirm that they want to delete the item. Only after that is the request to delete the item sent to the server. 

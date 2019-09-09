## Triage
Triage helps you keep track of tasks you have to do. It has support for recommended deadlines, and hard deadlines, as for many classes they have recommend doing certain problems after lecture but may only collect homework once a week. There's support for multiple levels of importance and for difficulty. It uses all of the just mentioned filed to calculate a priority score, which is displayed on the web app and is used to sort the list of tasks. This differentiates itself from other existing options.

![image](https://user-images.githubusercontent.com/13973198/64527783-d4680f80-d2d4-11e9-9ccb-6936853ab8c4.png)


https://a2-jcharante.glitch.me

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
  - CSS positioning and sizing of the primary visual elements in the application
    - CSS to cause at least one element to be horizontally centered on the page
      - The Add Item button is horizontally centered using flex.
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

Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Due: September 9th, by 11:59 AM.

Baseline Requirements

Your application is required to demonstrate the use of the following concepts:
HTML:
- One or more [HTML Forms](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms), with any combination of form tags appropriate for the user input portion of the application (2 text boxes, text and date, and 4 buttons)

CSS:
- CSS styling of the primary visual elements in the application
- Various CSS Selector functionality must be demonstrated:
    - Element selectors (used for body styling)
    - ID selectors (used for buttons)
    - Class selectors (used for div styling/bootstrap)
- CSS positioning and sizing of the primary visual elements in the application:
    - CSS to cause at least one element to be horizontally centered on the page (all content blocks are positioned in center using bootstrap columns, no need for align-elements except for on things like text)
    - CSS to cause at least one pair of elements to appear side-by-side (main content columns are 1x2 in each row)
    - CSS defined in a maintainable, readable form, in external stylesheets (99% of css styling is in style.css)

JavaScript:
- At minimum, a small amount of front-end JavaScript to get / fetch data from the server; a sample is provided in this repository. (cookie hadling, fetch requests)

Node.js:
- An HTTP Server that delivers all necessary files and data for the application. A starting point is provided in this repository. (handling fetch requests)

## HunterCaouette's website - now with a horoscope machine
Include a very brief summary of your project here.
Images are encouraged, along with concise, high-level text.


Here is a sample formula for summarizing your activities, talk about:
- domain area: a cool little feature set for the website to make it more fun
- persistent data storage beyond server up-cycle w/o a real database
- used cookies in lieu of setting up a database
- the cookies are a decent workaround, to really address the issue on every windowload the page would POST each cookie to the server
- I would be interested in continuing to research/look into ways to use cookies effectively as a way to store session data for user convenience


http://a2-hcaouette.glitch.me

## Technical Achievements
- **Tech Achievement 1**: In this project I used browser cookies to maintain session data for 24 hours, even if the server is disabled. They can be viewed from the cookie viewer menu in the browser.
- **Tech Achievement 2**: Used bootstrap to make front-end elements look cleaner and more organized, and scalable to screen size
- **Tech Achievement 3**: used alerts to deliver derived fields to the user, and then store the information in the cookies

### Design/Evaluation Achievements
- **Design Achievement 1**: I used alt tags on my images
- **Design Achievement 2**: I checked for suitable text/background contrast (scored 7.66)
- **Design Achievement 3**: I couldn't use many semantic tags, as my site is still supported by bootstrap which uses proprietary divs

Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Baseline Requirements
---

Your application is required to implement the following functionalities:

- a `Server` which not only serves files, but also maintains a tabular dataset with 3 or more fields related to your application
- a `Results` functionality which shows the entire dataset residing in the server's memory
- a `Form/Entry` functionality which allows a user to add, modify, or delete data items residing in the server's memory
- a `Server Logic` which, upon receiving new or modified "incoming" data, includes and uses a function that adds at least one additional derived field to this incoming data before integrating it with the existing dataset
    - the `Derived field` for a new row of data must be computed based on fields already existing in the row. For example, a `cars` dataset with `year`, `horsepower`, and `fuel_efficiency` may create a new field `efficiency_ratio` by dividing `fuel_efficiency` by `horsepower`

Your application is required to demonstrate the use of the following concepts:

CSS:
- CSS styling of the primary visual elements in the application
- Various CSS Selector functionality must be demonstrated:
    - Class selectors
- CSS positioning and sizing of the primary visual elements in the application:
    - CSS to cause at least one element to be horizontally centered on the page
    - CSS to cause at least one pair of elements to appear side-by-side
    - CSS defined in a maintainable, readable form, in external stylesheets 


Natalie Bloniarz - Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
---

## Zodiac Calculator / Horoscope Database
The purpose of this comedy.
The application calcualtes zodiac signs based on a given birthdate, and gives users the opportunity to revieve a random horoscope for a person entered into the database.
(All horoscopes were generated using https://www.wordblanks.com/mad-libs/misc/story_137920/played/4032093/?new=1)
An area for future expanision would be the addition of a persistant database and the addition of an internal horoscope madlibs generator.

http://a2-nbloniarz.glitch.me

## Technical Achievements
- **Dynamic Dropdowns**: When adding or modifying information in the database, the dropdown for the day of the month dynamically changes based on the month selected. 
- **Dynamic Displays**: The buttons on the navigation bar at the top of the page dynamically hide/show the relevant functionalities of the buttons
- **Completed Server Logic**: The user can add, modify, and delete, multiple pieces of infomation per visit. Additionally The user is not allowed to add duplicate information (Exact same first name, last name, month, and day)


### Design/Evaluation Achievements
- **Bootstrap Carousel**: Implemented a bootstrap carousel displaying zodiac images. Adapted from https://www.w3schools.com/bootstrap/bootstrap_carousel.asp
- **Styled Results Table**: at...

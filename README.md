Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

# Bookmarker

This website is dedicated to keeping track of other websites you frequently visit or would like to read in the future.

It stores links you give it on the server and displays it in a table.

As we are visual thinkers, each bookmark also includes the icon for the website to better differentiate the two.

When I go to bookmark websites, I normally put them in folders based on their categories (social media, articles I want to read, blogs, etc.) so each bookmark that you save, 
has an optional "Tags" category, where you can specify what kind of website it is, for example I would categorize Facebook as `social media` and maybe `news`.

In the future, it would be nice to have a way to order the links.

http://a2-jpinz.glitch.me

## Technical Achievements
- **Used express**: Learned how to use the npm library `express`, and redid the server using `express`
- **Used jquery**: Learned how to use the library `jquery`
- **Got website icons**: Used a special URL to get the website icon for each link added, this is the server logic that uses a value from the inputted
data to make a new value in the stored data, the derived field
- **Wrote custom 404 page**: Made a custom 404 page for the website
- **Search by tag**: Implemented a way to filter out bookmarks that don't contain a certain tag
- **Prevent Duplicates**: Added checks to make sure no duplicate links were submitted
- **Prevent Empty Name/URL**: Added checks to make sure link name & url wasn't empty

### Design/Evaluation Achievements
- **Table fits with automatic resizing**: via the `overflow-x:auto` property
- **Used Google Fonts**: Added a font with Google Fonts

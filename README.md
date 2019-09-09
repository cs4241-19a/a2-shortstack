Readme
---

## Character Creator
By Justin Cheng {http://a2-jchengz.glitch.me}

This project is a demonstration of a preliminary/prototype two-tier web application. The application itself is called Character Creator, where the user creates a generic character
that has the properties of their name, age, occupation, and level of stats for their strength, dexterity, intelligence, luck (how lucky they are), and oddity (how unsual/weird they are).
Together, the stats sum up to the 'Total' stats value, which is calculated on the server end. After the character is created, the user can view that character in a table of characters, 
and edit or delete it. 

The main issue I had was my lack of familiarity with JS and how to properly send over and process data to and from the "server"(working with fetch, json stringify/parsing). A bit of 
trial and error, and the support of friends and the omnipotent Google search engine has lead me to produce a functional produce. There was one major issue that I was not able
to address prior to the submission deadline. For the editing functionality, after clicking the butten to send over the new data to the server, the user is immediately
redirected to a blank page. Upon re-entering the page and clicking on the "See All Characters" button, it is evident, however, that the edits made does go through (provided the
refresh from glitch has not happen).

## Technical Achievements
- **Using JavaScript to modify HTML & CSS**: I used JavaScript to add more html tags to the original index.html file (instead of creating multiple pages) as well as
  chaging the style and modifying the display of certain elements.
- **CSS Animation: Typing Effect**: Using the resource listed below, I was able to stylistically incorporate a different kind of CSS animation into my web app.

### Design/Evaluation Achievements
- **Single HTML File by Design**: The application functions using one html file that is the index. 
- **CSS Modifications**: Using CSS, the aesthetics are less mundane but the minimal effects provide a clean and low-clutter view


# # Resources
- Typing Effect: https://usefulangle.com/post/85/css-typewriter-animation#targetText=CSS%20Properties%20Being%20Animated,a%20solid%20color%20to%20transparent.
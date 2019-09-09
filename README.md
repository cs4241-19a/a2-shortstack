Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## Andrew's Arbitrary Data Collection Station

I was having trouble coming up with what type of data to collect, so this application just collects some basic data and gives fun statistics about it.

The main problem this program is trying to address is boredom. It can probably entertain you for a minute or two.
Or if you are really into data like what the average of several RGB values or names is, I guess this can do that for you too.

The five things the form collects are: first name, last name, birthday, favorite color, and how you are feeling right now (on a scale of 1-5)
As multiple people submit the statistics about this data get more interesting
you can see the averages of people taking the quiz in respects to:
   average name length
   average name
   average favorite color in RGB
   average age
   average mood while taking this survey
   
Unintentionally this program solves three problems that could be considered valuable:
   It can tell you the average name between multiple names
   It can produce the average value of several colors
   If only one name is entered it can count the number of characters you submitted, if you need to know how long something is
   
By submitting the form multiple times you can find the averages to things you never thought to take the average of before!


Data can be submitted by the form, it can also be deleted when viewing the group page. However, for the most
fun results with this application you are encouraged to submit as many forms as possible during the lifetime
of the server to get the most interesting aggregate data results.

All style changes can be seen in style.css:
     Titles are horizontally centered (h1,h2,h3,etc...)
     The main content is also centered between two columns (that was done by bootstrap though)
     The first name and last name fields are displayed side by side (at least on desktop, on mobile they stack for accessibilty)
     
   

https://a2-acnolan.glitch.me

## Technical Achievements
- **Tech Achievement 1**: The site is mobile friendly and will work on desktop and phones nicely, you can test 
                          the differences by viewing it on your phone or resizing the browser. This was done
                          using bootstrap.
- **Tech Achievement 2**: Using the HTML5 audio tag EPIC background music plays to make the form more fun.
                          You should probably mute your audio if you don't want to hear it. It only
                          seems to work on chrome, edge, and ie.
- **Tech Achievement 3**: The form uses javascript to ensure front end validation. The form is not submitted
                          to the server unless all of the fields are filled out, this prevents excess
                          server use.
                          
### Design/Evaluation Achievements
- **Design Achievement 1**: Using the chrome developer tool's lighthouse audit I recieved 100/100
                            for best practices, seo, and accessibility. For performance it was still
                            high 95/100, the issue was caching and the size of the files (specifically
                            bootstrap.min.css). I tried to use the minimized version to reduce load
                            times, however if I had more time I would have added caching to solve
                            the problem even more.
- **Design Achievement 2**: Shown in `style.css`, I redesigned radio buttons to look more like
                            regular buttons and just be prettier for selecting the how you
                            are doing element of the form.
- **Design Achievement 2**: Shown in `style.css`, the code uses a three column layout with the main
                            content centered, and then two side columns showing images for
                            "aesthetic" value. As mentioned above the site is mobile friendly,
                            and will properly collapse things as the window scales down and the 
                            table on the results page will become scrollable to avoid overflow issues.
- **Design Achievement 3**: I tested the application in various browsers to ensure that it works.
                            In the chrome and ie it functions as intended. Firefox and Safari did
                            not seem to support the audio. Edge supported the audio, but had issues
                            with some of bootstraps css.

Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===
## Ramen Ordering Website
Carla Duarte

http://a2-ciduarte.glitch.me

My project was inspired by a restaurant in Cambridge, MA called Yume Wo Katare.
The only thing on the menu is a bowl of ramen, and you get to choose how many pieces
of pork you'd like. Before starting the meal, customers are encouraged to share their
dream with the chef.

My website features an order form and a table to view all of the orders fetched from
the server. Within the table, you can edit or delete entries from the server's memory.

### CSS Requirements
- **Horizontally Centered**: All of the content in <main> is centered horizontally.
The order form, table, confirmation, and update form are centered within that div.
- **Side-by-side**: If you navigate to "View Order Table" and click "Edit" on any of
the entries, I put the #update-form-btns in a flex box in order for them to appear
side by side.

### Technical Achievements
- **Client-side Validation**: Incorporated an error message if the form is submitted
with missing fields.

### Design/Evaluation Achievements
- **Accessibility**: I downloaded the aXe plugin for Chrome and ran an accessibility analysis.
This caused me to refactor my html to comply with the recommended standards
(alt text on images, add navigational landmarks, adjust colors to improve contrast,
introduce role groups and aria-labels). I brought my website down from almost 30 violations
to 0.
- **Font Resizing**: One thing I played around with for this project was resizing. I was able
to make all of the text in the website adjust to the size of the browser window. For the next
project, I'd like to take this further by creating a responsive layout that is optimized for
both mobile and desktop browsers.
- **User Testing**: As I was developing the website, I was able to test the experience on a
few of my peers. Their interactions with the website lead to design decisions such as confirmation
that your order has been received, the 'Cancel' button on the update form page, and proper error handling in the UI.
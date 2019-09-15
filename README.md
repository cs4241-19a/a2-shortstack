## Ken's Ice Cream Shop
This project features a game that I developed. This is a simple web-based game that allows the player to run their own ice cream shop. One of my major challenges with this project was handling data across mutliple pages. The complex (ish) http requests was greatly simplified with the use of expressJS. Another issue I had was correctly updating the completed orders list to remove the right one, no just any order of the same flavor. I solved this by assigning each order with a unique ID. This project was a great learning experience, and brings me a little closer to becoming a full-stack developer! This is just meant to be a silly game, no awards to be won here!

http://a2-kendesrosiers.glitch.me

## Technical Achievements
- **ExpressJS**: I used expressJS to simplify the server/handling requests.
- **Bootstrap**: I used a little bit of bootstrap in order for the user to be able to enter their name (for the scoreboard) into a modal.
- **Javascript**: I got some Javascript help from the internet for the drag/drop functionality, but was able to make it work by reading the urls of the images to see if they matched, as well as ID checking.
### Design/Evaluation Achievements
- **UI**: The UI was not made with any templates; it was completely created by me.
- **Font**: I imported a special game font from the internet to give it a more gamey feel.
- **Music**: I have the ice cream truck song playing during the game.
- **Updating lists**: I was able to update the orders list correctly. By this, I mean that when completing an order, it would remove that exact one from the list, not just any arbitrary order of that same flavor. I achieved this by giving each order a unique ID (the current time).

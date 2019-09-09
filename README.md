## Book Tracker

The goal of this application is to track the books the user is currently reading and keep track of the users progress in each book.  I was inspired by Goodreads when making this application, and want to make a better a tool for avid readers to keep track of their books.  Future goals would be to implement more book details to maintain, specifically read status of books with separate lists to go with them (read, unread, currently reading).  Persistant server data would also be a future goal. The final goal for this project would be better styling across the entire application.

Users are able to add, edit and delete entries from the database.  The fields are: title, author, genre, number of pages, number of pages read, and a final field is calculated by the server, percent read.

http://a2-elizabethkirschner.glitch.me

## Technical Achievements
- **Tech Achievement 1**: Table displays dynamically on each addition or edit to the data.  because of this, all entries                             can be removed without breaking the application.
- **Tech Achievement 2**: Server has add, edit and delete functionality
- **Tech Achievement 3**: Edit populates the form with current data for easy changes

### Design/Evaluation Achievements
- **Design Achievement 1**: Shown in `style.css`, the application displays the data in an easily readable format
- **Design Achievement 2**: Form 'pops up' and dissapears on add and edit
- **Design Achievement 3**: Delete button only exists when editing an entry

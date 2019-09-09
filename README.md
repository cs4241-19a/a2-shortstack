## Seat Booker
This application provides a way for students to book and reserve a seat for their class in Fuller Lower.

Seat Booker Allows:
 - Students to book quickly and online
 - Delete their booking should they change their mind
 - View other students in their section
 - Quick searching through reservations with automatic updating

http://a2-mersair-christopher-mercer.glitch.me

## Technical Achievements
- **Database**: Maintain persistant data using SQLite
- **API back-end**: Allow polling, creation, and deletion of data with API endpoints.
- **One page design**: Keep the user on one page to allow for quick and easy access. Done using fetch.
- **Custom errors**: The API serves custom error (and success) pages to help other developers.
- **Cross-browser support**: Tested on multiple platforms and devices (mobile friendly)

### Design/Evaluation Achievements
- **Dynamic tables**: Table is dynamically build and resized to handle large data sets
- **API Ease of use**: API returns human readable and easily understood codes/messages
- **Simplistic UI**: Modified forms to be easily edited

## Notes
 - I've spoken to the professor to ensure the format of data is acceptable (as it isn't technically infinite in it's format).
 - The API doesn't have an edit function, but my understanding is displayed in the delete call. This would be near identicle to an edit (with the SQL args changed)
 - CSS is modified to my usage, but some classes simply look better in the included lib so they were used instead.
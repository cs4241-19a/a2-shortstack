## Artificial Satellite Database

- This application collects and stores a database of artificial satellites.
- For ease of use, it splits the display three categoris:
  - Scheduled for future launch,
  - currently operational,
  - and inactive.
- Elapsed and total mission times are calculated.
- Satellites are automatically moved into the active state after their launch date passes.
- Users can remove satellites schedule for the future and mark active satellites as inactive/complete.


https://a2-samgoldman.glitch.me

## Technical Achievements
- Switching between two views ("add" and "view") within the same webpage
  - Auto switches to view on load based on hash fragments ("#add" and "#load")
- Automatically updating tables when "remove" or "mark complete" are used (implemented by clearing the tables and reloading the JSON)
- Basic client side input validation: form submission blocked until all fields are completed
  - End date is not required if mission is marked as active

### Design/Evaluation Achievements
- Used Bulma CSS library for consistent design
- Scrollable tables to minimize screen usage
- Implemented Bulma extension for better looking date pickers
- Relevant icons included in form (from Fontawesome 5)
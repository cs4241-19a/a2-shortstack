## Spotify Jukebox
Spotify Jukebox is a web interface to the spotify API to allow multiple users
to control the song queue, like a jukebox in a diner.

This application is useful to people who like using spotify with large groups,
but don't like how only one person controls the music. 

By using the spotify web search API, I can easily get access to the entire catalog
of songs that spotify provides and display them easily for the user.

In its current implementation, the application only creates the queue, but does
not currently access the spotify web-player api, so does not play any music. This functionality was beyond the scope of this project, and I need to figure out the best way of letting a user sign in to the server, since the server will need a spotify auth token. 

The only challenges I really had for this project were quirks in JS that I haven't had enough experience to recognize yet. I'd spend long amounts of time debugging an issue because I didn't know the root cause of it.

http://a2-archduketim.glitch.me

## Technical Achievements
- **Tech Achievement 1**: Call to external spotify web API for song data
- **Tech Achievement 2**: OAuth token stored in cookies on the client
- **Tech Achievement 3**: Use of jQuery to make DOM changes easier
- **Tech Achievement 4**: Addition of `express` framework for easier server handling


### Design/Evaluation Achievements
- **Design Achievement 1**: Copied color scheme from spotify to provide familiar interface
- **Design Achievement 2**: Dynamically build table with results using JS
- **Design Achievement 3**: Flexbox layout in header to position elements near the edges
- **Design Achievement 4**: Separate queue view page at /queue.html to reduce clutter

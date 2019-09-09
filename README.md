## Magic: the Gathering Club Application Form

While at the Activities Fair at the beginning of this year, I realized that the WPI Magic: the Gathering club doesn't have a simple way to keep track of member information - merely a file containing members' the email addresses. By storing member records in an online server, it would be much easier to locate, view, and modify member data. In particular, viewing names along with email addresses simplifies the process of looking for a specific member, and being able to view graduation status would allow us to easily prune the list after members leave the club when they leave WPI. My current implementation, however, could use two major improvements that I was unable to implement due to time constraints: implementing password-protection for editing and deleting members from the list, and the ability to download member information into a file for ease of sending emails to the entire group.

https://a2-emhess.glitch.me/

Note to graders: When attempting to import my project into Glitch from GitHub, the Glitch loading screen looped endlessly without importingmy project. I spoke to Noelle about this at her office hours on Thursday, September 5th, but she didn't know how to fix it. As a workaround, I manually copy-and-pasted all of my files into Glitch. As far as I can tell, everything is fully functional, but I'm not certain.

## Technical Achievements
- **Tech Achievement 1**: Dynamically creates a table with exactly as many rows as there are members stored in the server
- **Tech Achievement 2**: Changing between viewing and creating modes is done with a single button that is updated when the mode changes
- **Tech Achievement 3**: encodeURIComponent() and decodeURIComponent() are used to store member data inside their corresponding update button in the table.

### Design/Evaluation Achievements
- **Design Achievement 1**: Viewing data in a table makes it easier to scroll through said data

## Grade Tabler

- This is a simple website prototype that allows for users to add students with a numeric grade, deriving and storing their letter grade as well.
- The website allows for users to easily add new students, modify their grades, and delete old students, while being able to view them in an HTML table.
- The students are automatically added to a table, which displays them in alphabetical order by name after the "Show Current Grade Table" button is clicked.
- The system has the basics required to add, modify, remove, and order students, and acheives its basic objective.
- All of the basic requirements for css usage are present, with various selectors and positioning options used.
- This site could be improved by allowing for different ordering of students, such as by numeric grade.
- This site would also be improved with some security measures for the user input, especially if the site became widely used.
- This site could also be expanded to give students grades in individual subjects, or by allowing individual databases with user logins to keep them private.

http://a2-pjjankowski.glitch.me

An example table might be as follows:

![Image of Example Table](https://cdn.glitch.com/e0bc9286-a871-443e-a57f-2e27d07bd89e%2Fimage.png?v=1567999287676)


## Technical Achievements
- **Tech Achievement 1**: In `server.improved.js`, a sqllite database is used for storing and retrieving the student information, instead of an array. This permits the students to be easily retrieved and displayed in alphabetical order.

### Design/Evaluation Achievements
- **Design Achievement 1**: Shown in `index.html`, the display table can be hidden from view using a hide button, and will automatically refresh itself if the user adds a student, updates a student, or attempts to delete a student.
- **Design Achievement 2**: For accessibility, all font colors chosen have a contrast ratio greater than 10.
- **Design Achievement 3**: The table for showing student grades will automatically update visually as students are added, modified, and deleted, if currently being shown, but starts as hidden, and can be hidden with a button.


## Power Usage Database

The website allows the user to enter voltage and current reading, and power is calculated. 
The backend architecture is established for a system that can track the power usage of certain appliances
The UI allows the user to not only submit data, but also modify and delete is, as well as retrieve all of the data currenlty stored in the server
In the future, graphs could be generated to better display to the user exactly how their power is being used

Notes:
  1) I could not get a seperate CSS stylesheet to work, so all of my styling is in a style tag at the top of index.html
  2) Something must be entered into the "Remove a reading" form before hitting the button, otherwise the site will break. All other forms can be submitted with no data entered and be fine

http://a2-danielcaffrey.glitch.me

## Technical Achievements
- **Tech Achievement 1**: Using basic HTML forms, created a user interface that allows a user to add, delete, or modify data
- **Tech Achievement 2**: Using an HTML table and button, created a user interface that allows a user to see the data currently stored on the server
- **Tech Achievement 3**: Using an HTML paragraph text object, created an area to display to the user the communication that the website has recieved from the server
- **Tech Achievement 4**: Using an array, maintained a server database of data submitted by the user
- **Tech Achievement 5**: Calculated the power value based on the given Voltage and Current
- **Tech Achievement 6**: Implementation of error correction for added Voltage and Current values that prevents a value of 0 from being entered. This also accounts for nothing being sent in these two fields

### Design/Evaluation Achievements
- **Design Achievement 1**: Shown in the style tag of the HTML doc, Element Selectors are used to center the headings and forms
- **Design Achievement 2**: ID Selectors are used to implement a grid layout over the "Respone from Server" and "Data form Server" sections of the website. This places these sections side by side
- **Design Achievement 3**: Class Selectors are used to add a border to the "Respone from Server" and "Data form Server" sections of the website

## Expense Tracker

The main challenges the application addresses are keeping track of daily expenses. We often lose track of how much we spend and this program aims to make it easy to keep track of all data. Once data is loaded in the table, you are even able to filter the data from each column. 

The user is able to enter the amount of an item, the tax of an item, the category it falls under (restaurant, gas, etc..), and the month that the item was purchased. Once all fields are filled with the proper values (makes sure amount and tax inputs require an integer), the submit button will unlock and you can send your data to the server. The client sends the data to the server for amount, category, and month, and then upon requesting the data back, the program will parse through the json data and calculate the sales tax on the client side and then add a column for total amount, to satisfy the "server logic" portion of the project. The table shown in the wesbite is a combination of data pulled straight from the server and an added column with a tax calcluation performed. 

This should satisfy the "results" requirement on the readme. Since the data is added to the server upon submission, this also satisfies the "Form/Entry" requirement. Since the data is maintained and appended on the server side, this also satisfies the "server" component of the project. 

A user is able to export his data into one of 4 formats (csv, excel, json, pdf).

I belive that this website does address the problem of keeping track of expenses and being able to filter by category or month makes it very easy to see what a user could cut down on to save money. 

Future areas that could definitely be addressed on this project is a data visualization aspect to better visualize expenses. With more time, I would also like to reset the layout upon submit (clear all inputs and remove the green notification color). I would also like to add the function of modifying or deleting data on the server. Currently, the program just adds to the .

http://a2-newtownfam.glitch.me

## Technical Achievements
- **Tech Achievement 1**: Using javascript, I was able to change the color of each entry box to green when a proper value had been inputted, and back to gray if the value is removed.  
- **Tech Achievement 2**: Using javascript and the tabulator library, I was able to make a complex table that showed each value, a count of amount on the bottom, and the ability to export the data into one of 4 formats (as mentioned above).

### Design/Evaluation Achievements
- **Design Achievement 1**: I used the bulma css libraries to give the website a clean, minimal look
- **Design Achievement 2**: I used a bulma css library to also give the table and export buttons a clean look. The buttons on bottom are outlined and upon hover change to a full blue color. 

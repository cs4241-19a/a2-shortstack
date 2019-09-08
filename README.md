http://a2-percyjiang.glitch.me
## Online Dating in Ocean
- **Domain Area**:
    The project serves as an online dating application for sea creatures. 
    
- **Brief Summary**:
    You can start by entering your personal information on the right side of the page. 
    You can find the other users of this application on the left side of the page.
    The match scores are calculated based on your information and other users' information. 
    You can modify or delete a row using the icons on the right of the table.
    
- **Main Challenges**:
    The project refreshes the match scores of all items based on the newly entered row.
    A gear icon and a bomb icon are assigned to each row so that server knows which row to modify or delete.
    
- **Key Innovations**:
    Using JavaScript to create HTML element and append them to the table.
    Assigning 'onclick' function upon the creation of each icon so they have reference to the corresponding row.

- **Main Results**:
    The project is able to present the existing dataset in the server and present newly added rows upon submit.
    The project allows modifying or deleting an item by clicking on the corresponding gear and bomb icons.
    
- **Possible Future Works**:
    It would be better to keep a 'liked' list and a 'blacklist' for each user.
    Theoretically, a user shouldn't be able to modify other users' data.
    Theoretically, a user should only have one profile.

## Technical Achievements
- **Form Validation**: 
    Shows a hint message to indicate missing fields when the 'submit' button is pressed with missing fields.

- **Radio Buttons**: Incorporated radio buttons in the form.

- **Switch Between Modify and Submit**:
    Clicking on the gear icon next to a row will fill in the form on the right with corresponding information.
    It makes it easier for user to modify the content.
    Updating the row will empty the form again, which makes it easier for user to submit new form.
    
- **Dynamically Refresh Table**:
    The 'refresh' function in 'script.js' creates a table row and append it to the table.
    First it fetches the dataset from the server, then it creates HTML elements to hold each field of a row.
    It also dynamically creates icons and 'onclick' functions for them.
    It ensures a very smooth progress for the project to load the results table, add, modify, or delete a row.
    
- **Code Designing & Formatting**:
    The code in 'server.js' and 'script.js' are formatted in a logical order.
    The functions are designed to obey the design principles.
    
    Shown in `server.js` :
    - It contains the main dataset and two main functionality: get & post with 5 helper functions.
    Shown in `script.js` :
    - The first section of this file registers the necessary HTML elements.
    - The second section of this file handles the refresh function. It uses fetch to load the server's main dataset
    and contains functions to create and append HTML elements.
    - The third section of this file handles the POST related functions. Since 'add' and 'modify' have very similar
    structure, I refactored the functions to reduce duplicate code.

### Design/Evaluation Achievements
- **On Hover**:  Shown in `style.css`, the 'submit' button changes color on hover.

- **Stylistic Theme**: 
    The theme of this project provides user with a feeling of ocean because of the stylistic background images.
    The font and the table border are colored in white to look better with the ocean theme.
    
- **User Testing**:
    I asked my friends to test the project and give feedback.
    The results of user testing leads to better looking UI design.
    Other feedback lead to more intuitive fields and match score algorithm.

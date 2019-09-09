Readme
---

## Candy Order
This is supposed to be a platform to order different flavour of candies in various sizes chosen.
This webpage includes: 5 fields - flavour, amount(number and size of the candy), name and the email address.
- In the table generated, there would be one more field 'price', which is calculated using given data.
- Baseline requirement: 
    1. I did not finish the 'Form/Entry' functionality, but other parts work fine. I spent much time debugging the delete function: my code can make the data in the table delete (after refreshing the webpage), but will lead to '404' error. I still could not figure out the reason for that. I commented out the code I wrote for 'modify' function since I don't have enough time debugging them after I wrote.
    2. For CSS, as seen in the style.css, I used various selectors including Element and ID. My 'Amount' fields are arranged to be side-by-side and the title is horizontally centered on the page.
    
https://a2-jsong2333333.glitch.me/

## Technical Achievements
- **Tech Achievement 1**: Using catch error with the fetch API to let the programmer aware of the errors happened.
- **Tech Achievement 2**: Fields "Flavour", "Amount" are tested to see if they are finished before the user add the submission. If not, a notice would be shown.

## Design/Evaluation Achievements
- **Design Achievement 1**: Shown in `style.css`, ':focus' is used in the fill-in fields to give extra interaction with the user through the interface.
- **Design Achievement 2**: Placeholders are used to give user a better idea what should be filled in each field.

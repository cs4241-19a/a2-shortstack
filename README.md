## Course Management System
https://a3-yangjack1998.glitch.me/

Available username & password: admin admin / yang yang / sylar sylar

-This system is a course management system. Users can log in to see their own courses and then add/edit/delete courses.

-The goal of this application is to build a user associated database application. Also to practice using express and its middleware packages.

-The unfamiliarity to the express middleware package is the largest challenge. It required me to search a lot to understand 
the meaning of the given code.

-Used passport and lowdb since these they have been taught in class and easy to implement.

-Used wingcss since it is simple, lightweight and easy to use.

-Five Express middleware packages: passport, body-parser, morgan, serve-favicon, session

## Technical Achievements
- **Alert Window**:  When user enter a wrong username/password and hit login, there will be an alert window that tell him/her that the information is invalid.
- **Disabled Button**: Add button is disabled until all fields are completed. This prevents invalid inputs.
- **Alternative Image Replacement**: If for some reasons, the image on webpage cannot be load, there will appear alternative 
text.

### Design/Evaluation Achievements
- **Inline adding/updating**: There is no extra adding/updating field. The input fields are put right under the existing 
information. This not only saves space for the webpage, but also make the webpage much easier to understand and use.
- **Hover Reaction**: The proper hover reaction can tell user which button/tag is available. Whenever users hover over a input/button/tag, if the element is available, there will be reaction. If the button is not available(like submit button won't be available until every field is filled), uesr can easily tell because of the style and lack of reaction.
- **Icons**: There are icons both on web title and web page. This can help people easier to understand the meaning of each
fields (especially for people who cannot read the language).
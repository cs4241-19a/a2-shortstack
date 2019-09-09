## Robotics Competition Assistant
The goal of this webpage is to provide a match result recorder as well as a ranking system to a robotics competition or any other similar competitions.

The user need to give the system a match number, teams in that match and their score. The system will record the match and determine the winner automatically. Then, the system will update the rank by the number of matches each team won. User can view the both Match History and Rank by click on the tags. They can also edit or delete matches in Match History.

The main challenge for this system is that it is hard to rank the teams since the dynamic features(user can add/edit/delele matches at any time). To solve this problem, I decided to use two lists which one is used for match recording and one is for rank recording. Each time the Match History renewed, both lists will be refreshed and re-iterated in order to get the lasted ranking. 

It turns out the ranking system works fine with this idea and I also added the code to sort the list so that rank from high to low. There are several things can be down to make this web page more useful. First, adding two more teams column to the table will make the tool more realistic since most of robotics competition is 2v2(VEX, FRC, FTC). Second, we may want to make this webpage shareable. This is because some of the competitions' scale is so large that we need more than one person to record the result. If we can make this webpage shareable(database), the efficiency will increase a lot.  
https://a2-yicheng-yang.glitch.me/
http://a2-charlieroberts.glitch.med 

## Technical Achievements
- **Tech Achievement 1**: Limited input type and submission. The code specifies the type of each input so that user cannot enter anything other than number in to the scoring field. Users are also not allowe
- **Tech Achievement 2**: ...

### Design/Evaluation Achievements
- **Design Achievement 1**: Since this is a robotics competition assistant, the interface is designed to be very simple. Shown in style.css, the code makes everything properly stand around middle. The text is large and background color of teams is specified so that users can easily under stand the concept.
- **Design Achievement 2**: The hover reaction properly tells user which button/tag is available. Whenever users hover over a input/button/tag, if the element is available, there will be reaction. If the button is not available(like submit button won't be available until every field is filled), uesr can easily tell because of the style and lack of reaction.

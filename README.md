# Assignment app
With the Assignments Application an easy way is provided how students keep track of all their assignemnts and due dates.
![Application screenshot](https://i.imgur.com/nwNvtYJ.png)
- the application mostly pertains to students, although everyone else that needs to keep track of assignemnts could use it too
- the application addresses the challenge that many students face of organizing all their tasks and assignments and a quick way of seeing what assignment only has critical time left (colored red) and which assignment can still be done later (colored green)
- the key innovations are that assignments get color coded depending on when they are due. Currently every assignment that's due within 5 days is colored red, erverything else green. Moreover a feature that is currently not fully implemented is, that users can share their assignment list with others for group projects or something similar. Right now every user sees the same assignments and work with the same list.
- the result of the implementation can solve many of the problems that students are facing with organizing assignments 
- although the application does not cover sharing options or a user management yet

The application is on [a2-retat.glitch.me](http://a2-retat.glitch.me)

## Technical Achievements
- sending data back and forth in JSON by using fetchJson for easier posting
- implemented fetch polyfill
- using bootstrap for easy alignment and layout changes
- accesibility features like alt for images and responsive design
- jQuery for selesting elements
- edit and delete function for already created assignments
- dates get converted to readable english date format
- assignments get automatically loaded if user refreshes the website

### Design/Evaluation Achievements
- Selecting elements, ID's and classes with jquery like:
```javascript
$('#newAssignment-'+id).val()
```
- Positioning Elements with bootstrap like:
```html
    <div class="container mt-3">
        <form action="">
            <div class="row justify-content-around">
                <div class="form-group">
                    <label for="inputAssignment">Assignment Content</label>
                    <input type="text" class="form-control col-12" id="inputAssignment" aria- placeholder="Enter Assignment">
                </div>
            </div>
        </form>
    </div>
```
- because the styling mostly happens with bootstrap the style.css file does not contain many rules
- many elements are created dynamically within the script.js file
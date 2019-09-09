## Lost Words

Lost words is a web app that allows users to make an account and store writing entries. The app
gives user feedback, such as word frequency, synonyms and rhyming words, as well as tools for
searching for word definitions. It is meant to be a writer's toolkit and ensure that words are never lost, made possible by
cloud database storage, text recognition libraries, and various UI elements. Hopefully, this app allows users to 
be more aware of their writing and the words they use.

Future work could include text classification, such as active/passive voice, spelling mistakes, and grammatical structure.
There is also the possibility for implementing group collaboration, such as for co-authoring.

http://a2-kitzeller.glitch.me

Below is the top of the UI for the main dashboard which makes up most of the app's components. The cards are open on window load, but I have collapsed them in this screenshot.
![Cards UI](img/collapsible_cards_img.png)

Below is a snippet of the firebase layout
![Firebase Layout](img/firebase_img.png)

Below is an example of hovering over a word in the bubble chart.
![Word Bubble](img/word_bubble_img.png)

Below is an example of OCR recognition for post submission.
![Text OCR](img/text_recog_img.png)

## Technical Achievements
- **Tech Achievement 1**: Used Firebase Admin SDK for database access through the server. In the handle get/post/delete/put requests,
the data gets sent/retrieve from a cloud database as a means of persistent storage. I designed the database so that each unique UID associated with the logged in user is
used to get only their data from the database. The server calculates the word count and frequency map before posting it to the database.
- **Tech Achievement 2**: Implemented a user authentication system using firebase auth client library. Authentication is checked
and access to personal dashboard sites is dependent on being authenticated. Created login and register pages for this.
- **Tech Achievement 3**: Using d3.js, created visualizations. Used chart.js too.
- **Tech Achievement 4**: Using http requests to the [datamuse](https://www.datamuse.com/api/) api, get word synonym data.
- **Tech Achievement 5**: Used angular.js for better dynamic generation
- **Tech Achievement 6**: Use tesseract.js and myscript.js for OCR and handwriting recognition

### Design/Evaluation Achievements
- **Design Achievement 1**: Used and modified a bootstrap admin theme from [here](https://startbootstrap.com/themes/sb-admin-2/). 
Modifications were made within the html files as well as custom overrides in styles.css
- **Design Achievement 2**: Designed the data visualizations and the interaction for submitting new posts
- **Design Achievement 3**: Designed multiple text entry methods for accessibility: file upload OCR recognition, realtime handwriting recognition, typing.
- **Design Achievement 4**: Paid attention to minor detail. For instance, "no results" message on definition searches. 
Alert messages for form validation. Collapsible cards. Only enabling delete/update buttons when a table row is selected. 
Re-disabling the delete/update buttons when a row is deleted.



## Area of a Square Experiment

http://a2-dkaravoussianis-demi-karavoussianis.glitch.me

My project pertains to research in how humans are able to perceive relative area of squares. The experiment generates two squares on random sizes, and asks the user to estimate what percent the smaller is of the larger in terms of area.  The data collected from this experiment could be used to gain more insight on how humans perceive area, and how effective area is as a method of data visualization. The results of my data do not completely address the problem, because no control, or alternative visualization method was observed. Additional areas of future work would be observing if the user becomes more accurate as the experiment progresses. In addition, testing alternative methods and seeing whether users are more accurate when taking more time per trial.

My project uses a combination of get and post requests to transfer data from the server to the client and vice versa. Every time the continue button is clicked, a post request is called to send the elapsed time, guess, and actual percentage to the server. After the post request is complete, the percent error is calculated as a derived field.  In addition, if the show results checkbox is clicked, the data is updated after every continue click, which requires a get request, where the application data is sent back to the client to be displayed on screen.




## Technical Achievements
- **Tech Achievement 1**: Updating Results list. For my first tech achievement, I implemented code to update the html text after every get request. The data is displayed in a list format, showing every trial while the server is running. I used loops to keep the data updated with the most recent trial.


### Design/Evaluation Achievements
- **Design Achievement 1**: My design achievement is the overall organization of the experiment.  I purposely made sure that the blocks were the same color, because color can affect area perception.  In addition, the areas are established randomly, without a bias to whether the left or right side would be larger. Since presenting the results can influence the next trial, there is a button for the user to toggle the result log.

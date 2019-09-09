## Data Logger for Formula SAE Race Car

This project is a prototype website/view for the formula SAE team at WPI. It focuses on the logging and display of data for the cars performance. The data it gathers is the cars speed, wheel speed (in rotations per minute), current gear, and the date time for the logging. The idea is that the app can accumulate multiple data readings for all gears (Reverse, Park, 1st->6th Gears) and display both the individual records (bottom table) and the aggregate average speed for each gear. All this data is crucial for the engineering team to understand the cars system as it is being developed and to make critical adaptations to the drivetrain system. For a race car, it is important to optimize the speed it goes at each gear and when the gear changes occur (determined by a very high or low wheel rpm). With more advanced calculations, contrasting the wheel speed and car speed data can also inform how much slip there is on the wheels and when, which is an effect that should be minimized through changes accross the car's systems. 

The goal of the first table, which shows the average speed per gear, computed on the server after every form entry, is to provide the user (engineering team) with the actual gear speeds. Gear speeds are a car parameter that the team tries to control and predict through design and simulation software but is only ultimately validated with this tool. 

The goal of the second table is to not only display every reading, but provide an interpreted way of looking at the wheel speed in RPM. Considering the cars maximum rpm is around 1000 rotations per minute, it displays a progress bar towards that number at every reading. The color of the progress bar indicates the need for gear shifting. Red/Orange are closer to the min and max rpms, which represent the need to shift gears down/up respectively. On the other hand, green and blue are on the middle of the spectrum and represent the rpm ranges when the car is at an ideal rpm and gear, with no need to shift. This table can help the design team with understanding shift timing but also the driver, in case it can be read dynamically during driving and after enough data has been inputed.

http://a2-Oporto.glitch.me

## Technical Achievements
- **Tech Achievement 1**: Used a combination of the tabulator js and css external code (http://tabulator.info/) with own css for custom styling relative to the other elements
- **Tech Achievement 2**: Used promises and .then frequently in the code whenever an operation would take long
- **Tech Achievement 3**: Created persistent dataset in the server using json file

### Design/Evaluation Achievements
- **Design Achievement 1**: Was able to combine float positioning with a container which had column flex-box positioning
- **Design Achievement 2**: Tested the application with all gear inputs, rpm ranges, positive and negative speeds and the computations and displays perform accordingly
- **Design Achievement 3**: Combined different forms of styling with an image, gradient, table themes and solid colors
- **Design Achievement 4**: The tables and flex-box container size accordingly as input is sent through the form and results set gets larger

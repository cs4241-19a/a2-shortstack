/*
 * 2047++ By Michael Bosik
 * This is the game for Assignment 2 in Webware
 * Everything in this code was created by Michael Bosik
 */

const N = 5;
let score = 0,
    rank = null;
    done = false,
    grid = [N],
    coolDown = false,
    keyVals = [],
    modal = null;

/*
 * setUpGame() - created game grid and generates HTML elements
 */
function setUpGame(){
    modal = document.getElementById("gameOver");
    done = false;

    grid = [N];
    for(let i = 0; i < N; i++){
        grid[i] = [N];
        for(let j = 0; j < N; j++){
            grid[i][j] = null;
        }
    }

    document.getElementById("gridContainer").innerHTML = "";
    
    for(let i = 0; i < N; i++){
        document.getElementById("gridContainer").innerHTML += 
        "<div class='gridRow'></div>";
    }
    for(let i = 0; i < N; i++){
        for(let j = 0; j < N; j++){
            document.getElementsByClassName("gridRow")[i].innerHTML += "<div class='gridCell'>"+null+"</div>";
        }
    }

    score = 0;
    rank = null;
    for(let i = 0; i < 4; i++)
        keyVals[i] = 0;

    placeNew();
    coolDown = false;
    updateGrid();

    //Key press event listeners WASD
    window.onkeydown = function(event){
        switch(event.key){
            case 's':
                move('down');
                break;
            case 'a':
                move('left');
                break;
            case 'w':
                move('up');
                break;
            case 'd':
                move('right');
                break;
        }
    }
    window.onkeyup = function(event){
        if(event.key == 's' || event.key == 'a' || event.key == 'w' || event.key == 'd')
            coolDown = false;
    }
}

/*
 * move(direction) - event handler for WASD keypresses
 * re-orients grid for movement, calculates cell values
 */
const move = function(direction){
    let moved = false;
    switch(direction){
        case "down":
            for(let j = N-1; j >= 0; j--){
                for(let i = N-2; i >= 0; i--){
                    if(grid[i][j] && i+1 < N){
                        if (grid[i+1][j] == grid[i][j]){
                            grid[i+1][j] *= 2;
                            grid[i][j] = null;
                            moved = true;
                        }
                        else if (!grid[i+1][j]){
                            grid[i+1][j] = grid[i][j];
                            grid[i][j] = null;
                            i+=2;
                            moved = true;
                        }
                    }
                }
            }
            keyVals[0]++;
            break;
        case "left":
            for(let i = N-1; i >= 0; i--){
                for (let j = 1; j < N; j++){
                    if(grid[i][j] && j-1 >= 0){
                        if (grid[i][j-1] == grid[i][j]){
                            grid[i][j-1] *= 2;
                            grid[i][j] = null;
                            moved = true;
                        }
                        else if (!grid[i][j-1]){
                            grid[i][j-1] = grid[i][j];
                            grid[i][j] = null;
                            j-=2;
                            moved = true;
                        }
                    }
                }
            }
            keyVals[1]++;
            break;
        case "up":
            for(let j = 0; j < N; j++){
                for (let i = 1; i < N; i++){
                    if(grid[i][j] && i-1 >= 0){
                        if (grid[i-1][j] == grid[i][j]){
                            grid[i-1][j] *= 2;
                            grid[i][j] = null;
                            moved = true;
                        }
                        else if (!grid[i-1][j]){
                            grid[i-1][j] = grid[i][j];
                            grid[i][j] = null;
                            i-=2;
                            moved = true;
                        }
                    }
                }
            }
            keyVals[2]++;
            break;
        case "right":
            for(let i = N-1; i >= 0; i--){
                for (let j = N-2; j >= 0; j--){
                    if(grid[i][j] && j+1 < N){
                        if (grid[i][j+1] == grid[i][j]){
                            grid[i][j+1] *= 2;
                            grid[i][j] = null;
                            moved = true;
                        }
                        else if (!grid[i][j+1]){
                            grid[i][j+1] = grid[i][j];
                            grid[i][j] = null;
                            j+=2;
                            moved = true;
                        }
                    }
                }
            }
            keyVals[3]++;
            break;         
    }
    if(!coolDown && moved){
        updateGrid();
        placeNew();
    }  
    checkFull();
    printGrid();
    updateGrid();
}

/*
 * getScore() - returns score
 */
function getScore(){
    return score;
}

/*
 * checkFull() - checks if the grid is full, calls endGame() if full
 * (THIS IS AN INVALID WAY TO TEST IF THE GAME IS OVER BUT I RAN OUT OF TIME)
 */
function checkFull(){
    let avail = 0;
    for(let i = 0; i < N; i++){
        for(let j = 0; j < N; j++){
            if(!grid[i][j])
                avail++;
        }
    }

    if(avail < 1){
        endGame();
        return 0;
    }
    else if(avail > 2)
        return 2;
    else 
        return 1;
}

/*
 * placeNew() - places new cells 2 or 4 at random locations every
 * time cells are moved
 */
function placeNew(){
    coolDown = true;
    let newSlots = checkFull();
    while(newSlots > 0){
        let randPos = [Math.floor(Math.random()*N), 
                       Math.floor(Math.random()*N)];
        let val = Math.floor(Math.random()*2+1);
        if(!grid[randPos[0]][randPos[1]]){
            grid[randPos[0]][randPos[1]] = val*2;
            newSlots--;
            score+=val*2;
            document.getElementById('score').innerHTML = "<p>Score: "+score+"</p>";
        }
    }
}

/*
 * printGrid() - for debug purposes, prints grid to console
 */
function printGrid(){
    console.clear();
    for(let i = 0; i < N; i++){
        let string = i+" ";
        for(let j = 0; j < N; j++){
            if(grid[i][j])
                string += "   ";
            string += grid[i][j] + " ";
        }
        console.log(string);
    }
}

/*
 * updateGrid() - renders new grid with updated values to the page
 */
function updateGrid(){
    let cells = document.getElementsByClassName('gridCell');
    let j = 0, k = 0;
    for(let i = 0; i < N*N; i++){
        cells[i].classList = ["gridCell"];
        cells[i].classList.add("val"+grid[j][k]);
        cells[i].innerHTML = ""+grid[j][k++];
        if(!grid[j][k-1]){
            cells[i].innerHTML = "-";
        }
        if(k >= N){
            k = 0;
            j++;
        }
    }
}

/*
 * endGame() - displays the game over modal
 * Key press values are commented out because I didn't look into visualizing them :(
 */
function endGame(){
    //if(!done)
    //    document.getElementById('keyData').innerHTML = "S: "+keyVals[0]+
    //                                            "<br/>A: "+keyVals[1]+
    //                                            "<br/>W: "+keyVals[2]+
    //                                            "<br/>D: "+keyVals[3];
    done = true;
    modal.style.display = "block";                                            
}

/*
 * rankScores(scoreArr) - assigns appropriate ranks
 */
function rankScores(scoreArr){
    for(let i = 0; i < scoreArr.length; i++){
        scoreArr[i][2] = (i+1).toString();
    }
    return scoreArr;
}

/*
 * compare(a, b) - sorting algorithm to sort scores highest to lowest
 */
function compare(a, b) {
    const scoreA = parseInt(a[0]);
    const scoreB = parseInt(b[0]);
  
    let comparison = 0;
    if (scoreA > scoreB) {
      comparison = -1;
    } else if (scoreA < scoreB) {
      comparison = 1;
    }
    return comparison;
}

/*
 * updateScores(scores) - parses GET response from server to populate scoreArr
 * sorts scoreArr and re-ranks it before rendering to page
 */
function updateScores(scores){
    let scoreboard = document.getElementById('scoreboard'),
        scoreArr = [],
        ct = 0;

    scoreboard.innerHTML = "<thead><td class='tRank'>Rank</td><td class='tName'>Name</td><td class='tScore'>Score</td><td class='tDelete'>Delete</td></thead><tbody>"

    while(scores.length > 1){
        scoreArr[ct] = scores.substring(0, scores.indexOf(';')).split(',');
        scores = scores.substring(scores.indexOf(';')+1);
        ct++;
    }

    scoreArr.sort(compare);
    scoreArr = rankScores(scoreArr);

    for(let i = 0; i < scoreArr.length; i++){
        scoreboard.childNodes[1].innerHTML += "<tr><td class='tRank'>"+scoreArr[i][2]+"</td><td class='tName'>"+scoreArr[i][1]+"</td><td class=tScore'>"+scoreArr[i][0]+"</td><td class='tDelete'><span class='deleteItem' id=rank"+scoreArr[i][2]+">&times;</span></td></tr>"
    }
}
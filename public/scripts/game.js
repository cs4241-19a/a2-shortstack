const N = 5;
let score = 0;
let grid = [N];
let placedNew = false;

function setUpGame(){
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
    placeNew();
    placedNew = false;
    updateGrid();

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
            placedNew = false;
    }
}

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
            break;         
    }
    if(!placedNew && moved){
        placeNew();
    }  
    printGrid();
    updateGrid();
}

function placeNew(){
    let avail = 0;
    for(let i = 0; i < N; i++){
        for(let j = 0; j < N; j++){
            if(!grid[i][j])
                avail++;
        }
    }

    if(avail < 1){
        GAMEOVER = true;
        return false;
    }
    if(avail > 2)
        avail = 2;

    placedNew = true;
    let newSlots = avail;
    while(newSlots > 0){
        let randPos = [Math.floor(Math.random()*N), 
                       Math.floor(Math.random()*N)];
        let val = Math.floor(Math.random()*2+1);
        if(!grid[randPos[0]][randPos[1]]){
            grid[randPos[0]][randPos[1]] = val*2;
            newSlots--;
            score+=val*2;
            document.getElementById('score').innerHTML = "Score: "+score;
        }
    }
}

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

function updateGrid(){
    let cells = document.getElementsByClassName('gridCell');
    let j = 0, k = 0;
    for(let i = 0; i < N*N; i++){
        cells[i].innerHTML = ""+grid[j][k++];
        if(!grid[j][k-1])
            cells[i].innerHTML = "-";
        if(k >= N){
            k = 0;
            j++;
        }
    }
}
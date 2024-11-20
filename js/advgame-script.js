const totalCells=1275;
let cells=[];
let gameGrid=document.querySelector('.game-grid');
const xinitial=-25;const yinitial=12;
let x=xinitial;let y=yinitial;
let spawnpoint="0/0";
let playerisdead=false;
let walls_test=[
    "8/9","9/9","10/9","11/9","12/9","13/9","14/9",
    "8/8","9/8","10/8","11/8","12/8","13/8","14/8",
    "8/7","9/7","10/7","11/7","12/7","13/7","14/7",
    "8/6","9/6","10/6","11/6","12/6","13/6","14/6",
    ];
let lava_test=[
    "8/-9","9/-9","10/-9","11/-9","12/-9","13/-9","14/-9",
    "8/-8","9/-8","10/-8","11/-8","12/-8","13/-8","14/-8",
    "8/-7","9/-7","10/-7","11/-7","12/-7","13/-7","14/-7",
    "8/-6","9/-6","10/-6","11/-6","12/-6","13/-6","14/-6",
    ];
let door_test=[
    "-16/9","-15/9","-14/9","-13/9","-12/9","-11/9","-10/9","-9/9","-8/9",
    "-16/8","-8/8",
    "-16/7","-8/7",
    "-16/6","-8/6",
    "-16/5","-8/5",
    "-16/4","-15/4","-14/4","-13/4","-12/4","-11/4","-10/4","-9/4","-8/4"
    ];

window.onload=function(){
    //TESTING
    //Generate cells
    genCells();
    // Locate player on the grid
    let playerLocation=spawnpoint;
    locatePlayer(playerLocation);
    // Generate walls on the grid
    genWalls();
    // Generate lava on the grid
    genLava();
    // Generate door
    genDoor();
}

// Function to generate the grid cells
function genCells(){
    for(i=0;i<totalCells;i++){
        let div=document.createElement('div');
        div.classList.add('cell');
        // Add XY position
        div.id=x+"/"+y;
        cells.push(div);
        // Show cell on the screen
        gameGrid.append(cells[i]);
        // If X gets to the final element of the row
        if(x===25){
            // Reset X position
            x=xinitial;
            // Decrease Y position by 1
            y--;
        // If not
        }else{
            // Increment X position by 1
            x++;
        }
    }
}

// Generate walls on the grid
function genWalls(){
    for(i=0;i<walls_test.length;i++){
        let celltowall=document.getElementById(walls_test[i]);
        // Remove cell class as it won't be a walkable cell
        celltowall.classList.remove('cell');
        // Add wall class to the cell
        celltowall.classList.add('wall');
    }
}

// Generate lava on the grid
function genLava(){
    for(i=0;i<lava_test.length;i++){
        let celltolava=document.getElementById(lava_test[i]);
        // Remove cell class as it won't be a walkable cell
        celltolava.classList.remove('cell');
        // Add lava class to the cell
        celltolava.classList.add('lava');
    }
}

// Generate door and it's button on the grid
function genDoor(){
    for(i=0;i<door_test.length;i++){
        let celltodoor=document.getElementById(door_test[i]);
        // Remove cell class as it won't be a walkable cell
        celltodoor.classList.remove('cell');
        // Add door class to the cell
        celltodoor.classList.add('door');
    }
    let celltobutton=document.getElementById("-8/-6");
    // Remove cell class as it is different than a walkable cell
    celltobutton.classList.remove('cell');
    // Add door-button class to the cell
    celltobutton.classList.add('door-button');
}
// FUNCTION TO LOCATE PLAYER ON THE GRID
function locatePlayer(given){
    let playercell=document.getElementById(given);
    if(playercell.classList.contains('door-button')){
        playercell.classList.remove('door-button');
        openDoor();
    }else{
        playercell.classList.remove('cell');
    }
    playercell.classList.add('player');
}

// FUNCTION FOR WHEN USER PRESSES A WASD KEY
document.body.addEventListener("keydown", (control)=>{
    if(playerisdead){
        return;
    }
    // Validator of next position to false
    let canmove=false;
    // Execute when one of these keys are pressed
    if(control.key=='w' || control.key=='a' || control.key=='s' || control.key=='d' || control.key=='W' || control.key=='A' || control.key=='S' || control.key=='D'){
        // Read current position of the player
        let player=document.getElementsByClassName('player')[0];
        position=player.id.split("/"); //["X","Y"]
        x=parseInt(position[0]);
        y=parseInt(position[1]);
        let futurepos;
        switch(control.key){
            // Move up
            case 'w': case 'W':
                // Get future position incrementing Y by one
                futurepos=document.getElementById(x+"/"+(y+1));
                // Player's block doesn't move if the future position is not valid
                if(verifyFuturePosition(futurepos)){
                    // Validator of the next position is true
                    canmove=true;
                }else{
                    canmove=false;
                }
                break;
            // Move down
            case 's':case 'S':
                // Get future position decreasing Y by one
                futurepos=document.getElementById(x+"/"+(y-1));
                // Player's block doesn't move if the future position is not valid
                if(verifyFuturePosition(futurepos)){
                    // Validator of the next position is true
                    canmove=true;
                }else{
                    canmove=false;
                }
                break;
            // Move left
            case 'a':case 'A':
                // Get future position decreasing X by one
                futurepos=document.getElementById((x-1)+"/"+y);
                // Player's block doesn't move if the future position is not valid
                if(verifyFuturePosition(futurepos)){
                    // Validator of the next position is true
                    canmove=true;
                }else{
                    canmove=false;
                }
                break;
            // Move right
            case 'd': case 'D':
                // Get future position incrementing X by one
                futurepos=document.getElementById((x+1)+"/"+y);
                // Player's block doesn't move if the future position is not valid
                if(verifyFuturePosition(futurepos)){
                    // Validator of the next position is true
                    canmove=true;
                }else{
                    canmove=false;
                }
                break;
        }
        if(!canmove){
            return;
        }
        // Remove player from current cell
        player.classList.remove('player');
        // Add cell to that cell
        player.classList.add('cell');
        // Locate player on it's future position
        locatePlayer(futurepos.id);
        // Locate player on spawn point if they're 'dead'
        playerDies(futurepos.id);
    }
});

//FUNCTION THAT VERIFIES NEXT POSITION
function verifyFuturePosition(futurepos){
    // Walk to the future position if it's not null, wall or a door
    if(futurepos!=null && !futurepos.classList.contains('wall') && !futurepos.classList.contains('door')){
        // Change state of player is dead to true if the cell they move to is not a walkable one
        if(!futurepos.classList.contains('cell') && !futurepos.classList.contains('door-button')){
            playerisdead=true;
        }
        return true;
    }else{
        return false;
    }
}

// FUNCTION THAT SPAWNS PLAYER ON IT'S SPAWN POINT EVERYTIME THEY WALK INTO A 'DEATH' CELL
function playerDies(given){
    // Execute if player is dead
    if(playerisdead){
        let player=document.getElementById(given);
        setTimeout(()=>{
            // Remove player from it's position
            player.classList.remove('player');
            // Relocate player on it's spawnpoint
            locatePlayer(spawnpoint);
            // Change it's state to false
            playerisdead=false;
        },400);
    }
}

// FUNCTION THAT CAN OPEN DOORS
function openDoor(){
    for(i=0;i<door_test.length;i++){
        let openthisdoor=document.getElementById(door_test[i]);
        openthisdoor.classList.remove('door');
        openthisdoor.classList.add('cell');
    }
}
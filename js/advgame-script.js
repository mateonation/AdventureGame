const totalCells=1275;
let cells=[];
let gameGrid=document.querySelector('.game-grid');
const xinitial=-25;const yinitial=12;
let x=xinitial;let y=yinitial;
let spawnpoint="0/0";
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

window.onload=function(){
    //Generate cells
    genCells();
    // Locate player on the grid
    let playerLocation=spawnpoint;
    locatePlayer(playerLocation);
    // Generate walls on the grid
    genWalls();
    // Generate lava on the grid
    genLava();
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

function genLava(){
    for(i=0;i<lava_test.length;i++){
        let celltolava=document.getElementById(lava_test[i]);
        // Remove cell class as it won't be a walkable cell
        celltolava.classList.remove('cell');
        // Add wall class to the cell
        celltolava.classList.add('lava');
    }
}

// FUNCTION TO LOCATE PLAYER ON THE GRID
function locatePlayer(given){
    let playercell=document.getElementById(given);
    playercell.classList.remove('cell');
    playercell.classList.add('player');
}

// FUNCTION FOR WHEN USER PRESSES A WASD KEY
document.body.addEventListener("keydown", (control)=>{
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
        // Relocating player by using the future position id
        locatePlayer(futurepos.id);
    }
});

//FUNCTION THAT VERIFIES NEXT POSITION
function verifyFuturePosition(futurepos){
    if(futurepos!=null && futurepos.classList.contains('cell')){
        return true;
    }else{
        return false;
    }
}
const totalCells=1275;
let cells=[];
let gameGrid=document.querySelector('.game-grid');
const xinitial=-25;const yinitial=12;
let x=xinitial;let y=yinitial;
playerLocation="0/0";
let walls_1=[
    "10/7","10/8","10/9",
    "9/7","9/8","9/9",
    "8/7","8/8","8/9"
    ];

window.onload=function(){
    //Generate cells
    genCells();
    // Locate player on the grid
    locatePlayer();
    // Generate walls on the grid
    genWalls();
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
    for(i=0;i<walls_1.length;i++){
        let celltowall=document.getElementById(walls_1[i]);
        celltowall.classList.remove('cell')
        celltowall.classList.add('wall');
    }
}

// FUNCTION TO LOCATE PLAYER ON THE GRID
function locatePlayer(){
    let playercell=document.getElementById(playerLocation);
    playercell.classList.add('player');
}

// FUNCTION FOR WHEN USER PRESSES A WASD KEY
document.body.addEventListener("keydown", (control)=>{
    // Validator of next position to false
    let canmove=false;
    // Execute when one of these keys are pressed
    if(control.key=='w' || control.key=='a' || control.key=='s' || control.key=='d'){
        // Read current position of the player
        let player=document.getElementById(playerLocation);
        position=player.id.split("/"); //["X","Y"]
        x=position[0];
        y=position[1];
        switch(control.key){
            // Move up
            case 'w':
                // Does not move if it can surpass Y positive axis
                if(y!=yinitial){
                    y++;
                    // Validator of the next position is true
                    canmove=true;
                }else{
                    canmove=false
                }
                break;
            // Move down
            case 's':
                // Does not move if it can surpass Y negative axis
                if(y!=yinitial*-1){
                    y--;
                    // Validator of the next position is true
                    canmove=true;
                }else{
                    canmove=false
                }
                break;
            // Move left
            case 'a':
                // Does not move if it can surpass X negative axis
                if(x!=xinitial){
                    x--;
                    // Validator of the next position is true
                    canmove=true;
                }else{
                    canmove=false
                }
                break;
            // Move right
            case 'd':
                // Does not move if it can surpass X positive axis
                if(x!=xinitial*-1){
                    x++;
                    // Validator of the next position is true
                    canmove=true;
                }else{
                    canmove=false
                }
                break;
        }
        // Does not move if the next position validator is false
        if(!canmove){
            return;
        }
        playerLocation=x+"/"+y;
        player.classList.remove('player');
        locatePlayer();
    }
});
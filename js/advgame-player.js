let playerisdead=false;
// FUNCTION TO LOCATE PLAYER ON THE GRID EVERY TIME THEY MOVE OR SPAWN
function locatePlayer(given){
    // Create variable for player's block
    let playercell=document.getElementById(given);
    // If the next tile is a door button, it activates the door opening function
    if(playercell.classList.contains('door-button')){
        playercell.classList.remove('door-button');
        // Open the doors of the grid
        openDoor();
    }else{
        // Remove 'ground' class from the tile the player is going to be
        playercell.classList.remove('ground');
    }
    // Placing 'player' class on the tile
    playercell.classList.add('player');
    // If the player reaches the goal, show alert (WIP - HERE IS WHERE THE NEXT LEVEL WOULD BE TRIGGERED)
    if(playercell.classList.contains('goal')){
        alert('!!you have succesfully completed level '+level+'!!');
    }
}

// FUNCTION FOR WHEN USER PRESSES A WASD KEY
document.body.addEventListener("keydown", (control)=>{
    if(playerisdead){
        return;
    }
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
                break;
            // Move down
            case 's':case 'S':
                // Get future position decreasing Y by one
                futurepos=document.getElementById(x+"/"+(y-1));
                break;
            // Move left
            case 'a':case 'A':
                // Get future position decreasing X by one
                futurepos=document.getElementById((x-1)+"/"+y);
                break;
            // Move right
            case 'd': case 'D':
                // Get future position incrementing X by one
                futurepos=document.getElementById((x+1)+"/"+y);
                break;
        }
        // Player's block doesn't move if the future position is not valid
        if(verifyFuturePosition(futurepos)){
            // Player's block can be moved to the future position
            // Remove player from current cell
            player.classList.remove('player');
            // Add 'ground' to that tile
            player.classList.add('ground');
            // Locate player on it's future position
            locatePlayer(futurepos.id);
            // Locate player on spawn point if they're 'dead'
            playerDies(futurepos.id);
            return;
        }else{
            // Player's block does not move 'cuz the future position is not valid
            return;
        }
    }
});

//FUNCTION THAT VERIFIES NEXT POSITION
function verifyFuturePosition(futurepos){
    // Walk to the future position if it's not null, wall or a door
    if(futurepos!=null && !futurepos.classList.contains('wall') && !futurepos.classList.contains('door')){
        // Change state of player is dead to true if the cell they move to is not a walkable one
        if(!futurepos.classList.contains('ground') && !futurepos.classList.contains('door-button') && !futurepos.classList.contains('goal')){
            playerisdead=true;
        }
        return true;
    }else{
        return false;
    }
}

// FUNCTION THAT SPAWNS PLAYER ON IT'S SPAWN POINT EVERYTIME THEY WALK INTO A 'DEATH' TILE
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

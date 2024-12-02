let playerisdead=false;
let futurecellfirstclass="ground";

// FUNCTION TO LOCATE PLAYER ON THE GRID EVERY TIME THEY MOVE OR SPAWN
function locatePlayer(given){
    // Get the player block's position by the id given
    let playercell=document.getElementById(given);
    // Scenario for when the player is actually 'dead' or the future cell was lava: change the future cell first class to ground
    if(playerisdead || futurecellfirstclass==='lava'){
        futurecellfirstclass="ground";
    }
    // If the future position is a door button:
    if(futurecellfirstclass==='door-button'){
        // Open door if it's closed
        if(doorclosed){
            openDoor();
        // Hide bridge if it's being showed
        }else{
            closeDoor();
        }
    // If the future position is a bridge button:
    }else if(futurecellfirstclass==='bridge-button'){
        // Show bridge if it's hiding
        if(bridgehiding){
            deployBridge();
        // Hide bridge if it's being showed
        }else{
            hideBridge();
        }
    }else if(futurecellfirstclass==='goal'){
        alert('Congrats! you surpassed level '+level)
    }
    playercell.classList.remove(futurecellfirstclass);
    // Placing 'player' class on the tile
    playercell.classList.add('player');
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
            player.classList.add(futurecellfirstclass);
            // Save the first class of the future tile to add it later when the player moves again
            futurecellfirstclass=futurepos.classList.item(0);
            // Locate player on it's future position
            locatePlayer(futurepos.id);
            // Locate player on spawn point if they're 'dead'
            if(playerisdead){
                playerDies(futurepos.id);
            }
            return;
        }else{
            // Player's block does not move 'cuz the future position is a wall, door or not valid
            return;
        }
    }
});

//FUNCTION THAT VERIFIES NEXT POSITION
function verifyFuturePosition(futurepos){
    // Player does not walk if the next tile is null or one of the next elements
    if(futurepos===null || futurepos.classList.contains('wall') || futurepos.classList.contains('door')){
        return false;
    }else{
        // Change state of 'player is dead' to true if the cell they move to is not a death one
        if(futurepos.classList.contains('lava')){
            playerisdead=true;
        }
        return true;
    }
}

// FUNCTION THAT SPAWNS PLAYER ON IT'S SPAWN POINT EVERYTIME THEY WALK INTO A 'DEATH' TILE
function playerDies(given){
    let player=document.getElementById(given);
    setTimeout(()=>{
        // Remove player from it's position
        player.classList.remove('player');
        // Relocate player on it's spawnpoint
        locatePlayer(spawnpoint);
        // Close door and hide bridges (if they were opened or shown)
        if(!bridgehiding){
            hideBridge();
        }
        if(!doorclosed){
            closeDoor();
        }
        // Change it's state to false
        playerisdead=false;
    },400);
}
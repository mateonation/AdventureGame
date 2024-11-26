let tiles=[];
let gameGrid=document.querySelector('.game-grid');
const xinitial=-25;const yinitial=12;
let x;let y;
let doorclosed=true;let bridgehiding=true;

// DEFINE ELEMENTS FROM EACH LEVEL
let level=0;
let spawnpoint="";
let goal="";
let doorbutton="";
let bridgebutton="";
let wall=[];
let lava=[];
let door=[];
let bridge=[];

// EXECUTE WHEN OPENING THE WINDOW
window.onload=function(){
    //Generate game
    genGame();
}

// Function to generate the grid tiles
function genGame(){
    bridge_savedEl=[];tiles=[];
    doorclosed=true;bridgehiding=true;
    // Set initial variables for x and y before generating tiles
    x=xinitial;
    y=yinitial;
    for(i=0;i<1275;i++){
        let div=document.createElement('div');
        // Add XY position
        div.id=x+"/"+y;
        // Add a class to the div according to the level's number
        div=modifyTileForEachLevel(div,level);
        // Push it to the tiles' array
        tiles.push(div);
        // Show tile on the screen
        gameGrid.append(tiles[i]);
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
    // After generating all the tiles, locate player's block with the level's spawnpoint
    locatePlayer(spawnpoint);
    // Show level's number on the bottom section of the page
    let bottomsection=document.getElementsByClassName('bottom-screen')[0];
    bottomsection.textContent='LEVEL: '+level;
}

// Function to edit tiles according to the actual level
function modifyTileForEachLevel(tile,levelnum){
    spawnpoint="";
    goal="";
    doorbutton="";
    bridgebutton="";
    wall=[];
    lava=[];
    door=[];
    bridge=[];
    switch(levelnum){
        // If level number is not included in this switch => it only generates tiles
        default:
            break;
        // Level 0
        case 0:
            // ALL ELEMENTS OF THE LEVEL SHOULD BE WRITTEN HERE
            wall=[
                "8/9","9/9","10/9","11/9","12/9","13/9","14/9",
                "8/8","9/8","10/8","11/8","12/8","13/8","14/8",
                "8/7","9/7","10/7","11/7","12/7","13/7","14/7",
                "8/6","9/6","10/6","11/6","12/6","13/6","14/6",
                ];
            lava=[
                "8/-9","9/-9","10/-9","11/-9","12/-9","13/-9","14/-9",
                "8/-8","9/-8","10/-8","11/-8","12/-8","13/-8","14/-8",
                "8/-7","9/-7","10/-7","11/-7","12/-7","13/-7","14/-7",
                "8/-6","9/-6","10/-6","11/-6","12/-6","13/-6","14/-6",
                ];
            door=[
                "-16/9","-15/9","-14/9","-13/9","-12/9","-11/9","-10/9","-9/9","-8/9",
                "-16/8","-8/8",
                "-16/7","-8/7",
                "-16/6","-8/6",
                "-16/5","-8/5",
                "-16/4","-15/4","-14/4","-13/4","-12/4","-11/4","-10/4","-9/4","-8/4"
                ];
            bridge=["10/9","11/9","12/9","10/8","11/8","12/8","10/7","11/7","12/7","10/6","11/6","12/6","10/-6","11/-6","12/-6","10/-7","11/-7","12/-7","10/-8","11/-8","12/-8","10/-9","11/-9","12/-9"];
                spawnpoint="0/-9";
                doorbutton="-8/-6";
                goal="-10/7";
                bridgebutton="6/-9";
            break;
        case 1:
            wall=["-3/9","-2/9","-1/9","0/9","1/9","2/9","3/9","-4/8","-4/7","-1/7","0/7","1/7","2/7","3/7","17/7","18/7","19/7","-4/6","-2/6","3/6","16/6","20/6","-4/5","-2/5","3/5","16/5","20/5","-4/4","-2/4","3/4","8/4","9/4","10/4","11/4","12/4","16/4","20/4","-4/3","-2/3","3/3","7/3","13/3","16/3","20/3","-4/2","-2/2","3/2","7/2","13/2","16/2","19/2","-3/1","3/1","7/1","10/1","13/1","14/1","15/1","16/1","18/1","20/1","-12/0","-11/0","-10/0","3/0","7/0","10/0","18/0","20/0","-13/-1","-9/-1","-6/-1","3/-1","7/-1","10/-1","13/-1","14/-1","18/-1","20/-1","-13/-2","-9/-2","-6/-2","3/-2","7/-2","11/-2","12/-2","15/-2","18/-2","20/-2","-8/-3","-7/-3","-2/-3","-1/-3","0/-3","1/-3","2/-3","7/-3","13/-3","15/-3","18/-3","20/-3","-9/-4","-6/-4","7/-4","10/-4","13/-4","15/-4","18/-4","20/-4","-9/-5","-6/-5","2/-5","3/-5","4/-5","5/-5","6/-5","10/-5","13/-5","15/-5","18/-5","20/-5","-9/-6","-6/-6","0/-6","1/-6","10/-6","13/-6","15/-6","17/-6","20/-6","-9/-7","-6/-7","-1/-7","4/-7","5/-7","6/-7","7/-7","8/-7","9/-7","15/-7","20/-7","-10/-8","-9/-8","-6/-8","-5/-8","-1/-8","10/-8","14/-8","19/-8","-11/-9","-4/-9","0/-9","1/-9","2/-9","3/-9","4/-9","5/-9","6/-9","7/-9","11/-9","12/-9","13/-9","19/-9","-11/-10","-4/-10","10/-10","20/-10","21/-10","22/-10","23/-10","24/-10","25/-10","-11/-11","-6/-11","-5/-11","0/-11","1/-11","2/-11","3/-11","4/-11","5/-11","6/-11","7/-11","8/-11","9/-11","-10/-12","-9/-12","-8/-12","-7/-12","-1/-12"];
            lava=["-11/12","-10/12","-9/12","-8/12","-7/12","-6/12","-5/12","-4/12","-3/12","-2/12","-1/12","-23/11","-22/11","-21/11","-20/11","-12/11","-11/11","-10/11","-9/11","-8/11","-7/11","-6/11","-5/11","-4/11","-3/11","-2/11","-1/11","0/11","1/11","-23/10","-22/10","-21/10","-20/10","-14/10","-13/10","-12/10","-11/10","-10/10","-9/10","-8/10","-7/10","-6/10","-5/10","-4/10","-3/10","-2/10","-1/10","0/10","1/10","2/10","3/10","-23/9","-22/9","-21/9","-20/9","-15/9","-14/9","-13/9","-12/9","-11/9","-10/9","-9/9","-8/9","-7/9","-6/9","-5/9","-23/8","-22/8","-21/8","-20/8","-15/8","-14/8","-13/8","-12/8","-11/8","-10/8","-9/8","-8/8","-7/8","-6/8","-5/8","-23/7","-22/7","-21/7","-20/7","-15/7","-14/7","-13/7","-12/7","-11/7","-10/7","-9/7","-8/7","-7/7","-6/7","-5/7","-23/6","-22/6","-21/6","-20/6","-15/6","-14/6","-13/6","-12/6","-11/6","-10/6","-9/6","-8/6","-7/6","-6/6","-5/6","-23/5","-22/5","-21/5","-20/5","-15/5","-14/5","-13/5","-12/5","-11/5","-10/5","-9/5","-8/5","-7/5","-6/5","-5/5","-23/4","-22/4","-21/4","-20/4","-14/4","-13/4","-12/4","-11/4","-10/4","-9/4","-8/4","-23/3","-22/3","-21/3","-20/3","-23/2","-22/2","-21/2","-20/2","-23/1","-22/1","-21/1","-20/1","-23/0","-22/0","-21/0","-20/0","-23/-1","-22/-1","-21/-1","-20/-1","-23/-2","-22/-2","-21/-2","-20/-2","-11/-2","-23/-3","-22/-3","-21/-3","-20/-3","-12/-3","-11/-3","-23/-4","-22/-4","-21/-4","-20/-4","-16/-4","-15/-4","-12/-4","-11/-4","-23/-5","-22/-5","-21/-5","-20/-5","-17/-5","-16/-5","-15/-5","-14/-5","-12/-5","-11/-5","-23/-6","-22/-6","-21/-6","-20/-6","-18/-6","-17/-6","-16/-6","-15/-6","-14/-6","-13/-6","-12/-6","-23/-7","-22/-7","-21/-7","-20/-7","-19/-7","-18/-7","-17/-7","-16/-7","-15/-7","-14/-7","-13/-7","-23/-8","-22/-8","-21/-8","-20/-8","-19/-8","-18/-8","-17/-8","-16/-8","-15/-8","-14/-8","-13/-8","-23/-9","-22/-9","-21/-9","-20/-9","-19/-9","-18/-9","-17/-9","-16/-9","-15/-9","-14/-9","-23/-10","-22/-10","-21/-10","-20/-10","-19/-10","-18/-10","-17/-10","-16/-10","-15/-10","-23/-11","-22/-11","-21/-11","-20/-11","-19/-11","-18/-11","-17/-11","-16/-11","-15/-11"];
            door=["10/12","10/11","10/10","10/9","10/8","10/7","10/6","7/5","8/5","9/5","10/5","4/4","5/4","6/4","7/4","8/1","9/1"];
            spawnpoint="-5/-12";
            goal="25/-12";
            doorbutton="-12/-2";
            break;
    }
    // Add 'wall' class to the tile (if it's included on the walls' array associated to it's level)
    if(wall.includes(tile.id)){
        tile.classList.add('wall');
    }
    // Add 'lava' class to the tile (if it's included on the lava's array associated to it's level)
    else if(lava.includes(tile.id)){
        tile.classList.add('lava');
    }
    // Add 'door' class to the tile (if it's included on the door's array associated to it's level)
    else if(door.includes(tile.id)){
        tile.classList.add('door');
    }
    // Add 'door-button' class to the tile (if it's id coincides with the one almacenated on the level number position of the door button's array)
    else if(doorbutton===tile.id){
        tile.classList.add('door-button');
    }else if(bridgebutton===tile.id){
        tile.classList.add('bridge-button');
    }
    // Add 'goal' class to the tile (if it's id coincides with the one almacenated on the level number position of the goal's array)
    else if(goal===tile.id){
        tile.classList.add('goal');
    }
    // Add 'ground' class to the tile if it can be assigned
    else{
        tile.classList.add('ground');
    }
    // If the spawn is null, set the 0/0 generic one
    if(spawnpoint===""){
        spawnpoint="0/0";
    }
    return tile;
}
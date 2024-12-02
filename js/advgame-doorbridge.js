let bridge_savedEl=[];
let doorclosed=true;let bridgehiding=true;

// FUNCTION THAT OPEN DOORS
function openDoor(){
    for(i=0;i<door.length;i++){
        let openthisdoor=document.getElementById(door[i]);
        openthisdoor.classList.remove('door');
        openthisdoor.classList.add('ground');
    }
    doorclosed=false;
}

// FUNCTION THAT OPENS DOORS WITH THE TILES THAT WERE THERE BEFORE IT WAS SHOWED
function closeDoor(){
    for(i=0;i<door.length;i++){
        let closethisdoor=document.getElementById(door[i]);
        let firstclass=closethisdoor.classList.item(0);
        closethisdoor.classList.remove(firstclass);
        closethisdoor.classList.add('door');
    }
    doorclosed=true;
}

// FUNCTION THAT MAKES BRIDGES VISIBLE
function deployBridge(){
    bridge_savedEl=[];
    for(i=0;i<bridge.length;i++){
        let deploythisbridge=document.getElementById(bridge[i]);
        let firstclass=deploythisbridge.classList.item(0);
        deploythisbridge.classList.remove(firstclass);
        bridge_savedEl.push(firstclass);
        deploythisbridge.classList.add('bridge');
    }
    bridgehiding=false;
}

// FUNCTION THAT HIDES BRIDGES WITH THE TILES THAT WERE THERE BEFORE IT WAS SHOWED
function hideBridge(){
    for(i=0;i<bridge.length;i++){
        let hidethisbridge=document.getElementById(bridge[i]);
        hidethisbridge.classList.remove('bridge');
        hidethisbridge.classList.add(bridge_savedEl[i]);
    }
    bridgehiding=true;
}
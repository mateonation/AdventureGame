// FUNCTION THAT OPEN DOORS
function openDoor(){
    for(i=0;i<door.length;i++){
        let openthisdoor=document.getElementById(door[i]);
        openthisdoor.classList.remove('door');
        openthisdoor.classList.add('ground');
    }
}

// FUNCTION THAT MAKES BRIDGES VISIBLE
function deployBridge(){
    for(i=0;i<bridge.length;i++){
        let deploythisbridge=document.getElementById(bridge[i]);
        let firstclass=deploythisbridge.classList.item(0);
        deploythisbridge.classList.remove(firstclass);
        deploythisbridge.classList.add('bridge');
    }
}
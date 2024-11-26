// FUNCTION THAT OPEN DOORS
function openDoor(){
    for(i=0;i<door.length;i++){
        let openthisdoor=document.getElementById(door[i]);
        openthisdoor.classList.remove('door');
        openthisdoor.classList.add('ground');
    }
}
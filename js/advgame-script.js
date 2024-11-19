const totalCells=1250;
let cells=[];
let gameGrid=document.querySelector('.game-grid');
const xinitial=-25;const yinitial=12;
let x=xinitial;let y=yinitial;

window.onload=function(){
    genCells();
}

function genCells(){
    for(i=0;i<totalCells;i++){
        let div=document.createElement('div');
        div.classList.add('cell');
        // Add XY position
        div.id=x+"/"+y;
        cells.push(div);
        // THIS WILL BE DELETED LATER
        // Mark X and Y axis
        div.style.color='white';
        if(x===0){
            div.style.background='blue';
            div.textContent='X';
        }else if(y===0){
            div.style.background='red';
            div.textContent='Y';
        }
        if(x===0 && y===0){
            div.style.background='gold';
            div.textContent='0';
        }

        gameGrid.append(cells[i]);
        // If X gets to the final element of the row
        if(x===(xinitial*-1)-1){
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
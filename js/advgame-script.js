const totalCells=1250;
let cells=[];
let gameGrid=document.querySelector('.game-grid');

window.onload=function(){
    genCells();
}

function genCells(){
    for(i=0;i<totalCells;i++){
        let div=document.createElement('div');
        div.classList.add('cell');
        div.id=i;
        cells.push(div);
        gameGrid.append(cells[i]);
    }
}

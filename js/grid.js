
var gridBackground;
var tileColor;
const gridLocation = document.getElementById('grid-cont');

function setDefaults() {
    //Set color pickers -- has to be hex value
    document.getElementById('background-color').value="#d3d3d3";
    document.getElementById('tile-color').value="#f9f9f9";

    //set grid and tile colors to match pickers - as rgb
    gridBackground=hexToRgb(document.getElementById('background-color').value);  //#d3d3d3
    tileColor=hexToRgb(document.getElementById('tile-color').value);  //#f9f9f9

    //create default grid based on values of input boxes
    buildGrid();
}

function hexToRgb(color) {
    if(color.length == 7) {
        let r = parseInt(color.substr(1,2),16);
        let g = parseInt(color.substr(3,2),16);
        let b = parseInt(color.substr(5,2),16);
        return('rgb('+r+', '+g+', '+b+')');
    } else console.log("bad hex color string");
}

function buildGrid() {
    var newGrid = document.createElement('div');
    var gridHeight=newHeight();
    var gridWidth=newWidth();

    if (gridHeight>25) {
        //set gridheight and grid input box to 50
        gridHeight=25;
        document.getElementById("grht").value=25;
    }

    if (gridWidth>50) {
        //set gridwidth and grid input box to 50
                gridWidth=50;
        document.getElementById("grwd").value=50;
    }

    document.getElementById("grid-box").remove();

    for (var i = 1; i <= (gridHeight * gridWidth); i++) {
        var newDiv = document.createElement('div');
        newDiv.style.backgroundColor=gridBackground;
        newGrid.appendChild(newDiv);
    }

    var newGridWidth=gridWidth*1.067;
    newGrid.id="grid-box";
    newGrid.style.gridTemplateColumns="repeat("+gridWidth+",1em)";
    newGrid.style.width=newGridWidth+"em";
    newGrid.addEventListener('click', toggleTileColor);

    gridLocation.appendChild(newGrid);

    document.getElementById('grid-box')
}


function changeBackgroundColor() {

    var newBkg=hexToRgb(document.getElementById('background-color').value);
    var curBkg;
    var grDivs=document.getElementById('grid-box').children;

    if (gridBackground.length==7) {
        var oldBkg=hexToRgb(gridBackground);
    }   else { var oldBkg=gridBackground;
        }

    for (var i = grDivs.length - 1; i >= 0; i--){
        curBkg=grDivs[i].style.backgroundColor;
        if(curBkg=="" || curBkg==oldBkg) {
            grDivs[i].style.backgroundColor=newBkg;
        }
    }

    gridBackground=newBkg;
}


function toggleTileColor(tile) {

    var curColor = tile.target.style.backgroundColor;

    if(curColor==tileColor) {
        tile.target.style.backgroundColor=gridBackground;
    } else {
        tile.target.style.backgroundColor=tileColor;
    }
}


function setNewTileColor() {tileColor=hexToRgb(document.getElementById('tile-color').value);}

function newHeight() {return(document.getElementById("grht").value);}

function newWidth() {return(document.getElementById("grwd").value);}



document.getElementById("grid-box").addEventListener('click', toggleTileColor);

document.getElementById("myButton").addEventListener('click', buildGrid);

document.getElementById("tile-color").addEventListener('change',setNewTileColor);

document.getElementById("background-color").addEventListener('change',changeBackgroundColor);

document.body.onload=setDefaults();
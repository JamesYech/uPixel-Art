var gridColor;
var tileColor;

function setDefaults() {
    //add listeners
    $('#changeBtn').click(buildGrid);
    $('#color-picker-tile').change(setNewTileColor);
    $('#color-picker-grid').change(changeBackgroundColor);

    //Set color pickers -- has to be hex value
    $('#color-picker-grid').val("#336b87");
    $('#color-picker-tile').val("#f9f9f9");

    //set grid and tile colors to match pickers - as rgb
    gridColor=hexToRgb($('#color-picker-grid').val());  //#d3d3d3
    tileColor=hexToRgb($('#color-picker-tile').val());  //#f9f9f9

    buildGrid();
}

function buildGrid() {
    //create default grid based on values of input boxes
    let gridHeight=newHeight();
    let gridWidth=newWidth();

    //remove old grid-box - build new grid-box
    $('#grid-box').remove();
    $('#grid-cont').append('<div id="grid-box" class="row grid-box"></div>');
    $('#grid-box').css({
                        gridTemplateColumns : "repeat("+gridWidth+",1em",
                        width : gridWidth+"em"
                    });
    $('#grid-box').on('click','div', toggleTileColor);

    //add cells to grid-box
    for (let i = 1; i <= (gridHeight * gridWidth); i++) {
        $('#grid-box').append('<div></div>')
    }

    //set gridColor for all cells
    $('#grid-box').children('div').each(function() {
        $(this).css({backgroundColor: gridColor});
    });
}

function changeBackgroundColor() {
    let newBkg=hexToRgb($('#color-picker-grid').val());
    let oldBkg;

    //set oldBkg and verify in rgb format
    (gridColor.length===7) ? oldBkg=hexToRgb(gridColor) : oldBkg=gridColor;

    $('#grid-box').children('div').each(function() {
        if($(this).css('backgroundColor')==="" || $(this).css('backgroundColor')===oldBkg) {
           $(this).css({backgroundColor: newBkg});
        }
    });

    gridColor=newBkg;
}

function toggleTileColor(tile) {
    ($(this).css("background-color")===tileColor)
        ? $(this).css({backgroundColor: gridColor})
        : $(this).css({backgroundColor: tileColor})
}

function setNewTileColor() {
    tileColor=hexToRgb($('#color-picker-tile').val());
}

function hexToRgb(color) {
    if(color.length === 7) {
        let r = parseInt(color.substr(1,2),16);
        let g = parseInt(color.substr(3,2),16);
        let b = parseInt(color.substr(5,2),16);
        return('rgb('+r+', '+g+', '+b+')');
    }
}

function newHeight() {
    if ($('#grht').val()>25) {
        $('#grht').val(25);
    }
    return ($('#grht').val())
}

function newWidth() {
    if ($('#grwd').val()>50) {
        $('#grwd').val(50);
    }
    return ($('#grwd').val())
}

//this jquery is visually slower than the js line
//$(document).ready(setDefaults);
document.body.onload=setDefaults();
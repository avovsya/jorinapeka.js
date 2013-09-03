var cellSize = 50,
    cellNumber = 10,
    ctx, canvas,
    field = [],
    prevFieldCell,
    status = '',
    moveSteps = 10, // Each token will move in 10 steps
    animationSpeed = 30;

function getCursorPosition(e) {
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
	x = e.pageX;
	y = e.pageY;
    }
    else {
	x = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
	y = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    fieldX = Math.floor((x/cellSize) % cellNumber);
    fieldY = Math.floor((y/cellSize) % cellNumber);

    return {
        x: x,
        y: y,
        fieldX: fieldX,
        fieldY: fieldY
    };
}

function mouseMove(e) {
    var pos = getCursorPosition(e);

    // highlight cell
    if(prevFieldCell) prevFieldCell.selected = false;
    field[pos.fieldX][pos.fieldY].selected = true;
    prevFieldCell = field[pos.fieldX][pos.fieldY];
}

function mouseDown(e) {
    var pos = getCursorPosition(e);

    var currentFieldCell = field[pos.fieldX][pos.fieldY];

    // Move token if it exists in current cell
    if (status !== 'moving' ) {
        if (currentFieldCell.token) {
            currentFieldCell.token.move();
        }
    }
}

function createField() {
    for (var i = 0; i < cellNumber; i++) {
        field[i] = [];
        for (var j = 0; j < cellNumber; j++) {
            field[i][j] = new FieldCell(i, j);
        }
    }
}

function generateTokens(){
    var direction, rand;
    for(var i = 0; i < cellNumber; i++){
        for(var j = 0; j < cellNumber; j++) {
            rand = Math.floor((Math.random()*5));
            switch(rand){
            case 0: continue;
            case 1: direction = "up";
                break;
            case 2: direction = "down";
                break;
            case 3: direction = "left";
                break;
            case 4: direction = "right";
                break;
            };

            field[i][j].token = new Token(direction);
        }
    }

}


function start() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    createField();
    field[1][2].token = new Token("up");
    field[1][1].token = new Token("right");
    field[8][2].token = new Token("down");
    field[5][4].token = new Token("left");
    // generateTokens();
    drawGrid();

    canvas.addEventListener('mousemove', mouseMove, false);
    canvas.addEventListener('mousedown', mouseDown, false);

    draw();
}

function draw(){
    drawGrid();
    window.setTimeout(draw, animationSpeed);
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < cellNumber; i++) {
        for (var j = 0; j < cellNumber; j++) {
            field[i][j].draw();
        }
    }
}

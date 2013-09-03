function Token(direction){
    this.direction = direction;
}

Token.prototype.move = function() {
    status = 'moving';
    this.status = 'moving';
    this.animationStep = 1;
};

Token.prototype.draw = function (x, y) {

    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";

    if (this.status == 'moving') {
        ctx.strokeStyle = "white";
        ctx.fillStyle = "black";
    }
    var r = cellSize/2 - (cellSize * 0.1);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();

    // direction
    var start, stop;
    switch(this.direction) {
        case 'down': start = 0; stop = Math.PI; break;
        case 'up': start = Math.PI; stop = 2*Math.PI; break;
        case 'left': start = Math.PI/2; stop = Math.PI * 1.5; break;
        case 'right': start = Math.PI * 1.5; stop = Math.PI * 0.5; break;
    }

    ctx.beginPath();
    ctx.arc(x, y, r * 0.7, start, stop);
    ctx.stroke();
};

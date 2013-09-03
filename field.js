function FieldCell(x, y) {
    this.x = x;
    this.y = y;
    this.token = null;
    this.selected = false;
};

FieldCell.prototype.setDestCell = function() {
    // if(this.token.dest) return;
    var dest;

    switch(this.token.direction){
    case "up":
        dest = field[this.x][this.y - 1]; // Destination field cell
        break;
    case "down":
        dest = field[this.x][this.y + 1]; // Destination field cell
        break;
    case "left":
        if ((this.x - 1) < 0) break;
        dest = field[this.x - 1][this.y]; // Destination field cell
        break;
    case "right":
        if ((this.x + 1) > cellNumber-1) break;
        dest = field[this.x + 1][this.y]; // Destination field cell
        break;
    };
    this.token.dest = dest; // Destination field cell
};

FieldCell.prototype.draw = function () {
    var tokenX = (this.x * cellSize) + cellSize/2,
        tokenY = (this.y * cellSize) + cellSize/2;
    var movingDistance = cellSize/moveSteps;
    // draw cell
    ctx.strokeStyle = "gray";
    if(this.selected) ctx.strokeStyle = "red";
    ctx.strokeRect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);

    // draw token
    if(this.token) {
        if (this.token.status === 'moving') {
            if ( this.token.animationStep === moveSteps ) {
                status = 'showing';
                // Stop moving token
                this.token.status = '';

                // if token has destination - initiate moving chain,
                // elsewhere the token is going out of the map
                if(this.token.dest) {
                    if(!this.token.dest.token) {
                        // if destination cell has no token - make
                        // currently moving token to belong to the that cell
                        this.token.dest.token = this.token;
                    }
                    // move token in destination cell
                    this.token.dest.token.move();
                }

                this.token = undefined;
                return;
            } else {
                this.token.animationStep++;
                this.setDestCell();
                switch(this.token.direction){
                    case "up":
                        tokenY -= movingDistance * this.token.animationStep;
                        break;
                    case "down":
                        tokenY += movingDistance * this.token.animationStep;
                        break;
                    case "left":
                        tokenX -= movingDistance * this.token.animationStep;
                        break;
                    case "right":
                        tokenX += movingDistance * this.token.animationStep;
                        break;
                };
            }
        }
        this.token.draw(tokenX, tokenY);
    }
};

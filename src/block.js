

function block() {
    this.x;
    this.y;
    this.width = adjustX(125);
    this.height = adjustY(25);
    this.powerup;
    this.type;
    this.monster;
    this.direction = "right";
    this.moveTime = 10;
    this.textNumber;
    this.passedText = false;




    this.draw = function() {
        if (this.type === "break") {
            ctx.fillStyle = "#00bfff";
        } else if (this.type === "sideways") {
            ctx.fillStyle = "#00bfff";
        } else {
            ctx.fillStyle = "#00bfff";
        }

        if (this.monster === 0) {
            let blockColor = "#00bfff";
            if(this.passedText){
                blockColor = "#0a13ff";
                ctx.fillStyle = "#0a13ff";
            }

            roundedRect(ctx,this.x,this.y,this.width,this.height,adjustX(5),blockColor);
            //ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.font = "bold " + adjustX(20)+ "px BlinkMacSystemFont,'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            let text = "";
            if(this.type === "break"){
                if(this.textNumber >= 0) {
                    text = window.decoyWords[this.textNumber];
                }
            }
            else{
                if(this.textNumber >= 0) {
                    text = window.textWords[this.textNumber];
                }
                //text = this.textNumber;
            }

            ctx.fillText(text,this.x + this.width/2,this.y + ((this.height/5)*4));
        } else {
            monsterFunctions[this.monster].draw(this.x, this.y);
        }

        if (this.powerup === "spring") {
            ctx.fillStyle = "grey";
            ctx.fillRect(this.x + adjustX(35), this.y - adjustY(10), adjustX(30), adjustY(10));
        } else if (this.powerup === "springBoots") {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x + adjustX(35), this.y - adjustY(25), adjustX(15), adjustY(10));
            ctx.fillRect(this.x + adjustX(35), this.y - adjustY(25), adjustX(15), adjustY(10));
            ctx.fillStyle = "grey";
            ctx.fillRect(this.x + adjustX(35), this.y - adjustY(15), adjustX(15), adjustY(15));
            ctx.fillRect(this.x + adjustX(35), this.y - adjustY(15), adjustX(15), adjustY(15));
        }
    }

    this.update = function() {
        if (this.type === "sideways") {
            if (this.x >= screenWidth - this.width) {
                this.direction = "left";
            } else if (this.x <= 0) {
                this.direction = "right";
            }

            if (this.direction === "right") {
                this.x += adjustX(2.5);
            } else {
                this.x -= adjustX(2.5);
            }
        }

        if (this.monster === "smallRed") {
            if (this.direction === "right") {
                this.x += adjustX(1);
                this.moveTime -= 1;

                if (this.moveTime === 0) {
                    this.direction = "left";
                    this.moveTime = 10;
                }
            } else {
                this.x -= adjustX(1);
                this.moveTime -= 1;

                if (this.moveTime === 0) {
                    this.direction = "right";
                    this.moveTime = 10;
                }
            }
        }
    }
}



function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.lineTo(x + width - radius, y + height);
    ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
    ctx.lineTo(x + width, y + radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.lineTo(x + radius, y);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.fill();
    ctx.stroke();
}
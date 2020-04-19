

function block() {
    this.x;
    this.y;
    this.width = 125;
    this.height = 25;
    this.powerup;
    this.type;
    this.monster;
    this.direction = "right";
    this.moveTime = 10;
    this.textNumber;




    this.draw = function() {
        if (this.type === "break") {
            ctx.fillStyle = "#00bfff";
        } else if (this.type === "sideways") {
            ctx.fillStyle = "#00bfff";
        } else {
            ctx.fillStyle = "#00bfff";
        }

        if (this.monster === 0) {
            roundedRect(ctx,this.x,this.y,this.width,this.height,5,"#00bfff")
            //ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.font = "bold 20px BlinkMacSystemFont,'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'";
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
            ctx.fillRect(this.x + 35, this.y - 10, 30, 10);
        } else if (this.powerup === "springBoots") {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x + 30, this.y - 25, 15, 10);
            ctx.fillRect(this.x + 53, this.y - 25, 15, 10);  
            ctx.fillStyle = "grey";
            ctx.fillRect(this.x + 30, this.y - 15, 15, 15);
            ctx.fillRect(this.x + 53, this.y - 15, 15, 15);
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
                this.x += 2.5;
            } else {
                this.x -= 2.5;
            }
        }

        if (this.monster === "smallRed") {
            if (this.direction === "right") {
                this.x += 1;
                this.moveTime -= 1;

                if (this.moveTime === 0) {
                    this.direction = "left";
                    this.moveTime = 10;
                }
            } else {
                this.x -= 1;
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
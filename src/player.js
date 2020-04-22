var player = new function() {
    this.x = adjustX(300);
    this.y = adjustY(550);
    this.img = new Image();
    //this.img.src = "Sprites/rightPlayer.png";
    this.img.src = "Sprites/SRHirsch.png";
    this.width = adjustX(80);
    this.height = adjustY(80);
    this.xSpeed = adjustX(6.7);
    this.ySpeed = 0;
    this.springBootsDurability = 0;
    this.direction = "left";

    this.update = function() {
        if (!dead) {
            this.ySpeed += gravity;
            if (this.y <= screen.height / 2 - 200 && this.ySpeed <= 0) {
                for (var i = 0; i < blocks.length; i++) {
                    blocks[i].y -= this.ySpeed;
                }
            } else {
                this.y += this.ySpeed;
            }
            yDistanceTravelled -= this.ySpeed;
        } else {
            ctx.font = "60px Arial";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText("You Died!", screenWidth / 2, screenHeight / 2); 
            ctx.font = "36px Arial";
            ctx.fillText("Press r to restart", screenWidth / 2, (screenHeight / 2) + 50);
        }

        //A key pressed
        if (holdingLeftKey) {
            this.direction = "left";
            //this.img.src = "Sprites/leftPlayer.png";
            this.img.src = "Sprites/SRHirsch.png";
            player.moveLeft();
        }
        //D key pressed 
        if (holdingRightKey) {
            this.direction = "right";
            //this.img.src = "Sprites/rightPlayer.png";
            this.img.src = "Sprites/SRHirsch.png";
            player.moveRight();
        }

        //Check for jump
        for (var i = 0; i < blocks.length; i++) {
            if (this.ySpeed >= 0) {
                if (this.x >= blocks[i].x - this.width + adjustX(15) && this.x <= blocks[i].x + blocks[i].width - adjustX(15) &&
                    this.y >= blocks[i].y - this.height && this.y <= blocks[i].y + blocks[i].height - this.height) {
                    if (blocks[i].type === "break") {
                        blocks[i] = 0;
                    } else if (blocks[i].monster !== 0) {
                        this.jump(blocks[i], i);
                        //blocks[i] = 0;
                        blocks[i].monster = 0;
                    } else {
                        this.jump(blocks[i], i);
                            //    blocks[i].passedText = true;
                    }
                }
            } 
            if (this.y > blocks[i].y) {
                //Check for hit monster
                if (blocks[i].monster !== 0 && blocks[i].monster !== undefined) {
                    if (this.x >= blocks[i].x - this.width + adjustX(27) && this.x <= blocks[i].x + blocks[i].width - adjustX(27) &&
                        this.y >= blocks[i].y - blocks[i].height  && this.y <= blocks[i].y + blocks[i].height) {
                        dead = true;
                    }
                }
            }
        }


        for (let i = blocks.length-1; i > 0; i--) {
            if (blocks[i].y > screenHeight) {
                lowestBlock = i+1;
                break;
            }
        }

        if (this.y >= blocks[lowestBlock].y || this.y >= screenHeight) {
            dead = true;
        }

        if (lowestBlock >= 45) {
            if (difficulty < 0) {
                difficulty += 1;
            }
            blockSpawner();
        }

        // for (let i = 0; i < blocks.length; i++) {
        //     if (blocks[i].y < this.y + this.height) {
        //         break;
        //     }
        //     if(blocks[i].type !== "break") {
        //         blocks[i].passedText = true;
        //     }
        // }
    }
    
    this.jump = function(block,blockIndex) {
        let powerup = block.powerup;
        let type = block.type;
        this.ySpeed =adjustY( -13.2);

        if (powerup === "springBoots") {
            this.springBootsDurability = 6;
        }

        if (powerup === "orb") {
            for (let i = lowestBlock; i < blocks.length; i++) {
                if (blocks[i].y <= this.y + this.height - blocks[i].height) {
                    block.powerup = 0;
                    break;
                }
                if(blocks[i].type !== "break") {
                    blocks[i].passedText = true;
                }
            }

        }
        if (powerup === "laser") {
            let i = blockIndex + 1;
            let count = 0;
            while(count < 5){
                while(blocks[i].type === "break"){
                    i++;
                }
                blocks[i].highlight = true;
                i++;
                count++;
            }
            block.powerup = 0;
        }
        
        if (type === 0) {
            if (powerup === "spring") {
                this.ySpeed = adjustY(-20);
            } 
        }

        if (this.springBootsDurability !== 0) {
            this.ySpeed = adjustY(-20);
            this.springBootsDurability -= 1;
        }
        // for (let i = lowestBlock; i < blocks.length; i++) {
        //     if (blocks[i].y <= this.y + this.height - blocks[i].height) {
        //         break;
        //     }
        //     if(blocks[i].type !== "break") {
        //         blocks[i].passedText = true;
        //     }
        // }
    }

    this.moveLeft = function() {
        this.x -= this.xSpeed;
        if (this.x <= -this.width) {
            this.x = screenWidth;
        }
    }

    this.moveRight = function() {
        this.x += this.xSpeed;
        if (this.x >= screenWidth) {
            this.x = -this.width;
        }
    }

    this.draw = function() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        if (this.springBootsDurability !== 0) {
            if (this.direction === "right") {
                ctx.fillStyle = "blue";
                ctx.fillRect(this.x + adjustX(10), this.y + adjustY(66), adjustX(15), adjustY(10));
                ctx.fillRect(this.x + adjustX(33), this.y + adjustY(66), adjustX(15), adjustY(10));
                ctx.fillStyle = "grey";
                ctx.fillRect(this.x + adjustX(10), this.y + adjustY(76), adjustX(15), adjustY(15));
                ctx.fillRect(this.x + adjustX(33), this.y + adjustY(76), adjustX(15), adjustY(15));
            } else {
                ctx.fillStyle = "blue";
                ctx.fillRect(this.x + adjustX(30), this.y + adjustY(66), adjustX(15), adjustY(10));
                ctx.fillRect(this.x + adjustX(53), this.y + adjustY(66), adjustX(15), adjustY(10));
                ctx.fillStyle = "grey";
                ctx.fillRect(this.x + adjustX(30), this.y + adjustY(76), adjustX(15), adjustY(15));
                ctx.fillRect(this.x + adjustX(53), this.y + adjustY(76), adjustX(15), adjustY(15));
            }
        }
    }
}


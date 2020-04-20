var c = document.createElement("canvas");
var ctx = c.getContext("2d");

c.width = screenWidth;
c.height = screenHeight;
document.body.appendChild(c);

//unclear value////////////////////////////////////////////////
window.addEventListener('keydown',this.keydown,false);
window.addEventListener('keyup',this.keyup,false);
/////////////////////////////////////////////////////////////////

//Variables
var holdingLeftKey = false;
var holdingRightKey = false;
var keycode;
var dead = false;
var difficulty = 0;
var score = 0;
var yDistanceTravelled = 0;


//////////////////////////////////
const gravity = adjustY(0.34);
var lowestBlock = 0;
var blocks = [];
var powerups = [];
/////////////////////////////////////

//Time variables
var fps = 60;//frames per second
var then = Date.now();
var interval = 1000/fps;

////////////
var delta;
var now;
///////////


function keydown(e) {
    //TODO: change to avoid deprication
    if (e.keyCode === 37) {
        holdingLeftKey = true;
    }   else if (e.keyCode === 39) {
        holdingRightKey = true;
    }
    //when game ends, and the press play again, things reset (TODO this should be a self contained function)
    if (e.keyCode === 82 && dead) {
        blocks = [];
        lowestBlock = 0;
        difficulty = 0;
        score = 0;
        yDistanceTravelled = 0;

        ////////////////////////////////////
        player.springBootsDurability = 0;
        ////////////////////////////////////

        blocks.push(new block);
        blocks[0].x = adjustX(300);
        blocks[0].y = adjustY(650);
        blocks[0].monster = 0;
        blocks[0].type = 0;
        blocks[0].powerup = 0;

        blockSpawner();

        player.x = adjustX(300);
        player.y = adjustY(550);


        dead = false;
    }
}

function keyup(e) {
    if (e.keyCode === 37) {
        holdingLeftKey = false;
    } else if (e.keyCode === 39) {
        holdingRightKey = false;
    }
}

//score is a function of height reached
function showScore() {
    if (yDistanceTravelled > score) {
        score = Math.round(yDistanceTravelled);
    }
    //TODO: change this
    ctx.font = "bold 36px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText(score, 18, 40);
}
//TODO this should be in a funciton, not sure what its doing,
blocks.push(new block);
blocks[0].x = adjustX(300);
blocks[0].y = adjustY(650);
blocks[0].monster = 0;
blocks[0].type = 0;
blocks[0].powerup = 0;
blocks[0].textNumber = -1;


//this is key,
blockSpawner();

function loop() {
    requestAnimationFrame(loop);

    //This sets the FPS to 60
    now = Date.now();
    delta = now - then;
     //if an interval has elapsed, rerender
    if (delta > interval) {
        var backgroundImage = new Image();
        backgroundImage.src = "Sprites/background.png";
        ctx.drawImage(backgroundImage, 0, 0, screenWidth, screenHeight) 

        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i] !== 0) {
                blocks[i].update();
                blocks[i].draw();
            }
        }

        player.update();
        if(!dead){
            player.draw();
        }

        showScore();

        ctx.fill();
        then = now - (delta % interval);
    }
}

loop();

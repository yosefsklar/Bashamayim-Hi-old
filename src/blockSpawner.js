let experiment = adjustY(65);
function blockSpawner() {
    let i;
    if (lowestBlock === 0) {
        i = 1;
    } else {
        i = lowestBlock;
    }

    //blocks are numbered, run it 60 times
    for (i; i < lowestBlock + 60; i++) {
        //if theres room in the blocks array
        if (i >= blocks.length) {
            blocks.push(new block);

            if (blocks[i-1].type === "break") {
                blocks[i].type = 0;
            } else {
                blocks[i].type = spawnBlock();
            }
    
            blocks[i].powerup = 0;
            blocks[i].monster = 0;
            if (blocks[i-1].powerup !== 0 && blocks[i-1].monster !==0) {
                blocks[i].powerup = 0;
                blocks.monster = 0;
            } else if (blocks[i].type === 0) {
                blocks[i].powerup = spawnPowerup();
    
                if (blocks[i].powerup === 0) {
                    //TODO smooth out the hitting the monsters
                   // blocks[i].monster = spawnMonster();
                    blocks[i].monster = 0;
                }
            }
            attributeWordToBlock(blocks[i]);
    
            blocks[i].x = Math.random()*(screenWidth - blocks[i].width);

            //TODO figure out the levels, max jump =~ 260
            if (blocks[i].type === "break" || blocks[i-1].type === "break") {
                blocks[i].y = (blocks[i-1].y) - (((Math.random()*(adjustY(50) + (difficulty * adjustY(10)))) + adjustY(30) + experiment) * (2 / 3));
            } else if (blocks[i].monster !== 0) {
                blocks[i].y = (blocks[i-1].y) - ((Math.random()*(adjustY(80) + (difficulty*adjustY(10))))+adjustY(50) + experiment);
            }  else if (blocks[i-1].monster !== 0) {
                // blocks[i].y = (blocks[i-1].y) - ((Math.random()*(adjustY(80) + (difficulty*adjustY(25))))+adjustY(50) + experiment);
                blocks[i].y = (blocks[i-1].y) - ((Math.random()*(adjustY(20) + (difficulty*adjustY(10)))) +adjustY(20)+ experiment);
            }
            else {
                blocks[i].y = (blocks[i-1].y) - ((Math.random()*(adjustY(45) + (difficulty*adjustY(10))))+adjustY(25) + experiment);

            }
        } 
    }

    //Remove blocks that are below us now
    for (let i = 0; i < lowestBlock - 2; i++) {
        blocks.shift();
    }
}

function attributeWordToBlock(block){
    if(block.type !== "break" && block.monster == 0){
        block.textNumber = textIndex;
        textIndex++;
    }
    else if(block.type === "break"){
        block.textNumber = decoyIndex;
        decoyIndex++;
    }
}
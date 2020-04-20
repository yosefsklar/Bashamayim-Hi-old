function spawnMonster() {
    //TODO
    var monsterChances = {
        "smallRed": 5
    };

    if (Math.round(Math.random() * monsterChances["smallRed"]) === 0) {
        return "smallRed";
    }
    return 0;
}

var smallRed = new function() {
    this.img = new Image();
    this.img.src = "Sprites/Monsters/smallRed.png";
    this.xDif = adjustX(27);
    this.yDif = adjustY(-30);
    this.width = adjustX(69);
    this.height = adjustY(60);

    this.draw = function(blockX, blockY) {
        ctx.drawImage(this.img, blockX + this.xDif, blockY + this.yDif, this.width, this.height);
    }
}

var monsterFunctions = {
    "smallRed": smallRed
}
function spawnPowerup() {
    var powerupChances = {
        "spring": 30,
        "springBoots": 80,
        "orb": 45,
        "laser": 35,
        "flyingHat": 80,
        "rocket": 120
    };

    if (Math.round(Math.random() * powerupChances["spring"]) === 0) {
        return "spring";
    } else if (Math.round(Math.random() * powerupChances["springBoots"]) === 0) {
        return "springBoots";
    } else if(Math.round(Math.random() * powerupChances["orb"]) === 0) {
        return "orb";
    } else if(Math.round(Math.random() * powerupChances["laser"]) === 0) {
        return "laser";
    }
    return 0;
}
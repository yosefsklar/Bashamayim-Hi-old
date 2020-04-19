function spawnBlock() {
    var blockChances = {
        //1 out of every 15 block TODO this is where we will come up with the decoys, probably 1/4,
        "break": 4,
        //not sure what these are-- where are the trampolines?
        "sideways": Math.round(10 / difficulty)
    };

    if (Math.ceil(Math.random() * blockChances["break"]) === blockChances["break"]) {
        return "break";
        //return 0;
    } else if (Math.round(Math.random() * blockChances["sideways"]) === 0) {
        return "sideways";
    }
    return 0;
}

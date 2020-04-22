function spawnBlock() {
    var blockChances = {
        //1 out of every 15 block TODO this is where we will come up with the decoys, probably 1/4,
        "break": 2,
        //not sure what these are-- where are the trampolines?
        "sideways": Math.round(6 / difficulty)
    };

    let rand = Math.random() * blockChances["break"];
    if (Math.ceil(rand) === blockChances["break"] ) {
        return "break";
        //return 0;
    } else if (Math.round(Math.random() * blockChances["sideways"]) === 0) {
        return "sideways";
    }
    return 0;
}

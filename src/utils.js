var screenHeight = window.innerHeight - 50;
var screenWidth = screenHeight * (5/8);

function adjustY(value){
    return (value / 800) * screenHeight;
}
function adjustX(value){
    return (value / 500) * screenWidth;
}
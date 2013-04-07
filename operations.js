// Positions object
var positions = {};

// Operations
exports.update = function(link) {
    var data = link.data;
    var color = data.id.toString().substring(0, 1);
    var idInArray = parseInt(data.id.toString().substring(1));

    if(color === "W") {
        positions.white[idInArray] = { "x" : data.x, "y" : data.y };
    }
    else {
        positions.black[idInArray] = { "x" : data.x, "y" : data.y };
    }

    link.send(200, positions);
};

// Built positions object
exports.setPositions = function(link) {
    positions = link.data;
    link.send(200);
};

// Get positions operations
exports.getPositions = function(link) {
    link.send(200, positions);
};

// Reset the game
exports.resetGame = function(linke) {
    if(link.data === "IonicaBizauMill") {
        positions = {};
        link.send(200, "Refresh page");
    }
    else {
        link.send(200, "Wrong password");
    }
}

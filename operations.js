var send = require(CONFIG.root + "/core/send.js").send;

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

    send.ok(link.res, positions);
};

// Built positions object
exports.setPositions = function(link) {
    positions = link.data;
    send.ok(link.res, "OK");
};

// Get positions operations
exports.getPositions = function(link) {
    send.ok(link.res, positions);
};

// Reset the game
exports.resetGame = function(linke) {
    if(link.data === "IonicaBizauMill") {
        positions = {};
        send.ok(link.res, "Refresh page");
    }
    else {
        send.ok(link.res, "Wrong password");
    }
}

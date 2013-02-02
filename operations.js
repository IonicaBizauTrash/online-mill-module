var send = require(CONFIG.root + "/core/send.js").send;

// Positions object
var positions {};

// Operations
exports.update = function(link) {
   
};

// Built positions object
exports.setPositions = function(link) {
    positions = link.data;
}

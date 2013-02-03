"use strict";

define([
    "/jquery.js",
    "/js/drag.js"
], function () {

    // Global variables
    var self;
    var pieces;
    var xMin = 10, yMin = 70;
    var x, y;
    
    // Positions object
    var positions = {
        "black" : [],
        "white" : []
    };

    // On load
    function init(config) {
        self = this;

        pieces = $("#pieces");
        pieces.html("");

        self.link("getPositions", function(err, pos) {
            console.log(pos);
            // If positions were already set
            if (!$.isEmptyObject(pos)) {
                positions = pos;
                
                var html = "";
                
                for(var i = 0; i < 9; i++) {
                    // Black pieces
                    html += createPiece("black", "B" + i, positions.black[i].x, positions.black[i].y);
                    // White pieces
                    html += createPiece("white", "W" + i, positions.white[i].x, positions.white[i].y);
                }
                
                pieces.append(html);
            }
            // ... if not, create them
            else {
                console.log("False");
                
                createBlackPieces();
                createWhitePieces();

                self.link("setPositions", { data: positions }, function() {
                    console.log(positions);
                });
            }
            
            setHandlers();
            
            window.setInterval(function() {
                console.log("animate");
                animate();
            }, 3000);
        });
    }

    // Animate
    function animate() {
        self.link("getPositions", function(err, pos) {
            positions = pos;
            for (var i = 0; i < 9; i++) {
                $("#B" + i).animate({ left : positions.black[i].x, top : positions.black[i].y }, 200);
                $("#W" + i).animate({ left : positions.white[i].x, top : positions.white[i].y }, 200);
            }
        });
    }

    // Set handlers
    function setHandlers() {
        console.log("setHandlers");
        $(".piece").on("mouseup", function() {
            var id = $(this).attr("id");
            var x = $(this).css("left");
            var y = $(this).css("top");
            update(id, x, y);
        });
        
        $("#resetButton").on("click", function() {
            self.link("resetGame", { data : $("#pass").val() }, function(err, res) {
                if(res === "Refresh page") {
                    location.reload();
                }
                else {
                    $("#pass").val("");
                    alert("Wrong password.");
                }
            });
        });
    }

    // Update the points
    function update(id, x, y) {
        console.log("POS");
        var dataObject = {
            "id" : id,
            "x" : x,
            "y" : y
        };

        self.link("update", { data : dataObject }, function(err, pos) {
            console.log(pos);
        });
    }

    // Functions for creating pieces
    function createBlackPieces(){
        var html = "";
        for(var i = 0; i<9; i++){
            x = xMin + Math.floor(Math.random()*100);
            y = yMin + Math.floor(Math.random()*100);

            positions.black.push({ "x" : x + "px", "y" : y + "px" });

            html += createPiece("black", "B" + i, x, y);
        }
        pieces.append(html);
    }

    function createWhitePieces(){
        var html = "";

        for(var i = 0; i<9; i++){
            x = xMin + 150 + Math.floor(Math.random()*100);
            y = yMin + Math.floor(Math.random()*100);

            positions.white.push({ "x" : x + "px", "y" : y + "px" });

            html += createPiece("white", "W" + i, x, y);
        }
        pieces.append(html);
    }
    
    // Create HTML code for one piece
    function createPiece(color, id, x, y) {
        return "<div id='" + id + "' style='left: " + x + "; top: " + y + ";' class='box content " + color + " piece' onmousedown='dragStart(event)'></div>";
    }
    
    return init;
});

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
        
        CreateBlackCircles();
        CreateWhiteCircles();
        
        setHandlers();
        
        self.link("setPositions", { data: positions }, function() {
            console.log(positions);
        });
        
        window.setInterval(function() {
            animate();
        }, 3000);
    }

    // Animate
    function animate() {
        for (var i = 0; i < 9; i++) {
            $("#B" + i).animate({ left : positions.black[i].x + "px", top : positions.black[i].y + "px" });
            $("#W" + i).animate({ left : positions.white[i].x + "px", top : positions.white[i].y + "px" });
        }
    }

    // Set handlers
    function setHandlers() {
        $(".piece").on("mouseup", function() {
            var id = $(this).attr("id");
            var x = $(this).css("left");
            var y = $(this).css("top");
            update(id, x, y);
        });
    }
    
    // Update the points
    function update(id, x, y) {
        var dataObject = {
            "id" : id,
            "x" : x,
            "y" : y
        };

        self.link("update", { data : dataObject }, function(err, pos) {
            positions = pos;
        });
    }

    // Functions for creating pieces
    function CreateBlackCircles(){
        var html = "";
        for(var i = 0; i<9; i++){
            x = xMin + Math.floor(Math.random()*100);
            y = yMin + Math.floor(Math.random()*100);

            positions.black.push({ "x" : x, "y" : y });
            
            html += "<div id='B" + i + "' style='left: " + x + "px; top: " + y + "px;' class='box content black piece' onmousedown='dragStart(event)'></div>";
        }
        pieces.append(html);
    }

    function CreateWhiteCircles(){
        var html = "";
        
        for(var i = 0; i<9; i++){
            x = xMin + 150 + Math.floor(Math.random()*100);
            y = yMin + Math.floor(Math.random()*100);
            
           positions.white.push({ "x" : x, "y" : y });
            
            html += "<div id='W" + i + "'style='left: " + x + "px; top: " + y + "px;' class='box content white piece' onmousedown='dragStart(event)'></div>";
        }
        pieces.append(html);
    }
    
    return init;
});

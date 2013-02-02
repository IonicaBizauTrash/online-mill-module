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
        "B" : [],
        "W" : []
    };
    
    // On load
    function init(config) {
        self = this;
        
        pieces = $("#pieces");
        pieces.html("");
        CreateBlackCircles();
        CreateWhiteCircles();
    }

    function CreateBlackCircles(){
        var html = "";
        for(var i = 0; i<9; i++){
            x = xMin + Math.floor(Math.random()*100);
            y = yMin + Math.floor(Math.random()*100);

            positions.B.push({ "x" : x, "y" : y });
            
            html += "<div id='B" + i + "' style='left: " + x + "px; top: " + y + "px;' class='box content black' onmousedown='dragStart(event)'></div>";
        }
        pieces.append(html);
    }

    function CreateWhiteCircles(){
        var html = "";
        
        for(var i = 0; i<9; i++){
            x = xMin + 150 + Math.floor(Math.random()*100);
            y = yMin + Math.floor(Math.random()*100);
            
           positions.W.push({ "x" : x, "y" : y });
            
            html += "<div id='W" + i + "'style='left: " + x + "px; top: " + y + "px;' class='box content white' onmousedown='dragStart(event)'></div>";
        }
        pieces.append(html);
    }

    return init;
});

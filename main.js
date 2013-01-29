"use strict";

define([
    "/jquery.js",
    "/js/drag.js"
], function () {

    var self;
    
    function init(config) {
        self = this;
        
        blackCircles = $("#blackCircles");
        blackCircles.html("");
        CreateBlackCircles();
        CreateWhiteCircles();
    }
 
    var blackCircles;
    var whiteCircles;

    function CreateBlackCircles(){
        var x = 10, y = 10;
        var html = ""
        for(var i = 0; i<9; i++){
            x = 10 + Math.floor(Math.random()*100);
            y = 10 + Math.floor(Math.random()*100);
            html += "<div style=\"left: " + x + "px; top: " + y + "px;\" class=\"box content black\" onmousedown=\"dragStart(event)\"></div>";
        }
        blackCircles.html(html);
    }

    function CreateWhiteCircles(){
        var x = 10, y = 10;
        var html = "";
        
        for(var i = 0; i<9; i++){
            x = 120 + Math.floor(Math.random()*100);
            y = 10 + Math.floor(Math.random()*100);
            html += "<div style=\"left: " + x + "px; top: " + y + "px;\" class=\"box content white\" onmousedown=\"dragStart(event)\"></div>";
        }
        blackCircles.html(html);
    }

    return init;
});

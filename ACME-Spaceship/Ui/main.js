/// <reference path="../Scene/renderer.js" />
function init() {
    //CONST
    var screenWidth = 800;
    var screenHeight = 640;

    //INIT
    var canvasEl = document.getElementById("viewport");
    var renderer = new Scene.Renderer(canvasEl);
    var engine = new Scene.Engine(canvasEl.width, canvasEl.height, renderer, null, 30);

    engine.run();
    //EVENTS
    window.addEventListener("keydown", keysPressed, false);
    window.addEventListener("keyup", keysReleased, false);

    var keys = [];
    engine.watchInput(keys);

    //FUNCTIONS
    function keysPressed(e) {
        // store an entry for every key pressed
        keys[e.keyCode] = true;
    }

    function keysReleased(e) {
        // mark keys that were released
        keys[e.keyCode] = false;
    }

    function log(msg) {
        console.log(msg);
    }
}

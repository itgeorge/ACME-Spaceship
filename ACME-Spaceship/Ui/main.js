function init() {
    //CONST
    var screenWidth = 800;
    var screenHeight = 640;

    //INIT
    //var canvasEl = document.getElementById("viewport.js");
    //var canvasContext = canvas.getContext("2d");
    var engine = new Engine(screenWidth, screenHeight);

    //EVENTS
    window.addEventListener("keydown", keysPressed, false);
    window.addEventListener("keyup", keysReleased, false);

    var keys = [];

    //FUNCTIONS
    function keysPressed(e) {
        // store an entry for every key pressed
        keys[e.keyCode] = true;

        //left
        if (keys[37]) {
            engine.PlayerShip.moveLeft();
        }

        //up
        if (keys[38]) {
            engine.PlayerShip.moveUp();
        }

        //right
        if (keys[39]) {
            engine.PlayerShip.moveRight();
        }

        //down
        if (keys[40]) {
            engine.PlayerShip.moveDown();
        }

        //v
        if (keys[86]) {
            engine.PlayerShip.fireLaser();
        }

        //b
        if (keys[66]) {
            engine.PlayerShip.fireSeeker();
        }

        //shapcia
        if (keys[32]) {
            engine.PlayerShip.fireDefaut();
        }
    }

    function keysReleased(e) {
        // mark keys that were released
        keys[e.keyCode] = false;
    }

    function log(msg) {
        console.log(msg);
    }
}

function init() {
    //CONST
    var screenWidth = 800;
    var screenHeight = 640;

    //INIT
    var canvasEl = document.getElementById("viewport.js");
    var canvasContext = canvas.getContext("2d");
    var engine = new Engine(screenWidth, screenHeight);

    //EVENTS
    window.addEventListener("keydown", onKeyDown, false);

    //FUNCTIONS
    function onKeyDown(event) {
        log(event.keyCode);
        switch (event.keyCode) {
            case 37:
                // left key pressed
                break;
            case 38:
                // up key pressed
                break;
            case 39:
                // right key pressed
                break;
            case 40:
                // down key pressed
                break;
        }
    }

    function log(msg) {
        console.log(msg);
    }
}

var Movement = Class.create({
    initialize: function (screenWidth, screenHeight, speed) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.speed = speed;
        this.positionX = 0.0;// Random between 0 screenWidth?
        this.positionY = 0.0;
    },
    getNextMove: function () {
        if (this.positionX < 0 || this.positionX > this.screenWidth) {
            throw "Charecter went outside the screen";
        }
        if (this.positionY < 0 || this.positionY > this.screenHeight) {
            throw "Charecter went outside the screen";
        }
    },
    isInsideScreen: function (x, y) {
        if (x < 0 || x > this.screenWidth) {
            return false;
        }
        if (y < 0 || y > this.screenHeight) {
            return false;
        }
        return true;
    }
});

var StraightMove = Class.create(Movement, {
    initialize: function ($super, screenWidth, screenHeight, speed) {
        $super(screenWidth, screenHeight, speed);
    },
    getNextMove: function ($super) {
        this.positionY += this.speed;
        $super();
        return {
            x: this.positionX,
            y: this.positionY
        };
    }
});

var ZigZagMove = Class.create(Movement, {
    initialize: function ($super, screenWidth, screenHeight, speed, zigZagLength) {
        $super(screenWidth, screenHeight, speed);
        this.zigZagLength = zigZagLength;
        this.direction = 1;
        this.stepsLeft = 0;
        this.stepsRight = 0;
    },
    getNextMove: function ($super) {
        if (this.stepsLeft < this.zigZagLength) {// 0<5
            this.stepsLeft++;
            this.positionX += this.direction * this.speed;
        } else {// 5<5
            this.direction *= -1;
            this.stepsLeft = 1;
            this.positionX += this.direction * this.speed;
        }
        this.positionY += this.speed;
        $super();
        return {
            x: this.positionX,
            y: this.positionY
        };
    }
});

var FollowShipMove = Class.create(Movement, {
    initialize: function ($super, screenWidth, screenHeight, speed) {
        $super(screenWidth, screenHeight, speed);
    },
    getNextMove: function ($super, shipX) {
        if (shipX < this.positionX) {
            this.positionX -= this.speed;
        }
        if (shipX > this.positionX) {
            this.positionX += this.speed;
        }
        this.positionY += this.speed;
        $super();
        return {
            x: this.positionX,
            y: this.positionY
        };
    }
});

//(function () {
//    //ctor params (screenWidth, screenHeight, speed, zigZagLength)
//    var shipA = new ZigZagMove(100, 200, 1, 5);
//    //ctor params (screenWidth, screenHeight, speed)
//    var shipB = new StraightMove(100, 200, 4);
//    //ctor params (screenWidth, screenHeight, speed)
//    var shipC = new FollowShipMove(100, 200, 2);
//    //getNexMove(ship X coordinate);
//    log(shipC.getNextMove(121));
//    log(shipC.getNextMove(121));
//    //...
//    //enemy x is like ship x
//    log(shipC.getNextMove(6));
//    log(shipC.getNextMove(6));// x doesnt change

//    for (var i = 0; i < 103; i++) {
//        //log(shipA.getNextMove());
//    }
//})();

//function log(msg) {
//    console.log(msg);
//}


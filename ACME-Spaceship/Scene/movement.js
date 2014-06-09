var Movement = Class.create({
    initialize: function (speed, isMovingUp) {
        this.speed = speed;
        this.isMovingUp = isMovingUp;
        this.direction = isMovingUp ? -1 : 1;
        this.deltaX = 0.0;
        this.deltaY = 0.0;
    }
});

var StraightMove = Class.create(Movement, {
    initialize: function ($super, speed, isMovingUp) {
        $super(speed, isMovingUp);
    },
    getNextMove: function () {
        this.deltaY = this.speed * this.direction;
        return {
            x: this.deltaX,
            y: this.deltaY
        };
    }
});

var ZigZagMove = Class.create(Movement, {
    initialize: function ($super, speed, zigZagLength) {
        $super(speed);
        this.zigZagLength = zigZagLength;
        this.leftOrRight = 1;
        this.stepsLeft = 0;
        this.deltaY = this.speed;
    },
    getNextMove: function () {
        if (this.stepsLeft < this.zigZagLength) {
            this.stepsLeft++;
            this.deltaX = this.leftOrRight * this.speed;
        } else {
            this.leftOrRight *= -1;
            this.stepsLeft = 1;
            this.deltaX = this.leftOrRight * this.speed;
        }
        return {
            x: this.deltaX,
            y: this.deltaY
        };
    }
});

var FollowShipMove = Class.create(Movement, {
    initialize: function ($super, speed) {
        $super(speed);
    },
    getNextMove: function ($super, follower, target) {
        if (follower.x < target.x) {
            this.deltaX = this.speed;
        } else {
            this.deltaX = (-1) * this.speed;
        }

        if (follower.y < target.y) {
            this.deltaY = this.speed;
        } else {
            this.deltaY = (-1) * this.speed;
        }
        return {
            x: this.deltaX,
            y: this.deltaY
        };
    }
});

//(function () {
//    //ctor params (speed, zigZagLength)
//    var shipA = new ZigZagMove(1, 5);
//    //ctor params (speed, isMovingUp)
//    var shipB = new StraightMove(4, false);
//    //ctor params (speed)
//    var shipC = new FollowShipMove(2);
//    //getNexMove(follwer, target);
//    log(shipC.getNextMove({x: 100, y:100}, {x:200,y:200}))
//})();

function log(msg) {
    console.log(msg);
}


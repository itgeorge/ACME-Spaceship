var StraightFire = new Class.create({
    initialize: function(x,y) {
        this.x = x;
        this.y = y;
    },
    getBullet: function (currentX, currentY) {
        //x, y, isUpMoving
        return new Scene.Bullet(currentX, currentY, false);
    }
})
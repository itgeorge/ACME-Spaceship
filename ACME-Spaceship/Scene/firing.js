var StraightFireDown = (function () {
    var fireSpawn = 50;

    return Class.create({
        initialize: function() {
            this.callGetProjectileCounter = 0;
        },
        getProjectile: function(startX, startY) {
            this.callGetProjectileCounter++;
            if (this.callGetProjectileCounter == fireSpawn) {
                this.callGetProjectileCounter = 0;
                return Scene.Bullet.getStraightBullet(startX, startY);
            }

            return null;
        }
    });
})();

var LeftDiagonalFireDown = (function () {
    var fireSpawn = 50;

    return Class.create({
        initialize: function () {
            this.callGetProjectileCounter = 0;
        },
        getProjectile: function (startX, startY) {
            this.callGetProjectileCounter++;
            if (this.callGetProjectileCounter == fireSpawn) {
                this.callGetProjectileCounter = 0;
                return new Scene.Bullet(startX, startY, false);
            }
        }
    });
})();


var RightDiagonalFireDown = (function () {
    var fireSpawn = 50;

    return Class.create({
        initialize: function () {
            this.callGetProjectileCounter = 0;
        },
        getProjectile: function (startX, startY) {
            this.callGetProjectileCounter++;
            if (this.callGetProjectileCounter == fireSpawn) {
                this.callGetProjectileCounter = 0;
                return new Scene.Bullet(startX, startY, false);
            }
        }
    });
})();
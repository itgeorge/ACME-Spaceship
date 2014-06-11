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

var DiagonalFireDown = (function () {
    return Class.create({
        initialize: function (framesToShoot) {
            this.callGetProjectileCounter = 0;
            this.framesToShoot = framesToShoot;
        },
        getProjectile: function (startX, startY) {
            this.callGetProjectileCounter++;
            if (this.callGetProjectileCounter == this.framesToShoot) {
                this.callGetProjectileCounter = 0;
                return Math.random() < 0.5 ?
                    Scene.Bullet.getLeftDiagonalBullet(startX, startY) :
                    Scene.Bullet.getRightDiagonalBullet(startX, startY)
            }
        }
    });
})();


var ForkFireDown = (function () {
    return Class.create({
        initialize: function (framesToShoot) {
            this.callGetProjectileCounter = 0;
            this.framesToShoot = framesToShoot;
        },
        getProjectile: function (startX, startY) {
            this.callGetProjectileCounter++;
            if (this.callGetProjectileCounter == this.framesToShoot) {
                this.callGetProjectileCounter = 0;
                var r = Math.random();
                if(r < 0.3) {
                    return Scene.Bullet.getStraightBullet(startX, startY);
                } else if (r < 0.6) {
                    return Scene.Bullet.getLeftDiagonalBullet(startX, startY);
                } else if (r < 1) {
                    return Scene.Bullet.getRightDiagonalBullet(startX, startY)
                }
                
                return null;
            }
        }
    });
})();
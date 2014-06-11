/// <reference path="game-object-render-type.js" /> 
/// <reference path="movement.js" />
Scene.Bullet = (function () {
    var radius = 5;
    var speed = 8;
    var damage = 5;
    
    var Bullet = Class.create(Scene.Projectile, {
        initialize: function ($super, x, y, isUpMoving) {
            $super(damage, new StraightMove(speed, isUpMoving), x, y, radius, speed, Scene.GameObjectRenderType.BULLET);
        }

    });

    Bullet.getLeftDiagonalBullet = function(x, y) {
        var bullet = new Bullet(x, y);
        bullet.movement = new SimpleMove(speed, -1, -1);
        return bullet;
    };

    Bullet.getStraightBullet = function(x, y) {
        var bullet = new Bullet(x, y);
        bullet.movement = new SimpleMove(speed, 0, 1);
        return bullet;
    };

    Bullet.getRightDiagonalBullet = function(x, y) {
        var bullet = new Bullet(x, y);
        bullet.movement = new SimpleMove(speed, 1, -1);
        return bullet;
    };

    return Bullet;
})();

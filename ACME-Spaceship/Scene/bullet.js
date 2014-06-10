/// <reference path="game-object-render-type.js" />
/// <reference path="movement.js" />
Scene.Bullet = (function () {
    var radius = 5;
    var speed = 8;
    var damage = 5;

    return Class.create(Scene.Projectile, {
        initialize: function ($super, x, y, isUpMoving) {
            $super(damage, new StraightMove(speed, isUpMoving), x, y, radius, speed, Scene.GameObjectRenderType.BULLET);
        }
    });
})();
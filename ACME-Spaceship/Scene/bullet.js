/// <reference path="game-object-render-type.js" />
/// <reference path="movement.js" />
Scene.Bullet = (function () {
    radius = 5;
    speed = 3;

    return Class.create(Scene.Projectile, {
        initialize: function ($super, x, y, isUpMoving) {
            $super(new StraightMove(speed, isUpMoving), x, y, radius, speed, Scene.GameObjectRenderType.BULLET);
        }
    });
})();
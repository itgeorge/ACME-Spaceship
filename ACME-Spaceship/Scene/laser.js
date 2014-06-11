/// <reference path="game-object-render-type.js" />
var Scene = Scene || {};
Scene.Laser =
(function () {
    var radius = 4;
    var speed = 0;
    var damage = 10;

    var Laser = Class.create(Scene.Projectile, {
        initialize: function ($super, x, y) {
            $super(damage, null, x, y, radius, speed,
                Scene.GameObjectRenderType.LASER);
        },
        update: function update($super) {
            this.destroy();
        }
    });

    Laser.defaultRadius = radius;

    return Laser;
})();
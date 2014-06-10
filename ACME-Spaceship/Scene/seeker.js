/// <reference path="game-object-render-type.js" />
/// <reference path="movement.js" />
var Scene = Scene || {};
Scene.Seeker =
(function () {
    var radius = 10;
    var speed = 3;
    var damage = 20;

    return Seeker = Class.create(Scene.Projectile, {
        initialize: function ($super, followedShip, x, y) {
            $super(damage, new FollowShipMove(speed), x, y, radius, speed,
                Scene.GameObjectRenderType.SEEKER);

            this.followedShip = followedShip;
        },
        _getMoveFromStrategy: function ($super) {
            return this.movement.getNextMove(
                { x: this.x, y: this.y },
                { x: this.followedShip.x, y: this.followedShip.y });
        }
    });
})();
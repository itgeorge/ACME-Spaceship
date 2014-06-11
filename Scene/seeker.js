/// <reference path="game-object-render-type.js" />
/// <reference path="movement.js" />
var Scene = Scene || {};
Scene.Seeker =
(function () {
    var radius = 4.5;
    var speed = 5;
    var damage = 20;

    return Seeker = Class.create(Scene.Projectile, {
        initialize: function ($super, followedShip, x, y) {
            $super(damage, new FollowShipMove(speed), x, y, radius, speed,
                Scene.GameObjectRenderType.SEEKER);

            this.followedShip = followedShip;
            this.lastMove = { x: 0, y: -speed };
        },
        _getMoveFromStrategy: function ($super) {
            if (this.followedShip && this.followedShip.hitpoints > 0) {
                this.lastMove = this.movement.getNextMove(
                    { x: this.x, y: this.y },
                    { x: this.followedShip.x, y: this.followedShip.y });
            }

            return this.lastMove;
        }
    });
})();
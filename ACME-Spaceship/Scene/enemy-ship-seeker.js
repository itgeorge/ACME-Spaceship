/// <reference path="game-object-type.js" />
var Scene = Scene || {};
Scene.EnemyShipSeeker = Class.create(Scene.EnemyShip, {
    initialize: function ($super, followedShip, firing, movement, x, y, radius, hitpoints, maxSpeed, type, renderType) {
        $super(firing, movement, x, y, radius, hitpoints, maxSpeed, type, renderType);
        this.followedShip = followedShip;
    },
    _getMoveFromStrategy: function getMoveFromStrategy() {
        if (!this.followedShip.isDestroyed()) {
            return this.movement.getNextMove(
                { x: this.x, y: this.y },
                { x: this.followedShip.x, y: this.followedShip.y }
            );
        }
        return {
            x: 0,
            y: this.movement.speed
        };
    }
});
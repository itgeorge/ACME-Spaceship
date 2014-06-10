/// <reference path="game-object-type.js" />
var Scene = Scene || {};
Scene.EnemyShipSeeker = Class.create(Scene.EnemyShip, {
    initialize: function ($super, firing, movement, x, y, radius, hitpoints, maxSpeed, type, renderType) {
        $super(firing, movement, x, y, radius, hitpoints, maxSpeed, type, renderType);
    },
    _getMoveFromStrategy: function getMoveFromStrategy(player) {
        return this.movement.getNextMove(
            { x: this.x, y: this.y },
            { x: player.x, y: player.y }
        );
    }
});
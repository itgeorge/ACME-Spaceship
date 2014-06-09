/// <reference path="game-object-type.js" />
var Scene = Scene || {};
Scene.EnemyShip = Class.create(Scene.NPC, {
    initialize: function ($super, movement, x, y, radius, hitpoints, maxSpeed, renderType) {
        $super(movement, x, y, radius, hitpoints, maxSpeed, Scene.GameObjectType.ENEMY_SHIP, renderType);
    }
});
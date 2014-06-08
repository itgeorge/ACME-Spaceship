/// <reference path="game-object-type.js" />
var PlayerShip = Class.create(GameObject, {
    initialize: function ($super, x, y, radius, hitpoints, maxSpeed, type) {
        $super(x, y, radius, hitpoints, maxSpeed, GameObjectType.PLAYER_SHIP);
        this.xSpeed = 0;
        this.ySpeed = 0;
    },
    setXSpeed: function setXSpeed(unitsPerUpdate) {
        this.xSpeed = unitsPerUpdate;
    },
    setYSpeed: function setYSpeed(unitsPerUpdate) {
        this.ySpeed = unitsPerUpdate;
    },
    update: function update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
});
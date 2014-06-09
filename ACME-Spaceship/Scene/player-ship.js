/// <reference path="bullet.js" />
/// <reference path="game-object-type.js" />
/// <reference path="game-object.js" />
Scene = Scene || {};
Scene.PlayerShip = (function () {
    var psRadius = 20;
    var psHP = 400;
    var psMaxSpeed = 5;

    return Class.create(Scene.GameObject, {
        initialize: function ($super, x, y) {
            $super(x, y, psRadius, psHP, psMaxSpeed,
                Scene.GameObjectType.PLAYER_SHIP, Scene.GameObjectRenderType.PLAYER_SHIP);
        },
        update: function update($super) {
            return $super();
        },
        moveRight: function moveRight() {
            this.move(psMaxSpeed, 0);
        },
        moveLeft: function moveLeft() {
            this.move(-psMaxSpeed, 0);
        },
        moveUp: function moveUp() {
            this.move(0, -psMaxSpeed);
        },
        moveDown: function moveDown() {
            this.move(0, psMaxSpeed);
        },
        fireDefault: function fireDefault() {
            var bullet = new Scene.Bullet(this.x, this.y, true);
            this._addProduced(bullet);
        }
    })
})();
/// <reference path="seeker.js" />
/// <reference path="laser.js" />
/// <reference path="bullet.js" />
/// <reference path="game-object-type.js" />
/// <reference path="game-object.js" />
Scene = Scene || {};
Scene.PlayerShip = (function () {
    var psRadius = 20;
    var psHP = 4;
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
            var startX = this.x;
            var startY = this.y;
            var bullet = new Scene.Bullet(startX, startY, true);
            bullet.parentId = this.id;
            this._produce(bullet);
        },
        fireLaser: function fireLaser(length) {
            var startX = this.x;
            var startY = this.y;

            for (var i = 0; i < length; i++) {
                var beamPart = new Scene.Laser(startX, startY - Scene.Laser.defaultRadius * i);
                beamPart.parentId = this.id;
                this._produce(beamPart);
            }
        },
        fireSeeker: function fireSeeker(target) {
            var startX = this.x;
            var startY = this.y;
            var seeker = new Scene.Seeker(target, startX, startY);
            seeker.parentId = this.id;
            this._produce(seeker);
        }
    })
})();
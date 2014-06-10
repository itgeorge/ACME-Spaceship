/// <reference path="weapon-attachment.js" />
/// <reference path="bonus-type.js" />
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

    var seekerXOffset = -20;
    var seekerYOffset = 0;

    var laserXOffset = 20;
    var laserYOffset = 0;

    return Class.create(Scene.GameObject, {
        initialize: function ($super, x, y) {
            $super(x, y, psRadius, psHP, psMaxSpeed,
                Scene.GameObjectType.PLAYER_SHIP, Scene.GameObjectRenderType.PLAYER_SHIP);

            this.seekerAmmo = 0;
            this.laserAmmo = 0;
        },
        update: function update($super) {
            if (this.seekerAmmo > 0) {
                this._produce(new Scene.WeaponAttachment(this.x + seekerXOffset, this.y + seekerYOffset,
                    Scene.GameObjectRenderType.SEEKER_ATTACHMENT));
            }

            if (this.laserAmmo > 0) {
                this._produce(new Scene.WeaponAttachment(this.x + laserXOffset, this.y + laserYOffset,
                    Scene.GameObjectRenderType.LASER_ATTACHMENT));
            }

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
            if (this.laserAmmo > 0) {
                var startX = this.x + laserXOffset;
                var startY = this.y + laserYOffset;

                for (var i = 0; i < length; i++) {
                    var beamPart = new Scene.Laser(startX, startY - Scene.Laser.defaultRadius * i);
                    beamPart.parentId = this.id;
                    this._produce(beamPart);
                }

                this.laserAmmo--;
            }
        },
        fireSeeker: function fireSeeker(target) {
            if (this.seekerAmmo > 0) {
                var startX = this.x + seekerXOffset;
                var startY = this.y + seekerYOffset;
                var seeker = new Scene.Seeker(target, startX, startY);
                seeker.parentId = this.id;
                this._produce(seeker);

                this.seekerAmmo--;
            }
        },
        gatherPickup: function gatherPickup(pickup) {
            if (pickup.bonusType == Scene.BonusType.SEEKER) {
                this.seekerAmmo += pickup.quantity;
            } else if (pickup.bonusType == Scene.BonusType.LASER) {
                this.laserAmmo += pickup.quantity;
            }
        }
    })
})();
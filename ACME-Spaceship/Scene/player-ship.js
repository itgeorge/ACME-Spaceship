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
    var psHP = 10;
    var psShield = psHP;
    var psMaxSpeed = 5;

    var seekerXOffset = 0;
    var seekerYOffset = 0;

    var laserXOffset = 20;
    var laserYOffset = 0;

    var defaultSeekerCooldownFrames = 30;
    var defaultGunCooldownFrames = 30;

    return Class.create(Scene.GameObject, {
        initialize: function ($super, x, y) {
            $super(x, y, psRadius, psHP, psMaxSpeed,
                Scene.GameObjectType.PLAYER_SHIP, Scene.GameObjectRenderType.PLAYER_SHIP);

            this.seekerAmmo = 0;
            this.laserAmmo = 0;
            this.shield = 0;

            this.seekerCooldown = defaultSeekerCooldownFrames;
            this.gunCooldown = defaultGunCooldownFrames;
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

            if (this.shield > 0) {
                var shieldAttachment = new Scene.WeaponAttachment(this.x, this.y,
                    Scene.GameObjectRenderType.SHIELD_ATTACHMENT);
                shieldAttachment.radius = this.radius;
                this._produce(shieldAttachment);
            }

            if (this.gunCooldown > 0) {
                this.gunCooldown--;
            }

            if (this.seekerCooldown > 0) {
                this.seekerCooldown--;
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
        fireGun: function fireGun() {
            if (this.gunCooldown == 0) {
                var startX = this.x;
                var startY = this.y;
                var bullet = new Scene.Bullet(startX, startY, true);
                this._produce(bullet);

                this.gunCooldown = defaultGunCooldownFrames;
            }
        },
        fireLaser: function fireLaser(length) {
            if (this.laserAmmo > 0) {
                var startX = this.x + laserXOffset;
                var startY = this.y + laserYOffset;

                for (var i = 0; i < length; i++) {
                    var beamPart = new Scene.Laser(startX, startY - Scene.Laser.defaultRadius * i);
                    this._produce(beamPart);
                }

                this.laserAmmo--;
            }
        },
        fireSeeker: function fireSeeker(target) {
            if (this.seekerAmmo > 0 && this.seekerCooldown == 0) {
                var startX = this.x + seekerXOffset;
                var startY = this.y + seekerYOffset;
                var seeker = new Scene.Seeker(target, startX, startY);
                this._produce(seeker);

                this.seekerCooldown = defaultSeekerCooldownFrames;
                this.seekerAmmo--;
            }
        },
        gatherPickup: function gatherPickup(pickup) {
            if (pickup.bonusType == Scene.BonusType.SEEKER) {
                this.seekerAmmo += pickup.quantity;
            } else if (pickup.bonusType == Scene.BonusType.LASER) {
                this.laserAmmo += pickup.quantity;
            } else if (pickup.bonusType == Scene.BonusType.SHIELD) {
                this.shield += pickup.quantity;
                if(this.shield > psShield) {
                    this.shield = psShield;
                }
            }
        },
        takeDamage: function takeDamage($super, damage) {
            if (this.shield > 0) {
                this.shield -= damage;
                this.shield = Math.max(this.shield, 0);
            } else {
                this.shield = 0;
                $super(damage);
            }
        },
        getHitpointsPercent: function getHPPercent() {
            return (this.hitpoints / psHP) * 100;
        },
        getShieldPercent: function getShieldPercent() {
            return (this.shield / psShield) * 100;
        }
    })
})();
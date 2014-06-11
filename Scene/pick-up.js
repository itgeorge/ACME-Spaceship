/// <reference path="game-object-type.js" />
/// <reference path="game-object-render-type.js" />
/// <reference path="movement.js" />
/// <reference path="bonus-type.js" />
var Scene = Scene || {};
Scene.PickUp =
(function () {
    var speed = 5;
    var radius = 20;

    var PickUp = Class.create(Scene.SelfControlledObject, {
        initialize: function ($super, quantity, x, y, bonusType, renderType) {
            $super(new StraightMove(speed), x, y, radius, 1, speed,
                Scene.GameObjectType.PICK_UP, renderType);

            this.bonusType = bonusType;
            this.quantity = quantity;
        },
    });

    function getRandXCoord(minX, maxX) {
        return minX + (maxX - minX) * Math.random();
    }

    return {
        getSeeker: function (quantity, minX, maxX) {
            return new PickUp(quantity,
                getRandXCoord(minX, maxX), 1,
                Scene.BonusType.SEEKER, Scene.GameObjectRenderType.SEEKER_BONUS);
        },
        getLaser: function (quantity, minX, maxX) {
            return new PickUp(quantity,
                getRandXCoord(minX, maxX), 1,
                Scene.BonusType.LASER, Scene.GameObjectRenderType.LASER_BONUS);
        },
        getShield: function (quantity, minX, maxX) {
            return new PickUp(quantity,
                getRandXCoord(minX, maxX), 1,
                Scene.BonusType.SHIELD, Scene.GameObjectRenderType.SHIELD_BONUS);
        }
    }
})();
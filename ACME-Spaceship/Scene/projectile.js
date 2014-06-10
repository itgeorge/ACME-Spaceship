/// <reference path="game-object-type.js" />
var Scene = Scene || {};
Scene.Projectile = (function () {
    var hp = 1;

    return Class.create(Scene.SelfControlledObject, {
        initialize: function ($super, damage, movement, x, y, radius, maxSpeed, renderType) {
            $super(movement, x, y, radius, hp, maxSpeed, Scene.GameObjectType.PROJECTILE, renderType);
            this.damage = damage;
        }
    });
})();
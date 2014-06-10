/// <reference path="game-object-render-type.js" />
var Scene = Scene || {};
Scene.WeaponAttachment = (function () {
    var speed = 0;
    var radius = 30;
    var hp = 0;

    return Class.create(Scene.SelfControlledObject, {
        initialize: function ($super, x, y, renderType) {
            $super(null, x, y, radius, hp, speed,
                Scene.GameObjectType.FOREGROUND_EFFECT,
                renderType);
        },
    });
})();
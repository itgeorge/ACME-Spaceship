/// <reference path="game-object-render-type.js" />
/// <reference path="movement.js" />
/// <reference path="self-controlled-object.js" />
/// <reference path="game-object-type.js" />
Scene.Star = (function () {
    var hp = 1;

    var Star = Class.create(Scene.SelfControlledObject, {
        initialize: function ($super, movement, x, y, radius) {
            $super(movement, x, y, radius, hp, movement.speed, Scene.GameObjectType.BACKGROUND_EFFECT, Scene.GameObjectRenderType.STAR);
        },
    });

    var smallSpeed = 0.5;
    var smallRadius = 1;

    var medSpeed = 0.7;
    var medRadius = 2;
    
    var largeSpeed = 1;
    var largeRadius = 3;

    function getRandXCoord(minX, maxX) {
        return minX + (maxX - minX) * Math.random();
    }

    return {
        getSmall: function (minX, maxX) {
            var x =  getRandXCoord(minX, maxX);
            var y = 1;
            return new Star(new StraightMove(smallSpeed), x, y, smallRadius);
        },
        getMedium: function (minX, maxX) {
            var x = getRandXCoord(minX, maxX);
            var y = 1;
            return new Star(new StraightMove(medSpeed), x, y, medRadius);
        },
        getLarge: function (minX, maxX) {
            var x = getRandXCoord(minX, maxX);
            var y = 1;
            return new Star(new StraightMove(largeSpeed), x, y, largeRadius);
        },
    };
})();
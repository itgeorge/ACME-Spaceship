var Scene = Scene || {};
Scene.Boss = Class.create(Scene.NPC, {
    initialize: function ($super, firing, movement, x, y, radius, hitpoints, maxSpeed, type, renderType) {
        $super(firing, movement, x, y, radius, hitpoints, maxSpeed, Scene.GameObjectType.ENEMY_SHIP, renderType);
    }
});
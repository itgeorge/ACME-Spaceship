var Scene = Scene || {};
Scene.NPC = Class.create(Scene.SelfControlledObject, {
    initialize: function ($super, firing, movement, x, y, radius, hitpoints, maxSpeed, type, renderType) {
        $super(movement, x, y, radius, hitpoints, maxSpeed, type, renderType);
        this.firing = firing;
    },
    update: function ($super) {
        var firedObject = this.firing.getFiredObject();
        this._addProduced(firedObject);
        return $super();
    }
});
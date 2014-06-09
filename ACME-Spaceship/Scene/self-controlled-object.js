Scene.SelfControlledObject = Class.create(Scene.GameObject, {
    initialize: function ($super, movement, x, y, radius, hitpoints, maxSpeed, type, renderType) {
        $super(x, y, radius, hitpoints, maxSpeed, type, renderType);
        this.movement = movement;
    },
    update: function update($super) {
        var nextPos = this.movement.getNextMove();
        this.moveTo(nextPos.x, nextPos.y);

        return $super();
    }
});
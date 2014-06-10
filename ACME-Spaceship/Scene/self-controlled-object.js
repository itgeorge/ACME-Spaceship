Scene.SelfControlledObject = Class.create(Scene.GameObject, {
    initialize: function ($super, movement, x, y, radius, hitpoints, maxSpeed, type, renderType) {
        $super(x, y, radius, hitpoints, maxSpeed, type, renderType);
        this.movement = movement;
    },
    update: function update($super) {
        if (this.movement) {
            var deltas = this.movement.getNextMove();
            this.move(deltas.x, deltas.y);
        }

        return $super();
    }
});
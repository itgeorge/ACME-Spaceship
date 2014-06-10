Scene.SelfControlledObject = Class.create(Scene.GameObject, {
    initialize: function ($super, movement, x, y, radius, hitpoints, maxSpeed, type, renderType) {
        $super(x, y, radius, hitpoints, maxSpeed, type, renderType);
        this.movement = movement;
    },
    update: function update($super) {
        if (this.movement) {
            var deltas = this._getMoveFromStrategy();
            this.move(deltas.x, deltas.y);
        }

        return $super();
    },
    _getMoveFromStrategy: function getMoveFromStrategy() {
        return this.movement.getNextMove();
    }
});
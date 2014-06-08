var GameObject = Class.create({
    initialize: function (x, y, radius, hitpoints, maxSpeed, type) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.hitpoints = hitpoints;
        this.maxSpeed = maxSpeed;
        this.type = type;
    },
    update: function update(deltaTimeMs) {
        throw "Not implemented";
    },
    hits: function hits(otherObject) {
        var xDelta = this.x - otherObject.x;
        var yDelta = this.y - otherObject.y;
        var distSq = xDelta * xDelta + yDelta * yDelta;

        return distSq <= this.radius * this.radius;
    }
});
var Scene = Scene || {};
Scene.GameObject = (function () {
    var totalInstances

    var GameObject = Class.create({
        initialize: function (x, y, radius, hitpoints, maxSpeed, type, renderType, parent) {
            this.id = totalInstances++;

            this.x = x;
            this.y = y;
            this.radius = radius;
            this.hitpoints = hitpoints;
            this.maxSpeed = maxSpeed;
            this.type = type;
            this.renderType = renderType
            this.parent = parent;
            this.produced = [];
        },
        _addProduced: function (obj) {
            this.produced.push(obj);
        },
        equals: function equals(otherObject) {
            return this.id == otherObject.id;
        },
        update: function update(deltaTimeMs) {
            return this.produced;
        },
        move: function move(deltaX, deltaY) {
            this.x += this._limitToMaxSpeed(deltaX);
            this.y += this._limitToMaxSpeed(deltaY);
        },
        moveTo: function moveTo(newX, newY) {
            this.x = newX;
            this.y = newY;
        },
        _limitToMaxSpeed: function limitToMaxSpeed(units) {
            if (units == 0) {
                return 0;
            }

            var absUnits = Math.abs(units);
            var sign = units / absUnits;

            return sign * (absUnits > this.maxSpeed ? this.maxSpeed : absUnits);
        },
        hits: function hits(otherObject) {
            var xDelta = this.x - otherObject.x;
            var yDelta = this.y - otherObject.y;
            var distSq = xDelta * xDelta + yDelta * yDelta;

            return distSq <= this.radius * this.radius;
        }
    });

    return GameObject;
})();
var Scene = Scene || {};
Scene.GameObject = (function () {
    var totalInstances = 0;

    var GameObject = Class.create({
        initialize: function (x, y, radius, hitpoints, maxSpeed, type, renderType) {
            this.id = totalInstances++;

            this.x = x;
            this.y = y;
            this.radius = radius;
            this.hitpoints = hitpoints;
            this.maxSpeed = maxSpeed;
            this.type = type;
            this.renderType = renderType
            this.parentId = -1;
            this.produced = [];
        },
        _produce: function (obj) {
            this.produced.push(obj);
        },
        equals: function equals(otherObject) {
            return this.id == otherObject.id;
        },
        update: function update(deltaTimeMs) {
            var producedToReturn = this.produced;
            this.produced = [];
            return producedToReturn;
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
            if (this.parentId != otherObject.id && this.type != otherObject.type) {
                var xDelta = this.x - otherObject.x;
                var yDelta = this.y - otherObject.y;
                var distSq = xDelta * xDelta + yDelta * yDelta;
                var hitDist = this.radius + otherObject.radius
                return distSq <=  hitDist * hitDist;
            }

            return false;
        },
        takeDamage: function takeDamage(damage) {
            this.hitpoints -= damage;
        },
        destroy: function destroy() {
            this.hitpoints = 0;
        },
        isDestroyed: function isDestroyed() {
            return this.hitpoints <= 0;
        }
    });

    return GameObject;
})();
/// <reference path="star.js" />
/// <reference path="player-ship.js" />
/// <reference path="game-object.js" />
var Scene = Scene || {};
Scene.Engine = (function () {
    var Engine = Class.create({
        initialize: function (worldWidth, worldHeight, renderer, gameLogic, interval) {
            this.worldWidth = worldWidth;
            this.worldHeight = worldHeight;
            this.gameLogic = gameLogic;
            this.renderer = renderer;
            this.interval = interval;

            this.bgrEffects= [];
            this.all = [];
            this.player = {};
            this.enemies = {};
            this.pickups = {};
            this.projectiles = {};

            this.pressedKeysByCode = [];
        },
        _spawnEnemies: function spawnEnemies() {
            if (this.gameLogic) {
                var newEnemies = this.gameLogic.getNewEnemies(this.enemies);
                this._addMultipleObjs(newEnemies);
            }
        },
        _spawnPickups: function spawnPickups() {
            if (this.gameLogic) {
                var newPickups = this.gameLogic.getNewPickups(this.pickups);
                this._addMultipleObjs(newPickups);
            }
        },
        _spawnEffects: function spawnEffects() {
            var rand = Math.random();
            if (rand < 0.5) {
                this._addEffect(Scene.Star.getSmall(0, this.worldWidth));
            } else if (rand < 0.88) {
                this._addEffect(Scene.Star.getMedium(0, this.worldWidth));
            } else if (rand < 1) {
                this._addEffect(Scene.Star.getLarge(0, this.worldWidth));
            }
        },
        _render: function render() {
            this.renderer.renderAll(this.bgrEffects, true)
            this.renderer.renderAll(this.all, false);
        },
        _addEffect: function addEffect(obj) {
            if (obj.type == Scene.GameObjectType.BACKGROUND_EFFECT) {
                this.bgrEffects.push(obj);
            }
        },
        _addObj: function addObj(obj) {
            if (obj.type == Scene.GameObjectType.ENEMY_SHIP) {
                this.enemies[obj.id] = obj;
            } else if (obj.type == Scene.GameObjectType.PICK_UP) {
                this.pickups[obj.id] = obj;
            } else if (obj.type == Scene.GameObjectType.PROJECTILE) {
                this.projectiles[obj.id] = obj;
            } else if (obj.type == Scene.GameObjectType.PLAYER_SHIP) {
                this.player = obj;
            }

            this.all.push(obj);
        },
        _addMultipleObjs: function addMultipleObjs(objs) {
            for (var i = 0; i < objs.length; i++) {
                var obj = objs[i];
                this._addObj(obj);
            }
        },
        _removeObj: function removeObj(obj, indexInAll) {
            if (indexInAll || indexInAll === 0) {
                this.all.splice(indexInAll, 1);
            } else {
                throw "IndexInAll required";
            }

            delete this.enemies[obj.id];
            delete this.pickups[obj.id];
            delete this.projectiles[obj.id];
        },
        _updateObjs: function updateObjs() {
            var newObjs = [];
            for (var i = 0; i < this.all.length; i++) {
                newObjs.push.apply(newObjs, this.all[i].update());

                var currObj = this.all[i];

                if (!this._isInsideWorld(currObj)) {
                    currObj.destroy();
                }

                if (currObj.hitpoints <= 0) {
                    this._removeObj(currObj, i);
                    i--;
                }
            }

            for (var newI = 0; newI < newObjs.length; newI++) {
                this._addObj(newObjs[newI]);
            }
        },
        _updateEffects: function updateEffects() {
            for (var i = 0; i < this.bgrEffects.length; i++) {
                this.bgrEffects[i].update();

                if (!this._isInsideWorld(this.bgrEffects[i])) {
                    this.bgrEffects.splice(i, 1);
                }
            }
        },
        watchInput: function watchInput(pressedKeysByCode) {
            this.pressedKeysByCode = pressedKeysByCode;
        },
        _processInput: function processInput() {
            var keys = this.pressedKeysByCode;
            //left
            if (keys[37]) {
                this.player.moveLeft();
            }

            //up
            if (keys[38]) {
                this.player.moveUp();
            }

            //right
            if (keys[39]) {
                this.player.moveRight();
            }

            //down
            if (keys[40]) {
                this.player.moveDown();
            }

            //b
            if (keys[66]) {
                this.player.fireSeeker(this._getClosestEnemy());
            }

            //v
            if (keys[86]) {
                var length = this.worldHeight / Scene.Laser.defaultRadius;
                length = length | 0; //fast converting to integer
                this.player.fireLaser(length);
            }

            //spacebar
            if (keys[32]) {
                this.player.fireDefault();
            }
        },
        _processCollisions: function processCollisions() {
            var playerById = {};
            playerById[this.player.id] = this.player;
            var playerPickupsPairs = this._getCollisionPairs(playerById, this.pickups);
            var playerEnemiesPairs = this._getCollisionPairs(playerById, this.enemies);
            var projectilesPlayerPairs = this._getCollisionPairs(this.projectiles, playerById);
            var projectilesEnemiesPairs = this._getCollisionPairs(this.projectiles, this.enemies);

            this._processPlayerPickupsPairs(playerPickupsPairs);
            this._processPlayerEnemiesPairs(playerEnemiesPairs);
            this._processProjectilesShipsPairs(projectilesPlayerPairs);
            this._processProjectilesShipsPairs(projectilesEnemiesPairs);
        },
        _processPlayerPickupsPairs: function processPlayerPickupsPairs(pairs) {
            for (var i = 0; i < pairs.length; i++) {
                //Add pickups to player
            }
        },
        _processPlayerEnemiesPairs: function processPlayerEnemiesPairs(pairs) {
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];
                var aHP = pair.a.hitpoints;
                var bHP = pair.b.hitpoints;
                pair.a.takeDamage(bHP);
                pair.b.takeDamage(aHP);
            }
        },
        _processProjectilesShipsPairs: function processProjectilesShipsPairs(pairs) {
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];
                pair.b.takeDamage(pair.a.damage);
                pair.a.destroy();
            }
        },
        _getCollisionPairs: function (aObjsById, bObjsById) {
            var pairs = [];

            for (aId in aObjsById) {
                for (bId in bObjsById) {
                    var a = aObjsById[aId];
                    var b = bObjsById[bId];

                    if (a.hits(b)) {
                        pairs.push({
                            a: a,
                            b: b
                        });
                    }
                }
            }

            return pairs;
        },
        _getClosestEnemy: function getClosestEnemy() {
            var minDistSq = this.worldWidth * this.worldWidth + this.worldHeight * this.worldHeight;
            var closestEnemy = null;

            for (var enemyId in this.enemies) {
                var enemy = this.enemies[enemyId];

                var deltaX = this.player.x - enemy.x;
                var deltaY = this.player.y - enemy.y;

                var distSq = deltaX * deltaX + deltaY * deltaY;
                if (distSq < minDistSq) {
                    minDistSq = distSq;
                    closestEnemy = enemy;
                }
            }

            return closestEnemy;
        },
        run: function run() {
            var self = this;

            this.player = new Scene.PlayerShip(this.worldWidth / 2, this.worldHeight - this.worldHeight * 0.1);
            this._addObj(this.player);

            setInterval(function () {
                self._render();
                self._processInput();
                self._processCollisions();
                self._updateObjs();
                self._updateEffects();
                self._spawnEnemies();
                self._spawnPickups();
                self._spawnEffects();
            }, this.interval);
        },
        _isInsideWorld: function (obj) {
            var x = obj.x;
            var y = obj.y;
            if (x < 0 || x > this.worldWidth) {
                return false;
            }
            if (y < 0 || y > this.worldHeight) {
                return false;
            }
            return true;
        }
    });

    return Engine;
})();
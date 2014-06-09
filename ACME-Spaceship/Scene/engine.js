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
        _render: function render() {
            this.renderer.renderAll(this.all);
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
                if (currObj.hitpoints <= 0) {
                    this._removeObj(currObj, i);
                }

                if (!this._isInsideWorld(currObj)) {
                    this._removeObj(currObj, i);
                }
            }

            for (var newI = 0; newI < newObjs.length; newI++) {
                this._addObj(newObjs[newI]);
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

            //v
            if (keys[86]) {
                this.player.fireLaser();
            }

            //spacebar
            if (keys[32]) {
                this.player.fireDefault();
            }
        },
        run: function run() {
            var self = this;

            this.player = new Scene.PlayerShip(this.worldWidth / 2, this.worldHeight - this.worldHeight * 0.1);
            this._addObj(this.player);

            setInterval(function () {
                self._render();
                self._processInput();
                self._updateObjs();
                //TODO: check collisions
                //TODO: remove objects died from collisions
                self._spawnEnemies();
                self._spawnPickups();
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
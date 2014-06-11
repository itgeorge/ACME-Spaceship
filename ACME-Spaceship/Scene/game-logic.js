/// <reference path="pick-up.js" />
var Scene = Scene || {};

Scene.GameLogic = (function () {
    var ENEMIES_LEVEL_1 = 10;
    var ENEMIES_LEVEL_2 = 20;
    var ENEMIES_LEVEL_3 = 30;
    var ENEMIES_LEVEL_4 = 40;
    var ENEMIES_LEVEL_5 = 50;
    var ENEMIES_LEVEL_6 = 60;
    var ENEMIES_LEVEL_7 = 65;
    var LEVEL_1_SPAWN_TIME = 90;
    var LEVEL_2_SPAWN_TIME = 80;
    var LEVEL_3_SPAWN_TIME = 70;
    var LEVEL_4_SPAWN_TIME = 60;
    var LEVEL_5_SPAWN_TIME = 50;
    var LEVEL_6_SPAWN_TIME = 40;
    var LEVEL_7_SPAWN_TIME = 45;

    var GameLogic = Class.create({
        initialize: function (screenWidth) {
            this.screenWidth = screenWidth;
            this.level = 1;
            this.isBossTime = false;
            this.callForEnemiesCounter = 0;
            this.enemiesCreated = 0;
            this.enemies = {};
            this.playerShip = {};
            this.createdBoss = false;
        },
        getNewPickups: function () {

            if (Math.random() > 0.97) {
                var r = Math.random();
                if (r < 0.3) {
                    return [Scene.PickUp.getSeeker(10, 1, this.screenWidth)];
                } else if (r < 0.6) {
                    return [Scene.PickUp.getLaser(10, 1, this.screenWidth)];
                } else {
                    return [Scene.PickUp.getShield(10, 1, this.screenWidth)];
                }
            }

            return [];
        },
        processEnemiesForLevel: function (levelEnemiesCount, levelSpawnTime, enemiesAlive, enemies) {
            this.callForEnemiesCounter++;

            if (enemiesAlive == 0 && this.enemiesCreated >= levelEnemiesCount) {
                this.isBossTime = true;
            }

            if (!this.isBossTime) {
                if (this.enemiesCreated < levelEnemiesCount
                    && this.callForEnemiesCounter == levelSpawnTime) {

                    this.enemiesCreated++;
                    this.callForEnemiesCounter = 0;
                    return enemies;
                }
                return [];
            } else {
                if (this.createdBoss) {
                    if (enemiesAlive == 0) {
                        this.isBossTime = false;
                        this.createdBoss = false
                        this.level++;
                        this.callForEnemiesCounter = 0;
                    }
                    return [];
                } else {
                    this.createdBoss = true;
                    return [this.getBoss()];
                }
            }
        },
        getNewEnemies: function (enemiesArray) {
            this.enemies = enemiesArray;
            enemiesAlive = Object.keys(this.enemies).length;

            switch (this.level) {
                case 1:
                    return this.processEnemiesForLevel(ENEMIES_LEVEL_1, LEVEL_1_SPAWN_TIME, enemiesAlive,
                        [this.getEasyEnemy()]);
                case 2:
                    return this.processEnemiesForLevel(ENEMIES_LEVEL_2, LEVEL_2_SPAWN_TIME, enemiesAlive,
                        [this.getEasyEnemy(), this.getMediumEnemy()]);
                case 3:
                    return this.processEnemiesForLevel(ENEMIES_LEVEL_3, LEVEL_3_SPAWN_TIME, enemiesAlive,
                        [this.getEasyEnemy(), this.getMediumEnemy(), this.getMediumEnemy()]);
                case 4:
                    return this.processEnemiesForLevel(ENEMIES_LEVEL_4, LEVEL_4_SPAWN_TIME, enemiesAlive,
                        [this.getEasyEnemy(), this.getMediumEnemy(), this.getHardEnemy()]);
                case 5:
                    return this.processEnemiesForLevel(ENEMIES_LEVEL_5, LEVEL_5_SPAWN_TIME, enemiesAlive,
                        [this.getMediumEnemy(), this.getMediumEnemy(), this.getHardEnemy()]);
                case 6:
                    return this.processEnemiesForLevel(ENEMIES_LEVEL_6, LEVEL_6_SPAWN_TIME, enemiesAlive,
                        [this.getEasyEnemy(), this.getMediumEnemy(), this.getMediumEnemy(), this.getHardEnemy()]);
                case 7:
                    return this.processEnemiesForLevel(ENEMIES_LEVEL_7, LEVEL_7_SPAWN_TIME, enemiesAlive,
                        [this.getEasyEnemy(), this.getEasyEnemy(), this.getMediumEnemy(), this.getMediumEnemy(), this.getHardEnemy(), this.getHardEnemy()]);
                default:
                    alert('YOU WIN!');
            }
        },
        watchPlayer: function (playerShip) {
            this.playerShip = playerShip;
        },
        getGameState: function () {

        },
        getCurrentLevel: function () {
            return this.level;
        },
        // firing, movement, x, y, radius, hitpoints, maxSpeed, type, renderType
        getEasyEnemy: function () {
            var x = getRandXCoord(1, this.screenWidth);
            var fireStrat = new StraightFireDown();
            return new Scene.EnemyShip(fireStrat, new StraightMove(4, false), x, 1, 10, 4, 4, Scene.GameObjectType.ENEMY_SHIP, Scene.GameObjectRenderType.EASY_ENEMY);
        },
        getMediumEnemy: function () {
            var x = getRandXCoord(1, this.screenWidth);
            var zigLen = getRandXCoord(1, 40);
            var fireStrat = new DiagonalFireDown(40);
            return new Scene.EnemyShip(fireStrat, new ZigZagMove(4, zigLen), x, 1, 10, 4, 4, Scene.GameObjectType.ENEMY_SHIP, Scene.GameObjectRenderType.MEDIUM_ENEMY);
        },
        getHardEnemy: function () {
            var x = getRandXCoord(1, this.screenWidth);
            var fireStrat = new ForkFireDown(30);
            return new Scene.EnemyShipSeeker(this.playerShip, fireStrat, new FollowShipMove(3), x, 1, 10, 4, 2, Scene.GameObjectType.ENEMY_SHIP, Scene.GameObjectRenderType.HARD_ENEMY);
        },
        getBoss: function () {
            return new Scene.Boss(new ForkFireDown(10), new HorizontalMove(20, 5), this.screenWidth / 2, 1, 100, 600, 4, Scene.GameObjectType.ENEMY_SHIP, Scene.GameObjectRenderType.BOSS_SHIP);
        }
    });

    function getRandXCoord(minX, maxX) {
        return minX + (maxX - minX) * Math.random();
    }

    return GameLogic;
})();

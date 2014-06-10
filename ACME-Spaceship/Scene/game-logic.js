/// <reference path="pick-up.js" />
var Scene = Scene || {};
//movement, x, y, radius, hitpoints, maxSpeed, renderType
Scene.GameLogicConstants = {

};
Scene.GameLogic = (function () {
    var ENEMIES_LEVEL_1 = 10;
    var ENEMIES_LEVEL_2 = 20;
    var ENEMIES_LEVEL_3 = 30;
    var ENEMIES_LEVEL_4 = 40;
    var ENEMIES_LEVEL_5 = 50;
    var ENEMIES_LEVEL_6 = 60;
    var ENEMIES_LEVEL_7 = 70;
    var LEVEL_1_SPAWN_TIME = 60;
    var LEVEL_2_SPAWN_TIME = 40;
    var LEVEL_3_SPAWN_TIME = 30;
    var LEVEL_4_SPAWN_TIME = 25;
    var LEVEL_5_SPAWN_TIME = 20;
    var LEVEL_6_SPAWN_TIME = 15;
    var LEVEL_7_SPAWN_TIME = 10;

    var GameLogic = Class.create({
        initialize: function (screenWidth) {
            this.screenWidth = screenWidth;
            this.level = 1;
            this.isBossTime = false;
            this.callForEnemiesCounter = 0;
            this.enemiesCreated = 0;
            this.enemies = {};
        },
        getNewPickups: function () {
            
            if (Math.random() > 0.98) {
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
        getNewEnemies: function (enemiesArray) {
            this.enemies = enemiesArray;
            var enemiesAlive = Object.keys(enemiesArray).length;
            //if (enemiesAlive == 0 && this.enemiesCreated > ENEMIES_LEVEL_1) {
            //    this.isBossTime = true;
            //}

            switch (this.level) {
                case 1:
                    this.callForEnemiesCounter++;

                    if (!this.isBossTime) {
                        if (this.enemiesCreated < ENEMIES_LEVEL_1
                            && this.callForEnemiesCounter == LEVEL_1_SPAWN_TIME) {

                            this.enemiesCreated++;
                            this.callForEnemiesCounter = 0;
                            return [this.getEasyEnemy()];
                        } else {
                            if (this.enemiesCreated == ENEMIES_LEVEL_1 && enemiesAlive == 0) {
                                this.level++;
                                this.callForEnemiesCounter = 0;
                            }

                            return [];
                        }
                    } else {
                        this.isBossTime = false;
                        //return [this.getBoss()];
                        return [];
                    }
                case 2:
                    this.callForEnemiesCounter++;
                    if (!this.isBossTime) {
                        if (this.enemiesCreated < ENEMIES_LEVEL_2
                            && this.callForEnemiesCounter == LEVEL_2_SPAWN_TIME) {
                            this.enemiesCreated++;
                            this.callForEnemiesCounter = 0;
                            return [this.getEasyEnemy(), this.getMediumEnemy()];
                        } else {
                            if (this.enemiesCreated == ENEMIES_LEVEL_2 && enemiesAlive == 0) {
                                this.level++;
                                this.callForEnemiesCounter = 0;
                            }

                            return [];
                        }
                    } else {
                        this.isBossTime = false;
                        //return [this.getBoss()];
                        return [];
                    }
                case 3:
                    this.callForEnemiesCounter++;
                    if (!this.isBossTime) {
                        if (this.enemiesCreated < ENEMIES_LEVEL_3
                            && this.callForEnemiesCounter == LEVEL_3_SPAWN_TIME) {
                            this.enemiesCreated++;
                            this.callForEnemiesCounter = 0;
                            return [this.getEasyEnemy(), this.getMediumEnemy()];
                        } else {
                            if (this.enemiesCreated == ENEMIES_LEVEL_3 && enemiesAlive == 0) {
                                this.level++;
                                this.callForEnemiesCounter = 0;
                            }

                            return [];
                        }
                    } else {
                        this.isBossTime = false;
                        //return [this.getBoss()];
                        return [];
                    }
                case 4:
                    this.callForEnemiesCounter++;
                    if (!this.isBossTime) {
                        if (this.enemiesCreated < ENEMIES_LEVEL_4
                            && this.callForEnemiesCounter == LEVEL_4_SPAWN_TIME) {
                            this.enemiesCreated++;
                            this.callForEnemiesCounter = 0;
                            return [this.getEasyEnemy(), this.getMediumEnemy()];
                        } else {
                            if (this.enemiesCreated == ENEMIES_LEVEL_4 && enemiesAlive == 0) {
                                this.level++;
                                this.callForEnemiesCounter = 0;
                            }

                            return [];
                        }
                    } else {
                        this.isBossTime = false;
                        //return [this.getBoss()];
                        return [];
                    }
                case 5:
                    this.callForEnemiesCounter++;
                    if (!this.isBossTime) {
                        if (this.enemiesCreated < ENEMIES_LEVEL_5
                            && this.callForEnemiesCounter == LEVEL_5_SPAWN_TIME) {
                            this.enemiesCreated++;
                            this.callForEnemiesCounter = 0;
                            return [this.getEasyEnemy(), this.getMediumEnemy()];
                        } else {
                            if (this.enemiesCreated == ENEMIES_LEVEL_5 && enemiesAlive == 0) {
                                this.level++;
                                this.callForEnemiesCounter = 0;
                            }

                            return [];
                        }
                    } else {
                        this.isBossTime = false;
                        //return [this.getBoss()];
                        return [];
                    }
                case 6:
                    this.callForEnemiesCounter++;
                    if (!this.isBossTime) {
                        if (this.enemiesCreated < ENEMIES_LEVEL_6
                            && this.callForEnemiesCounter == LEVEL_6_SPAWN_TIME) {
                            this.enemiesCreated++;
                            this.callForEnemiesCounter = 0;
                            return [this.getEasyEnemy(), this.getMediumEnemy()];
                        } else {
                            if (this.enemiesCreated == ENEMIES_LEVEL_6 && enemiesAlive == 0) {
                                this.level++;
                                this.callForEnemiesCounter = 0;
                            }

                            return [];
                        }
                    } else {
                        this.isBossTime = false;
                        //return [this.getBoss()];
                        return [];
                    }
                case 7:
                    this.callForEnemiesCounter++;
                    if (!this.isBossTime) {
                        if (this.enemiesCreated < ENEMIES_LEVEL_7
                            && this.callForEnemiesCounter == LEVEL_7_SPAWN_TIME) {
                            this.enemiesCreated++;
                            this.callForEnemiesCounter = 0;
                            return [this.getEasyEnemy(), this.getMediumEnemy()];
                        } else {
                            if (this.enemiesCreated == ENEMIES_LEVEL_7 && enemiesAlive == 0) {
                                this.level++;
                                this.callForEnemiesCounter = 0;
                            }

                            return [];
                        }
                    } else {
                        this.isBossTime = false;
                        //return [this.getBoss()];
                        return [];
                    }
                default:
                    alert('YOU WIN!');
            }
        },
        watchPlayer: function (playerShip) {

        },
        getGameState: function () {

        },
        getCurrentLevel: function () {
            return this.level;
        },
        // firing, movement, x, y, radius, hitpoints, maxSpeed, type, renderType
        getEasyEnemy: function () {
            var x = getRandXCoord(1, this.screenWidth);
            return new Scene.EnemyShip(null, new StraightMove(4, false), x, 1, 10, 4, 4, Scene.GameObjectType.ENEMY_SHIP, Scene.GameObjectRenderType.EASY_ENEMY);
        },
        getMediumEnemy: function () {
            var x = getRandXCoord(1, this.screenWidth);
            var zigLen = getRandXCoord(1, 40);
            return new Scene.EnemyShip(null, new ZigZagMove(4, zigLen), x, 1, 10, 4, 4, Scene.GameObjectType.ENEMY_SHIP, Scene.GameObjectRenderType.MEDIUM_ENEMY);
        },
        getHardEnemy: function () {
            var x = getRandXCoord(1, this.screenWidth);
            var zigLen = getRandXCoord(1, 10);
            return new Scene.EnemyShip(null, new ZigZagMove(8, zigLen), x, 1, 10, 4, 4, Scene.GameObjectType.ENEMY_SHIP, Scene.GameObjectRenderType.HARD_ENEMY);
        },
        getInsaneEnemy: function () {
            var x = getRandXCoord(1, this.screenWidth);
            return new Scene.EnemyShip(null, new FollowShipMove(6), x, 1, 10, 4, 4, Scene.GameObjectType.ENEMY_SHIP, Scene.GameObjectRenderType.INSANE_ENEMY);
        },
        getBoss: function () {
            var x = getRandXCoord(1, this.screenWidth);
            return new Scene.Boss(null, new HorizontalMove(20, 20), x, 1, 100, 4, 4, Scene.GameObjectType.ENEMY_SHIP, Scene.GameObjectRenderType.BOSS_SHIP);
        }
    });

    function getRandXCoord(minX, maxX) {
        return minX + (maxX - minX) * Math.random();
    }

    return GameLogic;
})();

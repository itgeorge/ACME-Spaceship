﻿/// <reference path="pick-up.js" />
var Scene = Scene || {};
//movement, x, y, radius, hitpoints, maxSpeed, renderType
Scene.GameLogicConstants = {
    ENEMY_TYPE_1: { movement: 'streight', radius: 2, hitpoints: 1, maxSpeed: 1, renderType: Scene.GameObjectRenderType.ENEMY_SHIP },
    ENEMIES_LEVEL_1: 100,
    LEVEL_1_SPAWN_TIME: 100,
};
Scene.GameLogic = Class.create({
    initialize: function () {
        this.level = 1;
        this.isBossTime = false;
        this.callForEnemiesCounter = 0;
        this.enemiesCreated = 0;
        this.enemies = [];
    },
    getNewPickups: function () {
        //TODO: this is for testing purposes, re-write more meaningful logic
        if (this.callForEnemiesCounter == Scene.GameLogicConstants.LEVEL_1_SPAWN_TIME - 1) {
            return Math.random() > 0.5 ?
                [Scene.PickUp.getSeeker(10, 1, 800)] :
                [Scene.PickUp.getLaser(10, 1, 800)]
        }

        return [];
    },
    getNewEnemies: function (enemiesArray) {
        this.callForEnemiesCounter++;

        var enemiesAlive = Object.keys(enemiesArray).length;
        if (enemiesAlive == 0 && this.enemiesCreated > Scene.GameLogicConstants.ENEMIES_LEVEL_1) {
            this.isBossTime = true;
        }

        switch (this.level) {
            case 1:
                if (!this.isBossTime) {
                    if (this.enemiesCreated < Scene.GameLogicConstants.ENEMIES_LEVEL_1
                        && this.callForEnemiesCounter == Scene.GameLogicConstants.LEVEL_1_SPAWN_TIME) {
                        this.enemiesCreated++;
                        this.callForEnemiesCounter = 0;
                        return [EnemyFactory.getEasyEnemy()];
                    } else {
                        if (this.enemiesCreated == Scene.GameLogicConstants.ENEMIES_LEVEL_1 && enemiesAlive == 0) {
                            this.level++;
                        }

                        return [];
                    }
                } else {
                    this.isBossTime = false;
                    return [EnemyFactory.getBoss()];
                }
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
            case 7:
                break;
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
    }
});

var EnemyFactory = {
    //movement, x, y, radius, hitpoints, maxSpeed, renderType
    getEasyEnemy: function () {
        return new Scene.EnemyShip(null, new StraightMove(4, false), 100, 1, 10, 4, 4, Scene.GameObjectType.ENEMY_SHIP, Scene.GameObjectRenderType.EASY_ENEMY);
    },
    getMediumEnemy: function () {
        return new Scene.EnemyShip();
    },
    getHardEnemy: function () {
        return new Scene.EnemyShip();
    },
    getInsaneEnemy: function () {
        return new Scene.EnemyShip();
    },
    getBoss: function () {
        return new Scene.Boss();
    },
};
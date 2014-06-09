var Scene = Scene || {};
//movement, x, y, radius, hitpoints, maxSpeed, renderType
Scene.GameLogicConstants = {
    ENEMY_TYPE_1: { movement: 'streight', radius: 2, hitpoints: 1, maxSpeed: 1, renderType: Scene.GameObjectRenderType.ENEMY_SHIP },
    ENEMIES_LEVEL_1: 100,
    LEVEL_1_SPAWN_TIME: 1000,
};
var GameLogic = Class.create({
    initialize: function () {
        this.level = 1;
        this.isBossTime = false;
        this.callForEnemiesCounter = 0;
        this.enemiesCreated = 0;
        this.enemies = [];
    },
    getNewEnemies: function (enemiesArray) {
        this.callForEnemiesCounter++;

        var enemiesAlive = Object.keys(enemiesArray).length;
        if (enemiesAlive == 0 && this.enemiesCreated > 0) {
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
                    return EnemyFactory.getBoss();
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

var EnemyFactory = function () {
    return {
        //movement, x, y, radius, hitpoints, maxSpeed, renderType
        getEasyEnemy: function () {
            return new Scene.EnemyShip(new StraightMove(4, false), 100, 0, 1, 4, Scene.GameObjectRenderType.ENEMY_SHIP);
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
}
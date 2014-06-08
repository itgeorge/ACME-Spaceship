var Engine = Class.create({    
    initialize: function(gameLogic) {
        this.gameLogic = gameLogic;
        this.enemies = [];
    },
    spawnEnemies: function spawnEnemies() {
        var newEnemies = this.gameLogic.getNewEnemies(this.enemies);
        this.enemies.push.apply(this.enemies, newEnemies);
    }
});
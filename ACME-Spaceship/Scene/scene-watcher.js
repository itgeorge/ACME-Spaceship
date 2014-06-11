var SceneWatcher = Class.create({
    initialize: function () {
        this.healthIndicator = document.getElementById("health-indicator");
        this.shieldIndicator = document.getElementById("shield-indicator");
        this.seekerCounter = document.getElementById("seeker-counter");
        this.laserCounter = document.getElementById("laser-counter");
        this.score = document.getElementById("score");
        this.level = document.getElementById("level");
        this.scoreValue = 0;

    },
    updatePlayerShip: function updatePlayerShip(ship) {
        this.healthIndicator.style.width = ((ship.getHitpointsPercent()/100) * 200) + "px";
        this.shieldIndicator.style.width = ((ship.getShieldPercent() / 100) * 200) + "px";
        this.seekerCounter.innerHTML = ship.getSeekerAmmo();
        this.laserCounter.innerHTML = ship.getLaserAmmo();
        
        this.scoreValue += 0.01;
        this.score.innerHTML = (this.scoreValue | 0);
    },
    updateLevel: function updateLevel(level) {
        this.level.innerHTML = level;
    }
});
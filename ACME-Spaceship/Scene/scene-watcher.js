var SceneWatcher = Class.create({
    initialize: function () {
        this.healthIndicator = document.getElementById("health-indicator");
        this.shieldIndicator = document.getElementById("shield-indicator");
    },
    updatePlayerShip: function updatePlayerShip(ship) {
        this.healthIndicator.style.width = ship.getHitpointsPercent() + "%";
        this.shieldIndicator.style.width = ship.getShieldPercent() + "%";
    }
});
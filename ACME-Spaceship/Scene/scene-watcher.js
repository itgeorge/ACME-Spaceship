﻿var SceneWatcher = Class.create({
    initialize: function () {
        this.healthIndicator = document.getElementById("health-indicator");
        this.shieldIndicator = document.getElementById("shield-indicator");
        this.seekerCounter = document.getElementById("seeker-counter");
        this.laserCounter = document.getElementById("laser-counter");
    },
    updatePlayerShip: function updatePlayerShip(ship) {
        this.healthIndicator.style.width = ((ship.getHitpointsPercent()/100) * 200) + "px";
        this.shieldIndicator.style.width = ((ship.getShieldPercent() / 100) * 200) + "px";
        this.seekerCounter.innerHTML = ship.getSeekerAmmo();
        this.laserCounter.innerHTML = ship.getLaserAmmo();
    }
});
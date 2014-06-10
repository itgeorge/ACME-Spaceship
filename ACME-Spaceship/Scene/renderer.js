/// <reference path="game-object-type.js" />
/// <reference path="game-object-render-type.js" />
var Scene = Scene || {};
Scene.Renderer = Class.create({
    initialize: function (canvasElement) {
        this.ctx = canvasElement.getContext("2d");
        this.canvasEl = canvasElement;

        this.renderObjects = [];
        this.typeImages = {};

        for (key in Scene.GameObjectRenderType) {
            var value = Scene.GameObjectRenderType[key];
            this.typeImages[value] = document.getElementById(value);
        }
    },
    renderAll: function renderAll(objs, clearScreen) {
        if (clearScreen) {
            this.ctx.fillStyle = "#000000";
            this.ctx.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        }

        var playerShip = null;

        for (var i = 0; i < objs.length; i++) {
            var obj = objs[i];

            if (obj.renderType != Scene.GameObjectRenderType.PLAYER_SHIP) {
                this._drawObj(obj);
            } else {
                playerShip = obj;
            }
        }

        if (playerShip) {
            this._drawObj(playerShip);
        }
    },
    _drawObj: function drawObj(obj) {
        var image = this.typeImages[obj.renderType];
        this.ctx.drawImage(image, obj.x - obj.radius, obj.y - obj.radius, obj.radius * 2, obj.radius * 2);
    }
});
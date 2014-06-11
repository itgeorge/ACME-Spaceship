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
            this.ctx.fillStyle = "#50557f";
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

        var imageWidthAttr = image.getAttribute("width");
        var imageHeightAttr = image.getAttribute("height");

        var width = imageWidthAttr || obj.radius * 2;
        var height = imageHeightAttr || obj.radius * 2;
        
        this.ctx.drawImage(image, obj.x - width / 2.0, obj.y - height / 2.0, width, height);

        //debug
        //this._debugDrawRadius(obj);
    },
    _debugDrawRadius: function (obj) {
        this.ctx.beginPath();
        this.ctx.arc(obj.x, obj.y, obj.radius, 0, 2 * Math.PI, false);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "#00FFFF";
        this.ctx.stroke();
        this.ctx.closePath();
    }
});
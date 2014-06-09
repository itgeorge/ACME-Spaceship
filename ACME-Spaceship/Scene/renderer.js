/// <reference path="game-object-type.js" />
/// <reference path="game-object-render-type.js" />
var Scene = Scene || {};
Scene.Renderer = Class.create({
    initialize: function (canvasElement) {
        this.ctx = canvasElement.getContext("2d");
        this.canvasEl = canvasElement;

        this.renderObjects = [];
        this.typeImages = {};

        this.typeImages[Scene.GameObjectRenderType.PLAYER_SHIP] =
            document.getElementById(Scene.GameObjectRenderType.PLAYER_SHIP);

        this.typeImages[Scene.GameObjectRenderType.BULLET] =
            document.getElementById(Scene.GameObjectRenderType.BULLET);
    },
    renderAll: function renderAll(objs) {
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        
        for (var i = 0; i < objs.length; i++) {
            var obj = objs[i];
            var image = this.typeImages[obj.renderType];

            this.ctx.drawImage(image, obj.x, obj.y, obj.radius, obj.radius);
        }
    }
});
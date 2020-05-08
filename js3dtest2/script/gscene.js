
/**
 * Three.js Sceneをラップしたユーティリティクラス
 */
class GScene {
    /**
     * @constructor
     * @param {HTMLCanvasElement} canvas - 対象となる canvas element
     */
    constructor(canvas) {
        /**
         * @type {HTMLCanvasElement}
         */
        this.canvasElement = canvas;

        this.scene = new THREE.Scene();

        return this.scene;
    }
}

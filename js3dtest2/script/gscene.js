
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
        console.log("canvas:" + canvas);
        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvasElement
        });
        this.renderer.setSize(1024, 1024);
        this.renderer.setClearColor(0x000000);

        this.updateListeners = [];

        //        return this.scene;
    }

    createCamera(updateCamera) {
        /** カメラの生成 */
        this.camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
        this.cameraTarget = new THREE.Vector3(0, 30, 0);
        this.camera.position.x = -5;
        this.camera.position.y = 10;
        this.camera.position.z = 50;

        var ccamera = this.camera;
        var ccamerat = this.cameraTarget;

        this.updateListeners.push(function (frame) {
            updateCamera(ccamera, ccamerat, frame);
        });
    }

    createLight(updateLight) {
        /**　光源の生成 */
        this.directionalLight = new THREE.DirectionalLight(0xffffff);

        var light = this.directionalLight;

        this.updateListeners.push(function (frame) {
            updateLight(light, frame);
        });
        this.scene.add(this.directionalLight);

        this.ambientLight = new THREE.AmbientLight(0xaaaaaa);
        this.scene.add(this.ambientLight);

    }

    addMesh(mesh) {
        this.scene.add(mesh);
    }

    renderMesh() {
        this.renderer.render(this.scene, this.camera);
    }

    update(frame) {
        this.updateListeners.forEach(function (listener) {
            listener(frame);
        });
    };
}

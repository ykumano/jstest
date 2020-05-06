window.onload = function () {
    var updateListeners = [];
    var solMesh = null;

    /**
     * 描画更新処理
     * @param {*} frame 
     */
    var update = function (frame) {
        updateListeners.forEach(function (listener) {
            listener(frame);
        });
    };

    var scene = new THREE.Scene();

    updateListeners.push(function (frame) {
        if (solMesh !== null) {
//           solMesh.rotation.z = frame * 0.02;
        }
    });

    /** カメラの生成 */
    var camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
    var cameraTarget = new THREE.Vector3(0, 10, 0);
    updateListeners.push(function (frame) {
        /**
         * カメラ位置更新処理
         */
        camera.position.x = Math.cos(-frame * 0.04) * 50;
        camera.position.y = 15;
        camera.position.z = Math.sin(-frame * 0.04) * 50;
        camera.lookAt(cameraTarget);
    });

    /**　光源の生成 */
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    updateListeners.push(function (frame) {
        /** 光源位置更新処理 */
        directionalLight.position.x = Math.cos(frame * -0.001) * 100;
        directionalLight.position.y = 100;
        directionalLight.position.z = Math.sin(frame * -0.001) * 100;
    });
    scene.add(directionalLight);

    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    // var ground = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), new THREE.MeshPhongMaterial({
    //     color: 0x555555,
    //     shininess: 1,
    // }));
    // ground.rotation.x = Math.PI * -0.5;
    // scene.add(ground);

    var renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("c")
    });
    renderer.setSize(1024, 1024);
    renderer.setClearColor(0x000000);

    var parser = new vox.Parser();
    var parseTasks = [
//        "res/SolValou.vox",
        "res/Rynex.vox",
    ].map(function (path) {
        return parser.parse(path);
    });

    Promise
        .all(parseTasks)
        .then(function (voxelDataArray) {
            voxelDataArray.forEach(function (voxelData, i) {
                var builder = new vox.MeshBuilder(voxelData, {
                    voxelSize: 1.0,
                    vertexColor: false,
                    optimizeFaces: true,
                });
                solMesh = builder.createMesh();

                // solMesh.position.x = Math.random() * 100 - 50;
                // solMesh.position.z = Math.random() * 100 - 50;

                // solMesh.rotation.y = Math.random() * Math.PI * 2;

                var fv = new THREE.Vector3();
                // updateListeners.push(function(frame) {
                //     fv.set(0, 0, 0.1);
                //     fv.applyQuaternion(mesh.quaternion);
                //     mesh.position.add(fv);
                // });

//                solMesh.rotation.z = Math.PI / 3;

                scene.add(solMesh);
            });
        });

    var frame = 0;
    var render = function () {
        update(frame++);
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };
    render();
};

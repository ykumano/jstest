window.onload = function () {
    var updateListeners = [];
    var meshList = [];
    var readNum = 0;

    var canvasElement = null;
    var posX = 0;
    var posY = 0;

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
        if (readNum == 2) {
            for (i = 0; i < 2; i++) {
                m = meshList[i];
                if (i == 0) {
                    m.position.x = posX/50-10;
                    m.position.y = posY/50-30;
                } else {
                    m.rotation.x = frame * 0.04;
                }
            }
        }
    });

    /** カメラの生成 */
    var camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
    var cameraTarget = new THREE.Vector3(0, 30, 0);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 50;
    updateListeners.push(function (frame) {
        /**
         * カメラ位置更新処理
         */
        /*
                 camera.position.x = Math.cos(-frame * 0.04) * 50;
                camera.position.y = 15;
                camera.position.z = Math.sin(-frame * 0.04) * 50;
                camera.lookAt(cameraTarget);
        */
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

    canvasElement = document.getElementById("c");

    var renderer = new THREE.WebGLRenderer({
        canvas: canvasElement
    });
    renderer.setSize(1024, 1024);
    renderer.setClearColor(0x000000);

    var parser = new vox.Parser();
    var parseTasks = [
        "res/SolValou.vox",
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
                var mesh = builder.createMesh();

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
                meshList.push(mesh);
                scene.add(mesh);
                readNum++;
            });
        });


    function press(x, y) {
        console.log("press :" + x + "," + y);
    }
    function move(x, y) {
        console.log("move :" + x + "," + y);
        posX = x;
        posY = y;
    }
    function release(x, y) {
        console.log("release :" + x + "," + y);

    }

    {
        let mouseFlag = false;
        let scale = 1.0;

        /** マウスクリックイベントの登録 */
        canvasElement.addEventListener('mousedown', function (e) {
            mouseFlag = true;
            press((e.clientX - canvasElement.offsetLeft) / scale, (e.clientY - canvasElement.offsetTop) / scale);
        });
        canvasElement.addEventListener('mousemove', function (e) {
            if (mouseFlag) {
                move((e.clientX - canvasElement.offsetLeft) / scale, (e.clientY - canvasElement.offsetTop) / scale);
            }
        });
        canvasElement.addEventListener('mouseup', function (e) {
            mouseFlag = false
            release((e.clientX - canvasElement.offsetLeft) / scale, (e.clientY - canvasElement.offsetTop) / scale);
        });

        /** タッチイベントの登録 */
        canvasElement.addEventListener('touchstart', function (e) {
            var touch = e.changedTouches[0];
            press((touch.clientX - canvasElement.offsetLeft) / scale, (touch.clientY - canvasElement.offsetTop) / scale);
        });
        canvasElement.addEventListener('touchmove', function (e) {
            var touch = e.changedTouches[0];
            move((touch.clientX - canvasElement.offsetLeft) / scale, (touch.clientY - canvasElement.offsetTop) / scale);
        });
        canvasElement.addEventListener('touchend', function (e) {
            var touch = e.changedTouches[0];
            release((touch.clientX - canvasElement.offsetLeft) / scale, (touch.clientY - canvasElement.offsetTop) / scale);
        });
    }


    var frame = 0;
    var render = function () {
        update(frame++);
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };
    render();
};

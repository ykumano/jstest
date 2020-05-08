window.onload = function () {
    var meshList = [];
    var readNum = 0;

    var gscene = new GScene(document.getElementById("c"));
    /*
    updateListeners.push(function (frame) {
        if(readNum == 2){
            for(i=0; i<2; i++){
                m = meshList[i];
                if(i==0){
                    m.rotation.y = frame * 0.04;
                }else {
                    m.rotation.x = frame * 0.04;
                }
            }
        }
    });
*/
    function updateCamera(camera, cameraTarget, frame) {
        /*
                camera.position.x = Math.cos(-frame * 0.04) * 50;
                camera.position.y = 15;
                camera.position.z = Math.sin(-frame * 0.04) * 50;
                camera.lookAt(cameraTarget);
        */
    }
    gscene.createCamera(updateCamera);

    function updateLight(directionalLight, frame) {
        directionalLight.position.x = Math.cos(frame * -0.001) * 100;
        directionalLight.position.y = 100;
        directionalLight.position.z = Math.sin(frame * -0.001) * 100;
    }
    gscene.createLight(updateLight);

    var solvalou = null;
    var rynex = null;
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

                meshList[i] = mesh;
                readNum++;
            });
        })
        .then(function () {
            console.log("read:"+readNum);
            solvalou = meshList[0];
            rynex = meshList[1];

            gscene.addMesh(solvalou);
            gscene.addMesh(rynex);
        });



    function updateFrame() {
        solvalou.rotation.y += 0.03;
        rynex.rotation.x += 0.03;
    }

    var frame = 0;
    var render = function () {
        gscene.update(frame++);
        if(readNum == 2){
            updateFrame();
        }

        gscene.renderMesh();
        requestAnimationFrame(render);
    };
    render();
};

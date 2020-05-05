﻿window.onload = function() {
  var updateListeners = [];
  var update = function(frame) {
      updateListeners.forEach(function(listener) {
          listener(frame);
      });
  };
  
  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
  var cameraTarget = new THREE.Vector3(0, 10, 0);
  updateListeners.push(function(frame) {
      camera.position.x = Math.cos(frame * 0.004) * 50;
      camera.position.y = 15;
      camera.position.z = Math.sin(frame * 0.004) * 50;
      camera.lookAt(cameraTarget);
  });
  
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  updateListeners.push(function(frame) {
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
      // "vox/mv0.98/p20.vox",
      "res/SolValou.vox",
  ].map(function(path) {
      return parser.parse(path);
  });
  Promise
      .all(parseTasks)
      .then(function(voxelDataArray) {
          voxelDataArray.forEach(function(voxelData, i) {
              var builder = new vox.MeshBuilder(voxelData, {
                  voxelSize: 1.0,
                  vertexColor: false,
                  optimizeFaces: true,
              });
              var mesh = builder.createMesh();
              
              // mesh.position.x = Math.random() * 100 - 50;
              // mesh.position.z = Math.random() * 100 - 50;

              // mesh.rotation.y = Math.random() * Math.PI * 2;
              
              var fv = new THREE.Vector3();
              // updateListeners.push(function(frame) {
              //     fv.set(0, 0, 0.1);
              //     fv.applyQuaternion(mesh.quaternion);
              //     mesh.position.add(fv);
              // });
              
              scene.add(mesh);
          });
      });
  
  var frame = 0;
  var render = function() {
      update(frame++);
      renderer.render(scene, camera);
      requestAnimationFrame(render);
  };
  render();
};


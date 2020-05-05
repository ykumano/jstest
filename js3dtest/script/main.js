var scene = new scene = new THREE.Scene();

// パーサーを作ります
var parser = new vox.Parser();

// *.voxファイルを読み込みます
parser.parse("res/SolValou.vox").then(function(voxelData) { // ←ボクセルデータが取れます

  // データ全体の大きさ
  voxelData.size; // => { x: number, y: number, z: number }

  // ボクセルの配列
  voxelData.voxels; // => [Voxel, Voxel, Voxel, ...]

  // ボクセル一個のデータ
  voxelData.voxels[0]; // => { x: number, y: number, z: number, colorIndex: number }

  // カラーパレット
  voxelData.palette; // => [Color, Color, Color, ...]
  voxelData.palette[0]; // => { r: number, g: number, b: number, a: number }

// ビルダーを作ります。引数にボクセルデータをわたします
var builder = new vox.MeshBuilder(voxelData);
// THREE.Meshを作ります
var mesh = builder.createMesh();

// THREE.Sceneに追加するなどして使ってください
scene.add(mesh);

});


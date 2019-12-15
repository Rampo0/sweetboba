function Monkey(scene) {

    var loader = new THREE.GLTFLoader();
    var mixer;
    var mesh;

    loader.load('assets/models/Cup.gltf', function (gltf) {
        mesh = gltf.scene;
        mesh.position.x = 1;
        scene.add(mesh);
        mixer = new THREE.AnimationMixer(mesh);
        mixer.clipAction( gltf.animations[0] ).play();

    }, undefined, function (e) {
        console.error(e);
    });

    this.update = function (time) {
        // console.log(time);
        if(mixer){
            mixer.update(time);
        }
        
    }
}
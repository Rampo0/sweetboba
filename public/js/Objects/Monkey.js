function Monkey(scene) {

    var loader = new THREE.GLTFLoader();
    var mixer;

    loader.load('assets/models/monkey.glb', function (gltf) {
        model = gltf.scene;
        scene.add(model);
        mixer = new THREE.AnimationMixer(model);
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
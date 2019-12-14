function Obstacle(scene,world, material, xPosition){

     // Init Physics

     var shape = new CANNON.Box(new CANNON.Vec3(15, 15 , 15));
     var mass = 0;
     this.body = new CANNON.Body({
         mass: mass,
         material: material
     });
 
     this.body.addShape(shape);
     this.body.linearDamping = 0.0;
     this.body.position.set(xPosition,15,-3000);
     this.body.tag = "Obstacle";
     this.body.collisionResponse = 0;
     // this.body.fixedRotation = true;
     // this.body.updateMassProperties();
     
     world.addBody(this.body);
     // onCollde
 
     this.body.addEventListener("collide",function(e){
         if(e.body.tag == "Player"){
             e.body.health -= 0.25;
         }
     });
 
    var speed = 20;

    var loader = new THREE.GLTFLoader();
    var mixer;
    var mesh;

    loader.load('assets/models/Cup.gltf', function (gltf) {
       
        mesh = gltf.scene;
        // mesh.name = this.body.id.toString();
        mesh.scale.set(10,10,10);
       
        scene.add(mesh);
        mixer = new THREE.AnimationMixer(mesh);
        // mixer.clipAction( gltf.animations[0] ).play();

    }, undefined, function (e) {
        console.error(e);
    });

    this.update = function (time) {
        
        // console.log(time);
        if(mixer){
            // mixer.update(time);
        }

        this.body.position.z += speed;
    
        if(this.body.position.z >= 100){
            world.remove(this.body);
            scene.remove(scene.getObjectByName(this.body.id.toString()));
        }

        if(mesh != null){

            mesh.position.copy(this.body.position);
            mesh.quaternion.copy(this.body.quaternion);
            mesh.name = this.body.id.toString();
        }

    }

}
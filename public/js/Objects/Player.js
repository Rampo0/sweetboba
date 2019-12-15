function Player(scene, world, material , {scaleX , scaleY , radSegments} , audioManager){
    
    // var geometry = new THREE.ConeBufferGeometry( scaleX,scaleY,radSegments );
    // var material = new THREE.MeshBasicMaterial( {color: "#4ca8c9"} );
    // var mesh = new THREE.Mesh( geometry, material );

    var loader = new THREE.GLTFLoader();
    var mixer;
    var mesh;

    loader.load('assets/models/boba.gltf', function (gltf) {
       
        mesh = gltf.scene;
        // mesh.name = this.body.id.toString();
        mesh.scale.set(10,10,10);
       
        scene.add(mesh);
        mixer = new THREE.AnimationMixer(mesh);
        mixer.clipAction( gltf.animations[0] ).play();

    }, undefined, function (e) {
        console.error(e);
    });
    
    // Init Physics

    var shape = new CANNON.Box(new CANNON.Vec3(scaleX / 2, scaleY / 2 , scaleX / 2));
    var mass = 5;
    this.body = new CANNON.Body({
        mass: mass,
        material : material
    });

    this.body.addShape(shape);
    this.body.linearDamping = 0.0;
    this.body.position.set(0,15,0);
    this.body.tag = "Player";
    this.body.collisionResponse = 0;
  
    // Player Status

    this.body.health = 3;
        
    world.addBody(this.body);
    
    // mesh.name = this.body.id.toString();
    // scene.add(mesh);

    this.body.addEventListener("collide",function(e){
        // console.log("Collided with body:",e.body.tag);
        if(e.body.tag == "Obstacle"){
            world.remove(e.body);
            scene.remove(scene.getObjectByName(e.body.id.toString()));
            audioManager.PlaySound('duar.ogg', false);
        }
    });

    var currentPressedKeys = {};
    
    function BuildController(){
        function handleKeyDown(event) {
          currentPressedKeys[event.keyCode] = true
        }
    
        function handleKeyUp(event) {
            currentPressedKeys[event.keyCode] = false
        }
    
        document.onkeydown = handleKeyDown
        document.onkeyup = handleKeyUp
  
    }

    BuildController()
    
    this.update = function(time, sensorY){

        if(mixer){
            mixer.update(time);
        }
        
        if(this.body.position.y <= 15){
            this.body.position.y = 15;
        }
     
        if (currentPressedKeys[37] && this.body.position.x > -185) {
            // Left
            this.body.velocity.x = -100;
        }else if (currentPressedKeys[39] && this.body.position.x < 185) {
            // Right
            this.body.velocity.x = 100;
        }else if(sensorY != null){
            if(sensorY > 0 && this.body.position.x < 185){
                this.body.velocity.x = sensorY * 10;
            }else if(sensorY < 0 && this.body.position.x > -185){
                this.body.velocity.x = sensorY * 10;    
            }else{
                this.body.velocity.x = 0;    
            }
        }else{
            this.body.velocity.x = 0;    
        }

        // Jump
        // if(currentPressedKeys[32]){
        //     this.body.velocity.y = 100;    
        // }

        // block health decrement
        if(this.body.health < 0){
            this.body.health = 0;
        }

        if(mesh != null){
            mesh.position.copy(this.body.position);
            mesh.quaternion.copy(this.body.quaternion);
        }
    }
 
}




  // this.body.fixedRotation = true;
    // this.body.updateMassProperties();

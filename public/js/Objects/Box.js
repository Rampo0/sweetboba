function Box(scene, world, material,  xPosition){
    var scaleX = 30 , scaleY =30 , scaleZ = 30 ;
    var geometry = new THREE.BoxBufferGeometry( scaleX , scaleY, scaleZ );
    var material = new THREE.MeshBasicMaterial( {color: "#030303"} );
    var mesh = new THREE.Mesh( geometry, material );
    
    // Init Physics

    var shape = new CANNON.Box(new CANNON.Vec3(scaleX / 2, scaleY / 2 , scaleZ / 2));
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
    mesh.name = this.body.id.toString();

    scene.add(mesh);

    // onCollde

    this.body.addEventListener("collide",function(e){
        if(e.body.tag == "Player"){
            e.body.health-= 0.25;
        }
    });

    var speed = 20;
    this.update = function(time){
        
        this.body.position.z += speed;
        // this.body.velocity.z = speed * 50;
        
        // if(this.body.position.y <= 15){
        //     this.body.position.y = 15;
        // }

        if(this.body.position.z >= 100){
            world.remove(this.body);
            scene.remove(scene.getObjectByName(this.body.id.toString()));
        }
      
        mesh.position.copy(this.body.position);
        mesh.quaternion.copy(this.body.quaternion);
        
        
    }

}
function ContinousePlane(scene, world, groundMaterial, zPosition){

    var texture = THREE.ImageUtils.loadTexture( "assets/sprites/GamePlayUI_ jalan texture.png" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 10, 100 );

    
    var geometry =  new THREE.PlaneGeometry( 400, 5000, 1, 1 );
    // var material = new THREE.MeshBasicMaterial({color: '#88c477', side: THREE.DoubleSide} );
    var material = new THREE.MeshLambertMaterial({ map : texture }); 
    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2;
    mesh.position.set(0,0,zPosition);
  
    // Init Physics

    var groundShape = new CANNON.Plane();
    // 0 mass make it static
    this.body = new CANNON.Body({ mass: 0, material: groundMaterial });
    this.body.addShape(groundShape);
    this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    this.body.position.set(0,0,zPosition);
    
    // world.addBody(this.body);
    mesh.name = this.body.id.toString();
    scene.add(mesh);
    
    mesh.position.copy(this.body.position);
    mesh.quaternion.copy(this.body.quaternion);


    var speed = 5;

    this.update = function(time){
        this.body.position.z += speed;
        
        if(this.body.position.z >= 3000){
            world.remove(this.body);
            scene.remove(scene.getObjectByName(this.body.id.toString()));
        }

        mesh.position.copy(this.body.position);
        mesh.quaternion.copy(this.body.quaternion);

    }
}
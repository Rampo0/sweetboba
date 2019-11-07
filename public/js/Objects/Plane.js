function Plane(scene, world , groundMaterial){

    var geometry =  new THREE.PlaneGeometry( 400, 5000, 50, 50 );
    var material = new THREE.MeshBasicMaterial({color: '#88c477', side: THREE.DoubleSide} );
    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2;
    mesh.position.set(0,0,-2000);
  
    // Init Physics

    var groundShape = new CANNON.Plane();
    // 0 mass make it static
    this.body = new CANNON.Body({ mass: 0, material: groundMaterial });
    this.body.addShape(groundShape);
    this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    this.body.position.set(0,0,-2000);
    
    // world.addBody(this.body);
    mesh.name = this.body.id.toString();
    scene.add(mesh);
    
    mesh.position.copy(this.body.position);
    mesh.quaternion.copy(this.body.quaternion);

    this.update = function(time){
      
    }
 
}
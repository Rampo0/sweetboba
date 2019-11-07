function Cone(scene, world, material , {scaleX , scaleY , radSegments}){
    
    var geometry = new THREE.ConeBufferGeometry( scaleX,scaleY,radSegments );
    var material = new THREE.MeshBasicMaterial( {color: "#4ca8c9"} );
    var mesh = new THREE.Mesh( geometry, material );
    
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
    // this.body.fixedRotation = true;
    // this.body.updateMassProperties();
        
    world.addBody(this.body);
    
    mesh.name = this.body.id.toString();
    scene.add(mesh);

    this.body.addEventListener("collide",function(e){
        // console.log("Collided with body:",e.body.tag);
        if(e.body.tag == "Obstacle"){
            world.remove(e.body);
            scene.remove(scene.getObjectByName(e.body.id.toString()));
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
        
        if(this.body.position.y <= 15){
            this.body.position.y = 15;
        }

        if(sensorY){
            this.body.velocity.x = sensorY * 100;
        }
     
        if (currentPressedKeys[37]) {
            // Kiri
            // console.log("kiri")
            this.body.velocity.x = -100;
        }else if (currentPressedKeys[39]) {
            // Kanan
            // console.log("kanan")
            this.body.velocity.x = 100;
        }else{
            this.body.velocity.x = 0;    
        }

        if(currentPressedKeys[32]){
            this.body.velocity.y = 100;    
        }

        mesh.position.copy(this.body.position);
        mesh.quaternion.copy(this.body.quaternion);

    }
 
}
function Background(scene){
    

    var texture = THREE.ImageUtils.loadTexture( "assets/sprites/GamePlayUI_BG.png" );

    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set( 1, 1 );

    var geometry =  new THREE.PlaneGeometry( 11000, 9000, 1);
    // var material = new THREE.MeshBasicMaterial({color: '#81c4a7', side: THREE.DoubleSide} );
    var material = new THREE.MeshLambertMaterial({ map : texture });
    var mesh = new THREE.Mesh(geometry, material);
    // mesh.rotation.z = Math.PI / 2;
    mesh.position.set(0,0,-5000);
    mesh.rotateX(-0.4);

    scene.add(mesh);

    this.update = function(time){
      
    }
 
}
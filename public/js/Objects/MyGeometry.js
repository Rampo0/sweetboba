function MyGeometry(scene){
    var verticesOfCube = [
        -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
        -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
    ];
    
    var indicesOfFaces = [
        2,1,0,    0,3,2,
        0,4,7,    7,3,0,
        0,1,5,    5,4,0,
        1,2,6,    6,5,1,
        2,3,7,    7,6,2,
        4,5,6,    6,7,4
    ];
    
    var geometry = new THREE.PolyhedronBufferGeometry( verticesOfCube, indicesOfFaces);
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00} );
    var mesh = new THREE.Mesh( geometry, material ) ;
    mesh.position.set(30,10,10);
    scene.add( mesh );

    this.update = function(time){
        mesh.rotation.y += 0.01;
    }
}
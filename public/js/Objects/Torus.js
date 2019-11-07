function Torus(scene){
    var geometry = new THREE.TorusBufferGeometry( 10, 3, 16, 100 );
    var wireframe = new THREE.WireframeGeometry( geometry );
    var material = new THREE.MeshBasicMaterial( { color: "#6dbcd6" } );
    var torus = new THREE.Mesh( geometry, material );
    
    var line = new THREE.LineSegments( wireframe );
    line.material.depthTest = false;
    line.material.opacity = 1;
    line.material.color = new THREE.Color("#030303");
    line.material.transparent = true;
    line.position.set(0 ,0 ,0);
    torus.position.set(0 ,0 ,0);
    
    scene.add( line );
    scene.add ( torus );

    this.update = function(time, radiusTop, radiusBottom,  height, radSegments , heightSegments){
        line.rotation.y += 0.01;
        torus.rotation.y += 0.01;

        torus.geometry.dispose();
        geometry = new THREE.TorusBufferGeometry( radiusTop, radiusBottom, height, radSegments , heightSegments );
        torus.geometry = geometry;
        
        line.geometry.dispose();
        wireframe = new THREE.WireframeGeometry( geometry );
        line.geometry = wireframe;
    }
}


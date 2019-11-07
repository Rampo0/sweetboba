function Cylinder(scene,radiusTop, radiusBottom,  height, radSegments , heightSegments ){
    var geometry = new THREE.CylinderGeometry( radiusTop, radiusBottom, height, radSegments ,heightSegments );
    var material = new THREE.MeshBasicMaterial( { color: "#6dbcd6" } );
    var wireframe = new THREE.WireframeGeometry( geometry );
    var cylinder = new THREE.Mesh( geometry, material );
    
    var line = new THREE.LineSegments( wireframe );
    line.material.depthTest = false;
    line.material.opacity = 1;
    line.material.color = new THREE.Color("#030303");
    line.material.transparent = true;
    line.position.set(0,0 ,0);

    cylinder.position.set(0,0,0);

    scene.add( line );
    scene.add (cylinder);

    this.update = function(time, radiusTop, radiusBottom, height, radSegments ,heightSegments){
        cylinder.rotation.z += 0.01;
        line.rotation.z += 0.01;

        cylinder.geometry.dispose();
        geometry = new THREE.CylinderGeometry( radiusTop, radiusBottom, height, radSegments , heightSegments );
        cylinder.geometry = geometry;
        
        line.geometry.dispose();
        wireframe = new THREE.WireframeGeometry( geometry );
        line.geometry = wireframe;
    }
}


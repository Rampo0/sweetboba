function SceneSubject(scene) {
	
	const radius = 2;
	const mesh = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(radius, 2), new THREE.MeshStandardMaterial({ flatShading: true }));

	mesh.position.set(-900, -200, -900);

	scene.add(mesh);
	
	this.update = function(time) {
		const scale = 100;

		mesh.scale.set(scale, scale, scale);
	}
}
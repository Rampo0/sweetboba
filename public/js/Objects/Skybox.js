function Skybox(scene){

    let materialArray = [];
    let texture_ft = new THREE.TextureLoader().load('assets/textures/GamePlayUI_BG.png');
    let texture_bk = new THREE.TextureLoader().load('assets/textures/GamePlayUI_BG.png');
    let texture_lf = new THREE.TextureLoader().load('assets/textures/GamePlayUI_BG.png');
    let texture_rt = new THREE.TextureLoader().load('assets/textures/GamePlayUI_BG.png');
    let texture_up = new THREE.TextureLoader().load('assets/textures/GamePlayUI_BG.png');
    let texture_dn = new THREE.TextureLoader().load('assets/textures/GamePlayUI_BG.png');

    materialArray.push(new THREE.MeshBasicMaterial({map : texture_ft}));
    materialArray.push(new THREE.MeshBasicMaterial({map : texture_bk}));
    materialArray.push(new THREE.MeshBasicMaterial({map : texture_up}));
    materialArray.push(new THREE.MeshBasicMaterial({map : texture_dn}));
    materialArray.push(new THREE.MeshBasicMaterial({map : texture_rt}));
    materialArray.push(new THREE.MeshBasicMaterial({map : texture_lf}));
    
    for(let i=0; i < 6; i++){
        materialArray[i].side = THREE.BackSide;
    }

    let skyboxGeo = new THREE.BoxGeometry(10000,10000,10000);
    // let skyboxGeo = new THREE.BoxGeometry(10,10,10);
    let skybox = new THREE.Mesh(skyboxGeo , materialArray);
    // skybox.position.set(-21,21,21);
    scene.add(skybox);
    
  
    this.update = function(time){

    }

}


function AudioManager(camera){
    
    // create an AudioListener and add it to the camera
    var listener = new THREE.AudioListener();
    camera.add(listener);

    // create a global audio source
    var sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();

    this.PlaySound = function(soundName, loop){
        audioLoader.load('/assets/sounds/' + soundName, function (buffer) {
            if(sound.source){
                sound.stop();
            }
            sound.setBuffer(buffer);
            sound.setLoop(loop);
            sound.setVolume(1);
            sound.play();
        });
    }
    

}
function Destroy(scene, object) {
    var selectedObject = scene.getObjectByName(object.name);
    scene.remove( selectedObject );
}

function GetRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
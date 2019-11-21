function BasicScene(canvas) {

    //Init
    const clock = new THREE.Clock();
    
    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    // Renderer Stats
    const stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left  = '0px';
    stats.domElement.style.top = '0px';
    $('.route-view').append(stats.domElement);

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const sceneObjects = createSceneObjects(scene);
    var timeStep = 1 / 60;
    // var axesHelper = new THREE.AxesHelper(500);
    // scene.add( axesHelper );

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    // End Init
    
    function buildScene() {
        const scene = new THREE.Scene();
        // scene.background = new THREE.Color("#ff9ae9");

        return scene;
    }
    
    function buildRender({
        width,
        height
    }) {
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        renderer.setClearColor(0x333333);
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        return renderer;
    }

    function buildCamera({
        width,
        height
    }) {
        const aspectRatio = width / height;
        const fieldOfView = 55;
        const nearPlane = 1;
        const farPlane = 30000;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.set(0, 0, 10);
        camera.rotateX(-0.4);
        
        return camera;
    }
       

    function createSceneObjects(scene) {

        // Static Object
        const skybox = new Skybox(scene);
        const PointLight = new GeneralLights(scene);
        const Ambientlight = new AmbientLight(scene);
        var monkey = new Monkey(scene);
        const sceneObjects = [
            monkey,
        ];

        return sceneObjects;
    }

    this.update = function (stop) {

        stats.begin();

        const elapsedTime = clock.getElapsedTime();
        var clockDelta = clock.getDelta();
     
        for (let i = 0; i < sceneObjects.length; i++) {
            sceneObjects[i].update(0.01);
        }
 
        renderer.render(scene, camera);

        if (stop == true) {
            clearBuffer();
        }

        stats.end();

    }

    this.onWindowResize = function () {
        const {
            width,
            height
        } = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }

    function clearBuffer(){
        // clear program that still running
    }

}
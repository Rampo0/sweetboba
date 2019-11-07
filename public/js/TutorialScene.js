function TutorialScene(canvas) {

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
    document.body.appendChild(stats.domElement);

    var rendererStats	= new THREEx.RendererStats()
    rendererStats.domElement.style.position	= 'absolute'
    rendererStats.domElement.style.left	= '0px'
    rendererStats.domElement.style.bottom	= '0px'
    document.body.appendChild( rendererStats.domElement )

    const groundMaterial = new CANNON.Material("groundMaterial");
    const slipperyMaterial = new CANNON.Material("slipperyMaterial");        

    var controls = new function () {
        this.radSegments = 12;
        this.heightSegments = 1;
        this.height = 20;
        this.radTop = 5;
        this.radBot = 5;
    };

    const gui = new dat.GUI();
    var cylinderRad = 12;
    var cyHeight = 20;
    var cyRadTop = 5;
    var cyRadBot =5;
    var cyHeightSeg = 1;

    gui.add(controls, 'radSegments', 0, 100).onChange(function (e) {
        cylinderRad = e;
    });

    gui.add(controls, 'height', 0, 100).onChange(function (e) {
        cyHeight = e;
    });

    gui.add(controls, 'radTop', 0, 100).onChange(function (e) {
        cyRadTop = e;
    });

    gui.add(controls, 'radBot', 0, 100).onChange(function (e) {
        cyRadBot = e;
    });

    gui.add(controls, 'heightSegments', 0, 100).onChange(function (e) {
        cyHeightSeg = e;
    });

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
        camera.position.set(0, 0, -80);
        camera.rotateX(-0.4)

        return camera;
    }
       

    function createSceneObjects(scene) {

        // Static Object

        const PointLight = new GeneralLights(scene);
        const Ambientlight = new AmbientLight(scene);
        // var cylinder = new Cylinder(scene, cyRadTop , cyRadBot, cyHeight , cylinderRad , cyHeight);
        var torus = new Torus(scene);
        var geometry = new MyGeometry(scene);
       
        // Assign Dynamic Object

        const sceneObjects = [
            torus,
            // cylinder,
            geometry,
        ];

        return sceneObjects;
    }
   
    this.update = function () {

        stats.begin();

        const elapsedTime = clock.getElapsedTime();
        sceneObjects[0].update(elapsedTime, cyRadTop , cyRadBot , cyHeight , cylinderRad , cyHeightSeg);
        sceneObjects[1].update(elapsedTime);
        
        // sceneObjects[0].update(elapsedTime);
        // for (let i = 0; i < sceneObjects.length; i++) {
            // sceneObjects[0].update(elapsedTime);
        // }
 
        renderer.render(scene, camera);
        rendererStats.update(renderer);
        
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

}
function SceneManager(canvas) {

    //Init
    const clock = new THREE.Clock();
    
    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    // Renderer Stats
    const stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);

    // var rendererStats	= new THREEx.RendererStats()
    // rendererStats.domElement.style.position	= 'absolute'
    // rendererStats.domElement.style.left	= '0px'
    // rendererStats.domElement.style.bottom	= '0px'
    // document.body.appendChild( rendererStats.domElement )

    const groundMaterial = new CANNON.Material("groundMaterial");
    const slipperyMaterial = new CANNON.Material("slipperyMaterial");        

    const world = buildWorld();
    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    // const audio = buildAudio(camera);
    const sceneObjects = createSceneObjects(scene);
    var timeStep = 1 / 60;
    
    // var axesHelper = new THREE.AxesHelper(500);
    // scene.add( axesHelper );

    // var controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    buildPhysicsContactMaterial();
  
    //Build Audio

    // create an AudioListener and add it to the camera
    var listener = new THREE.AudioListener();
    camera.add( listener );

    // create a global audio source
    var sound = new THREE.Audio( listener );

    // load a sound and set it as the Audio object's buffer
    var audioLoader = new THREE.AudioLoader();

    audioLoader.load( '/assets/sounds/bg.ogg', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 1 );
        sound.play();
    });

    // Sensor Setup

    var sensorY;
    var socket = io()
    
    socket.on('sensorY',function(data){
        // console.log(data);
        sensorY = data;
    })

    socket.on('sensorZ',function(data){
        console.log(data);
    })

    // var dataChat;
    // socket.on('chat',function(data){
    //     // console.log(data);
    //     dataChat = data;
    // })

    var player;

    // End Init
    
    function buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#ff9ae9");

        return scene;
    }


    function buildWorld() {
        const world = new CANNON.World();
        world.gravity.set(0, -150, 0);
        world.broadphase = new CANNON.NaiveBroadphase();
        world.solver.iterations = 10;

        return world;
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
        const nearPlane = 45;
        const farPlane = 30000;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.set(0, 200, 250);
        camera.rotateX(-0.4)

        return camera;
    }

    function createSceneObjects(scene) {

        // Static Object

        const PointLight = new GeneralLights(scene);
        const Ambientlight = new AmbientLight(scene);
        // const skybox = new Skybox(scene);
        // var text = new MyText(scene);
        player = new Cone(scene, world, slipperyMaterial , {
            scaleX: 10,
            scaleY: 30,
            radSegments: 32
        });
        var plane = new Plane(scene, world , groundMaterial);
        // var obstacle = new Box(scene, world , groundMaterial , 0);
        
        // Assign Dynamic Object

        const sceneObjects = [
            // cone,
            // obstacle,
        ];

        return sceneObjects;
    }

    // seconds counting
    var seconds = 0.0;
    function Counting(){
        seconds += 0.01;
    }
    var cancel = setInterval(Counting , 10);
    // end second counting

    this.update = function () {

        stats.begin();

        const elapsedTime = clock.getElapsedTime();
        world.step(timeStep);

        if(seconds >= 0.1){
            // todo every 5 seconds
            seconds = 0.0;
            // Spawn obstacles
            sceneObjects.push(new Box(scene, world , groundMaterial , GetRandomInt(-185 , 185)));
        }

        for (let i = 0; i < sceneObjects.length; i++) {
            sceneObjects[i].update(elapsedTime);

            // Drop if gameobject was destroyed
            var selectedObject = scene.getObjectByName(sceneObjects[i].body.id.toString());
            if (!selectedObject) {
                sceneObjects.splice(i, 1);
            }
            // console.log(sceneObjects.length);
        }

        renderer.render(scene, camera);

        // rendererStats.update(renderer);
        // socket.emit('chat', "hai");
        // if(dataChat){
        //     console.log(dataChat);
        // }

        if(sensorY){
            console.log(sensorY);
            // player.update(elapsedTime, sensorY);
        }

        player.update(elapsedTime, sensorY);
        

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

    function buildPhysicsContactMaterial(){
        
        var ground_ground_cm = new CANNON.ContactMaterial(groundMaterial, groundMaterial, {
            friction: 0.4,
            restitution: 0.3,
            contactEquationStiffness: 1e8,
            contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e8,
            frictionEquationRegularizationTime: 3,
        });

        world.addContactMaterial(ground_ground_cm);

        var slippery_ground_cm = new CANNON.ContactMaterial(groundMaterial, slipperyMaterial, {
            friction: 0,
            restitution: 0.3,
            contactEquationStiffness: 1e8,
            contactEquationRelaxation: 3
        });
  
        world.addContactMaterial(slippery_ground_cm);
    }

}
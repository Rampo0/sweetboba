function SceneManager(canvas) {

    //Init
    const clock = new THREE.Clock();

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    // Renderer Stats
    // const stats = new Stats();
    // stats.domElement.style.position = 'absolute';
    // stats.domElement.style.right = '0px';
    // stats.domElement.style.top = '0px';
    // document.body.appendChild(stats.domElement);
    // $('.route-view').append(stats.domElement);

    
    const groundMaterial = new CANNON.Material("groundMaterial");
    const slipperyMaterial = new CANNON.Material("slipperyMaterial");
    let player;
    const ui = new GameUI();

    // setup game manager
    const gm = new GameManager();

    function scoreCounting() {
        gm.score++;
    }

    setInterval(scoreCounting, 1000);

    const world = buildWorld();
    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    
    // Build Audio
    const audioManager = new AudioManager(camera);

    // // create an AudioListener and add it to the camera
    // let listener = new THREE.AudioListener();
    // camera.add(listener);

    // // create a global audio source
    // let sound = new THREE.Audio(listener);

    // // load a sound and set it as the Audio object's buffer
    // const audioLoader = new THREE.AudioLoader();

    // audioLoader.load('/assets/sounds/bg_yoshi.ogg', function (buffer) {
    //     if(sound.source){
    //         sound.stop();
    //     }
    //     sound.setBuffer(buffer);
    //     sound.setLoop(true);
    //     sound.setVolume(0.5);
    //     sound.play();
    // });

    const sceneObjects = createSceneObjects(scene);
    const planeObjects = [
        new ContinousePlane(scene, world, groundMaterial, -2000),
        new ContinousePlane(scene, world, groundMaterial, -7000),
        new ContinousePlane(scene, world, groundMaterial, -12000),
    ];

    let timeStep = 1 / 60;

    buildPhysicsContactMaterial();

    // Sensor Setup

    let sensorY;
    let socket = io()

    socket.on('sensorY', function (data) {
        sensorY = data;
    })

    socket.on('sensorZ', function (data) {
        // console.log(data);
    })

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
        const background = new Background(scene);
        
        player = new Player(scene, world, slipperyMaterial, {
            scaleX: 10,
            scaleY: 30,
            radSegments: 32
        }, audioManager);
        // let plane = new Plane(scene, world, groundMaterial);

        // Assign Dynamic Object

        const sceneObjects = [
        
        ];

        return sceneObjects;
    }

    // seconds counting
    let seconds = 0.0;

    function Counting() {
        seconds += 0.01;
    }
    let cancel = setInterval(Counting, 10);
    // end second counting

    this.update = function () {
        // stats.begin();

 
        const elapsedTime = clock.getElapsedTime();
        world.step(timeStep);

        if (seconds >= 1) {
            // todo every 5 seconds
            seconds = 0.0;
            // Spawn obstacles
            sceneObjects.push(new Obstacle(scene, world, groundMaterial, GetRandomInt(-185, 185)));
        }


        for (let i = 0; i < sceneObjects.length; i++) {
            sceneObjects[i].update(elapsedTime);

            // Drop if gameobject was destroyed
            // let selectedObject = scene.getObjectByName(sceneObjects[i].body.id.toString());
            // if (!selectedObject) {
            //     sceneObjects.splice(i, 1);
            // }

            if (sceneObjects[i].body.position.z >= 100) {
                sceneObjects.splice(i, 1);
            }
        }

        // console.log(sceneObjects.length);
        // console.log(planeObjects.length);

        for (let i = 0; i < planeObjects.length; i++) {
            planeObjects[i].update(elapsedTime);
            // Drop if gameobject was destroyed
            let selectedObject = scene.getObjectByName(planeObjects[i].body.id.toString());
            if (!selectedObject) {
                planeObjects.splice(i, 1);
            }
        }

        if(planeObjects.length == 2){
            planeObjects.push(new ContinousePlane(scene, world, groundMaterial, -12000));
        }

        renderer.render(scene, camera);

        player.update(elapsedTime, sensorY);

        //update ui health
        ui.health.text(player.body.health);
        //update ui score
        ui.score.text(gm.score);
        ui.lastScore.text(gm.score);

        if (player.body.health == 0) {
            const skortinggi = new highscore(gm.score);

            time = false;
            $('#game-over-container').show();
        }

        // stats.end();

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

    function buildPhysicsContactMaterial() {

        let ground_ground_cm = new CANNON.ContactMaterial(groundMaterial, groundMaterial, {
            friction: 0.4,
            restitution: 0.3,
            contactEquationStiffness: 1e8,
            contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e8,
            frictionEquationRegularizationTime: 3,
        });

        world.addContactMaterial(ground_ground_cm);

        let slippery_ground_cm = new CANNON.ContactMaterial(groundMaterial, slipperyMaterial, {
            friction: 0,
            restitution: 0.3,
            contactEquationStiffness: 1e8,
            contactEquationRelaxation: 3
        });

        world.addContactMaterial(slippery_ground_cm);
    }

    this.clear = function clearBuffer() {
        // clear program that still running when to change scene or something
        sound.stop();
        audioManager.StopSound();
    }

}


// const skybox = new Skybox(scene);
// var text = new MyText(scene);



// var axesHelper = new THREE.AxesHelper(500);
// scene.add( axesHelper );

// var controls = new THREE.OrbitControls(camera, renderer.domElement);


// var rendererStats	= new THREEx.RendererStats()
// rendererStats.domElement.style.position	= 'absolute'
// rendererStats.domElement.style.left	= '0px'
// rendererStats.domElement.style.bottom	= '0px'
// document.body.appendChild( rendererStats.domElement )
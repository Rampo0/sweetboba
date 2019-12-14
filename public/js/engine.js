var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var sceneManager = new SceneManager(canvas);
// var sceneManager = new BasicScene(canvas);
// static
var stop = false;
var time = true;

bindEventListeners();
render();

function bindEventListeners() {
	window.onresize = resizeCanvas;
	resizeCanvas();	
}

function resizeCanvas() {
	canvas.style.width = '100%';
	canvas.style.height= '100%';
	
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
    
    sceneManager.onWindowResize();
}

function render() {
	
	if (stop == true) {
		sceneManager.clear();
		stop = false;
		return;
	}

	requestAnimationFrame(render);
	if (time == true)
		sceneManager.update();
	
}


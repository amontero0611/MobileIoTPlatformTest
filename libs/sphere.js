var x = 0, y = 0,
    vx = 0, vy = 0,
	ax = 0, ay = 0;
	
var sphere = document.getElementById("sphere");

var accX, accY, accZ;
// rotX, rotY, rotZ;

if (window.DeviceMotionEvent != undefined) {
	window.ondevicemotion = function(e) {
		ax = event.accelerationIncludingGravity.x * 5;
		ay = event.accelerationIncludingGravity.y * 5;
		
		accX = parseInt(e.accelerationIncludingGravity.x * 100, 10);
		accY = parseInt(e.accelerationIncludingGravity.y * 100, 10);
		accZ = parseInt(e.accelerationIncludingGravity.z * 100, 10);
	//	if ( e.rotationRate ) {
	//		rotX = parseInt(e.rotationRate.alpha * 100, 10);
	//		rotY = parseInt(e.rotationRate.beta * 100, 10);
	//		rotZ = parseInt(e.rotationRate.gamma * 100, 10);
	//	}
		
		document.getElementById("accelerationX").innerHTML = accX;
		document.getElementById("accelerationY").innerHTML = accY;
		document.getElementById("accelerationZ").innerHTML = accZ;
		
	//	if ( e.rotationRate ) {
	//		document.getElementById("rotationAlpha").innerHTML = rotX;
	//		document.getElementById("rotationBeta").innerHTML = rotY;
	//		document.getElementById("rotationGamma").innerHTML = rotZ;
	//	}		
	};

	setInterval( function() {
		var landscapeOrientation = window.innerWidth/window.innerHeight > 1;
		if ( landscapeOrientation) {
			vx = vx + ay;
			vy = vy + ax;
		} else {
			vy = vy - ay;
			vx = vx + ax;
		}
		vx = vx * 0.98;
		vy = vy * 0.98;
		y = parseInt(y + vy / 50, 10);
		x = parseInt(x + vx / 50, 10);
		
		boundingBoxCheck();
		
		sphere.style.top = y + "px";
		sphere.style.left = x + "px";
		
	}, 20);
} 


function boundingBoxCheck(){
	if (x<0) { x = 0; vx = -vx; }
	if (y<0) { y = 0; vy = -vy; }
	if (x>document.documentElement.clientWidth-20) { x = document.documentElement.clientWidth-20; vx = -vx; }
	if (y>document.documentElement.clientHeight-20) { y = document.documentElement.clientHeight-20; vy = -vy; }
	
}


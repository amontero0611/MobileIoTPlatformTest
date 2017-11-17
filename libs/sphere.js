var x = 0, y = 0,
    vx = 0, vy = 0,
	ax = 0, ay = 0;
	
var sphere = document.getElementById("sphere");

if (window.DeviceMotionEvent != undefined) {
	window.ondevicemotion = function(e) {
		ax = event.accelerationIncludingGravity.x * 5;
		ay = event.accelerationIncludingGravity.y * 5;
		
		document.getElementById("accelerationX").innerHTML = Math.floor(e.accelerationIncludingGravity.x * 100);
		document.getElementById("accelerationY").innerHTML = Math.floor(e.accelerationIncludingGravity.y * 100);
		document.getElementById("accelerationZ").innerHTML = Math.floor(e.accelerationIncludingGravity.z * 100);
		
		if ( e.rotationRate ) {
			document.getElementById("rotationAlpha").innerHTML = Math.floor(e.rotationRate.alpha * 1000);
			document.getElementById("rotationBeta").innerHTML = Math.floor(e.rotationRate.beta * 1000);
			document.getElementById("rotationGamma").innerHTML = Math.floor(e.rotationRate.gamma * 1000);
		}		
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


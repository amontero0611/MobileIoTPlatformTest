/*
 * MQTT functions to interact with Bluemix IoT Foundation MQTT API
 */
 
//Object that holds application data and functions. 
var app = {};

app.connected = false
app.ready = false

app.onReady = function() {
	if (!app.ready) {
		// See
		console.log("setup topics")
		// https://docs.internetofthings.ibmcloud.com/messaging/applications.html#/publishing-device-events#publishing-device-events
		//app.pubTopic = 'iot-2/type/'+deviceType+'/id/'+deviceId+'/evt/status/fmt/json' // We publish to our own device topic
		//app.subTopic = 'iot-2/type/+/id/+/evt/status/fmt/json' // We subscribe to all devices using "+" wildcard
		app.pubTopic = 'iot-2/evt/status/fmt/json'
		app.subTopic = 'iot-2/cmd/action/fmt/json'
		app.setupConnection()
		app.ready = true;
	}
}

app.setupConnection = function() {
console.log("Setting up...")
	// The hostname has the organisation id as prefix:
	// '<orgid>.messaging.internetofthings.ibmcloud.com'
	var hostname = orgId + '.messaging.internetofthings.ibmcloud.com'
	console.log("hostname = " + hostname)
	// See https://docs.internetofthings.ibmcloud.com/messaging/applications.html
	// The clientId is of the form 'a:<orgid>:<appid>'.
	// <appid> must be unique per client so we add device.uuid to it
	var clientId = 'd:'+ orgId + ':' + deviceType + ':' + deviceId
	console.log("client id = " + clientId)
	app.client = new Paho.MQTT.Client(hostname, port, clientId)
	app.client.onConnectionLost = app.onConnectionLost
	app.client.onMessageArrived = app.onMessageArrived

	var options = {
    useSSL: true,
    userName: userName,
    password: password,
    onSuccess: app.onConnect,
    onFailure: app.onConnectFailure
    }
	app.client.connect(options)

}

app.publish = function(json) {
	message = new Paho.MQTT.Message(json)
	message.destinationName = app.pubTopic
	app.client.send(message)
};

app.subscribe = function() {
	app.client.subscribe(app.subTopic)
	console.log("Subscribed: " + app.subTopic)
}

app.unsubscribe = function() {
	app.client.unsubscribe(app.subTopic)
	console.log("Unsubscribed: " + app.subTopic)
}

app.onConnect = function(context) {
	
	app.subscribe()
	
	//app.status("Connected!")
	app.connected = true
	console.log("Connected!")
	document.getElementById("isConnected").innerHTML = "true";
	sphere.style.backgroundColor = "blue"
}

app.onConnectFailure = function(e){
    console.log("Failed to connect: " + e)
    document.getElementById("isConnected").innerHTML = "false"
    sphere.style.backgroundColor = "red"
  }

app.onConnectionLost = function(responseObject) {
	//app.status("Connection lost!")
	console.log("Connection lost: "+responseObject.errorMessage)
	app.connected = false
	document.getElementById("isConnected").innerHTML = "false"
	sphere.style.backgroundColor = "red"
}

// called when a message arrives
  app.onMessageArrived = function(message) {
  //alert("Recibido" + message.payloadString)
  //console.log("onMessageArrived:"+message.payloadString)
  var commandMsg = JSON.parse(message.payloadString)  
  sphere.style.backgroundColor = commandMsg.command
}
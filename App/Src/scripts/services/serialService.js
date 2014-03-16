espruino.factory('serialService', [

	'$q',
	'$rootScope',
	'notificationService',

	function
	(
		$q,
		$rootScope,
		notificationService
	)
	{
		'use strict';

		var serialPort = require("serialport");
		var activePort;

		var api = {

			connectedPort: undefined,
			connect: function(portName)
			{
				var def = $q.defer();

				activePort = new serialPort.SerialPort(portName, {
					baudrate: 9600,
					parser: com.espruino.serial.espruinoParser()
				}, true, function(error){
					if(error)
					{
						notificationService.error("Error connecting to port " + portName + ": "+ error.message)
					}
					def.resolve(error === undefined);
				});
				activePort.on("open", function(){
					notificationService.success("Connected to port "+ activePort.path);
					api.connectedPort = activePort.path;
				});
				activePort.on("data", function(data){
					$rootScope.$broadcast('serialData', data); 
				});
				activePort.on("error", function(error){
					notificationService.error("Port error: "+ error.message);
					api.connectedPort = undefined; //Not sure if this is correct?
				});
				activePort.on("close", function(error){
					notificationService.warning("Disconnected from port "+ activePort.path);
					api.connectedPort = undefined;
				});

				return def.promise;
			},
			diconnect: function()
			{
				if(api.connectedPort)
				{
					activePort.close();
					api.connectedPort = undefined;
				}
			},
			write: function(msg)
			{
				var def = $q.defer();

				if(api.connectedPort)
				{
					activePort.write(msg + "\n", function(data){
						def.resolve();
					});
				}
				else
				{
					notificationService.error("You need to connect to a port before attempting to write to it.");
					def.resolve();
				}

				return def.promise;
			},
			getPorts: function()
			{
				var def = $q.defer();

				serialPort.list(function (err, ports) {
					def.resolve(ports);
				});

				return def.promise;
			}

		}

		return api;
	}

]);
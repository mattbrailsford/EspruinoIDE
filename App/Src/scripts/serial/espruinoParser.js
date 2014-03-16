var com = com || {};
com.espruino = com.espruino || {};
com.espruino.serial = com.espruino.serial || {};

com.espruino.serial.espruinoParser = function () 
{
    var encoding = "utf8";
    var data = "";
    var pattern = XRegExp("[ \r\n\t]*(.*?)[ \r\n\t]*=(.*?)[ \r\n\t]*>[ \r\n\t]*", "gs");

    return function (emitter, buffer) 
    {
		// Collect data
		data += buffer.toString(encoding);

		// See if we have a response
		var match = pattern.exec(data);
		if(match)
		{
			// Capture the repsonse
			var result = {
				command: match[1],
				response: match[2]
			};

			// Emit response
			emitter.emit('data', result);

			// Remove from data cache
			data = data.replace(pattern, "");
		}
    };
}
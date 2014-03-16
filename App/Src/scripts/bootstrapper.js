function bootstrapApp() {

	// List dependencies
	var libraries = [
		"jquery/jquery-1.11.0.min",
		"jquery/jquery-ui-1.10.4.custom.min",
		"angular/angular.min",
		"angular/angular-route.min",
		"angular/angular-resource.min",
		"mousewheel/jquery.mousewheel",
		"splitster/splitster",
		"toastr/toastr.min",
		"terminal/jquery.terminal-0.8.6.min",
		"ace/ace",
		"ace/theme-textmate",
		"ace/mode-javascript",
		"ace/jquery-ace.min",
		"xregexp/xregexp-min"
	];

	var services = [
		"nwService",
		"modalService",
		"serialService",
		"notificationService"
	];

	var controllers = [
		"AppCtrl",
		"EditorCtrl",
		"PortPickerCtrl"
	];

	var filters = [
	];	

	var directives = [
		"nwApp",
		"nwTray",
		"window",
		"splitPane",
		"splitPanePane",
		"codeEditor",
		"terminalEditor"
	];

	var misc = [
		"extensions/jqueryExtensions",
		"extensions/stringExtensions",
		"serial/espruinoParser",
		"serial/espruinoCommands"
	];	

	// Agregate dependencies
	var allScripts = [];

	// Libraries
	libraries.forEach(function(n){
		allScripts.push('vendor/' + n + '.js');
	});

    // The app
	allScripts.push('scripts/app.js');

	// Services
	services.forEach(function (n) {
        allScripts.push('scripts/services/' + n + '.js');
    });

    //Controllers
    controllers.forEach(function (n) {
        allScripts.push('scripts/controllers/' + n + '.js');
    });

    //Filters
    filters.forEach(function (n) {
        allScripts.push('scripts/filters/' + n + '.js');
    });

    //Directives
    directives.forEach(function (n) {
        allScripts.push('scripts/directives/' + n + '.js');
    });

    //Misc 
    misc.forEach(function (n) {
        allScripts.push('scripts/' + n + '.js');
    });

	// Load dependencies
	$LAB
		.setOptions({ AlwaysPreserveOrder: true })
		.script(allScripts)
		.wait(function(){

			// Start the app
			angular.bootstrap(document, ['espruino']);

		});

};
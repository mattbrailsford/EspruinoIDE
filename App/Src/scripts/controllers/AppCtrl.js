espruino.controller('AppCtrl', [

	'$scope',
	'$location',
	'$window',
	'nw',

    function
    (
		$scope, 
		$location,
		$window,
		nw
	)
    {
    	'use strict';

    	// Handle window events
    	$scope.minimize = function()
    	{
    		nw.window.minimize();
    	}

    	$scope.toggleFullscreen = function()
    	{
    		nw.window.toggleFullscreen();
    	}

    	$scope.close = function()
    	{
    		nw.window.close();
    	}

	    // Redirect to saved state
	    //if(localStorage.espruinoSavedState) {
	    //    $location.path(localStorage.espruinoSavedState);
	    //}

	    // Save current state
	    //$scope.$on('appClosing', function(){
	    //	localStorage.espruinoSavedState = $location.path();
	    //});
    }

]);
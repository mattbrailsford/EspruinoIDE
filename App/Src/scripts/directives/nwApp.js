espruino.directive('nwApp', [

	'$rootScope',
	'$window',
	'nw',

	function 
	(
		$rootScope,
		$window,
		nw
	)
	{
		'use strict';

		return {
			restrict: 'A',
			link: function(scope, element, attrs)
			{
				// Block standard events
		        $window.addEventListener("dragenter", function (e) {
		            e.preventDefault();
		        }, false);

		        $window.addEventListener("dragover", function (e) {
		            e.preventDefault();
		        }, false);

		        $window.addEventListener("drop", function (e) {
		            e.preventDefault();
		        }, false);

		        // Listen for closing event
		        nw.window.on('close', function(){

					$rootScope.$broadcast('appClosing');

					nw.app.closeAllWindows();
		    		nw.window.close(true);

				});
			}
		}
	}

]);
espruino.directive('window', [

	function ()
	{
		'use strict';

		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {
				text: '@',
				class: '@',
				showAlert: '@',
				showMinimize: '@',
				showFullscreen: '@',
				showClose: '@',
				alert: '&',
				minimize: '&',
				fullscreen: '&',
				close: '&'
			},
			templateUrl: 'views/partials/window.html',
			link: function(scope, element, attrs)
			{

			}
		}		
	}

]);
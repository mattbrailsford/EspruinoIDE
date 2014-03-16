espruino.directive('splitPane', [

	function ()
	{
		'use strict';

		return {
			restrict: 'E',
			replace: true, 
			transclude: true,
			scope: { 
				orientation: '@'
			},
			templateUrl: 'views/partials/splitPane.html',
	      	link: function(scope, element, attrs) 
			{
				// Setup splitster
				element.splitster({
					orientation: "vertical" //TODO: Load from local storage
				});

				// Watch for change in orientation
				attrs.$observe('orientation', function(value) 
				{  
					// Update splitster orientation
					element.splitster("orientation", value);
				});
			}
		}		
	}

]);
espruino.directive('splitPanePane', [

	function ()
	{
		'use strict';

		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: { },
			templateUrl: 'views/partials/splitPanePane.html',
			link: function(scope, element, attrs) 
			{
				//scope.selectable = element.attr("selectable") !== "false";
        		//splitPane.addPane(scope);
      		}
		}		
	}

]);
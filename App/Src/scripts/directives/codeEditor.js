espruino.directive('codeEditor', [

	'$window',
	'nw',

	function 
	(
		$window,
		nw
	)
	{
		'use strict';

		return {
			restrict: 'E',
			replace: true,
			scope: { },
			templateUrl: 'views/partials/codeEditor.html',
			link: function($scope, element, attrs)
			{
				$(element).ace({ 
					theme: 'textmate', 
					lang: 'javascript',
					width: '100%',
					height: '100%'
				})
			}
		}		
	}

]);
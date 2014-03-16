espruino.controller('EditorCtrl', [

	'$scope',
	'$location',
	'$window',
	'modalService',
    'serialService',

    function
    (
		$scope, 
		$location,
		$window,
		modalService,
        serialService
	)
    {
    	'use strict';

        $scope.connected = serialService.connected;
    	$scope.layout = "vertical";

    	$scope.toggleConnection = function()
    	{
            if(!$scope.connected)
            {
        		modalService.show({
                    title: "Select a port...",
        			templateUrl: "views/portPicker.html",
                    containerSelector: ".window--app > .viewport",
                    width: 300,
                    height: 350
        		});
            }
            else
            {
                serialService.diconnect();
            }
    	}

    	$scope.toggleLayout = function()
    	{
    		$scope.layout = ($scope.layout == "vertical") ? "horizontal" : "vertical";
    	}
	    
        $scope.$watch(function(){
            return serialService.connectedPort;
        }, function (newVal, oldVal, scope) {
            $scope.connected = newVal !== undefined;
        });
    }

]);
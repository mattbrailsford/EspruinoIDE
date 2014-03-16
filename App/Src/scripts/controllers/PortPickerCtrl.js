espruino.controller('PortPickerCtrl', [

	'$scope',
    '$interval',
    'serialService',
    'notificationService',

    function
    (
		$scope,
        $interval,
        serialService,
        notificationService
	)
    {
    	'use strict';

        $scope.connectToPort = function(port)
        {
            serialService.connect(port.comName).then(function(success){
                if(success)
                {
                    serialService.write("process.env");
                    $scope.hide();
                }
            });
        }

        var updatePorts = function()
        {
            serialService.getPorts().then(function(ports){
                $scope.ports = ports;
            });
        }

        var portCheckerInt = $interval(function(){
            updatePorts();
        }, 3000);

        updatePorts();
	    
        $scope.$on('$destroy', function() 
        {
            // Make sure that the interval is destroyed too
            if (angular.isDefined(portCheckerInt)) 
            {
                $interval.cancel(portCheckerInt);
                portCheckerInt = undefined;
            }
        });

    }

]);
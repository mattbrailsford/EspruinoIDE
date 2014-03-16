espruino.factory('notificationService', [

	'$rootScope', 

	function 
	(
		$rootScope
	) 
	{
		'use strict';

		toastr.options = {
			"closeButton": false,
			"debug": false,
			"positionClass": "toast-bottom-full-width",
			"onclick": null,
			"showDuration": "300",
			"hideDuration": "1000",
			"timeOut": "5000",
			"extendedTimeOut": "1000",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		}

		var api = {
			success: function(msg)
			{
				toastr.success(msg);
			},
			error: function(msg)
			{
				toastr.error(msg);
			},
			warning: function(msg)
			{
				toastr.warning(msg);
			},
			info: function(msg)
			{
				toastr.info(msg);
			}
		};

	    return api;
	}

]);
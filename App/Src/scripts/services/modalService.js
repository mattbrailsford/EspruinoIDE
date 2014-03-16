espruino.factory('modalService', [

	'$q',
	'$http',
	'$compile', 
	'$rootScope', 
	'$controller',

	function 
	(
		$q,
		$http,
		$compile, 
		$rootScope
	) 
	{
		'use strict';

		var scope,
		defaultWidth = 300,
		defaultHeight = 300,
		containerClass = "window--modal",
		overlayClass = "overlay";

		var parseTemplate = function(config)
		{
			var def = $q.defer();

			// check that there's a template provided
	        if (typeof config.template === 'undefined' && typeof config.templateUrl === 'undefined') {
	            throw new Error('The service needs an html template or a template url to be passed with the config object');
	        }

	        var template, html,
	        htmlBefore = '<window class="'+ containerClass +'" show-close="true" close="hide()" text="'+ config.title +'" style="width:'+ (config.width || defaultWidth) +'px;height:'+ (config.height || defaultHeight) +'px;margin-left:-'+ ((config.wdith || defaultWidth) / 2) +'px;margin-top:-'+ ((config.height || defaultHeight) / 2) +'px;">',
	        htmlAfter = '</window>';
	         
	        if (config.templateUrl) 
	        {
	            $http.get(config.templateUrl).then(function(response) {
	                template = response.data;
	                // the html var has to be set on the 2 options of the conditional since one has an async call
	                html = htmlBefore + template + htmlAfter;
	                def.resolve(html);
	            });
	        } 
	        else 
	        {
	            template = config.template
	            html = htmlBefore + template + htmlAfter;
	            def.resolve(html);
	        }

	        return def.promise;
		}

	    var show = function(config) 
        {
        	parseTemplate(config).then(function(html){
        		
	        	var modalEl, overlayEl,
	        	showOverlay = typeof config.showOverlay === 'boolean' ? config.showOverlay : true,
	            container = angular.element(config.containerSelector || document.body),
	            overlay = '<div class="'+ overlayClass + '"></div>';

	            scope = $rootScope.$new();

	            // assign the deactivation function to the created scope
	            scope.hide = hide;

	            // if there's a modal already on the DOM, remove it before adding another
	            modalEl = angular.element('.' + containerClass);
	            modalEl.remove();

	            // if there's an overlay div already on the DOM, remove it before adding another
	            overlayEl = angular.element('.' + overlayClass);
	            overlayEl.remove();

	            // if there's data passed along, copy it to the created scope
	            if (config) 
	            {
	                for (var prop in config) 
	                {
	                    scope[prop] = config[prop];
	                }
	            }

	            // create DOM elements
	            modalEl = angular.element(html);
	            
	            // the $compile() function compiles an HTML String/DOM into a template and produces a template function, which then is used
	            // to link the template and a scope together
	            $compile(modalEl)(scope);

	            if (showOverlay) 
	            {
	              	overlayEl = angular.element(overlay);
	              	container.append(overlayEl);
	            }

	            container.prepend(modalEl);

	    	});
            
        }

        var hide = function() 
        {
            var modelEl = angular.element('.' + containerClass),
                overlayEl = angular.element('.' + overlayClass);
            
            if (modelEl) 
            {
                modelEl.remove();
            }
            
            if (overlayEl) 
            {
                overlayEl.remove();
            }

          	scope.$destroy();
        }

        return {
        	show: show,
        	hide: hide
        }
	}

]);




/*app.controller('MainCtrl',['$scope','modalFactory', function ($scope, modalFactory) {
        // instantiate modal service
        $scope.statusModal = new modalFactory({
            template: '<h1>Here\'s the modal!</h1><p>{{status}} was selected</p>'
        });
    
        $scope.turnMeOn = $scope.statusModal.turnMeOn;
        
        // dummy data
      $scope.data = [{name:'Option #1'}, {name:'Option #2'}];
        $scope.option = $scope.data[0];
      
        $scope.activate = function() {
          var config = {};
          config.status = $scope.option.name;
          $scope.turnMeOn(config);
        }
    }
    ]);*/
espruino.directive('terminalEditor', [

	'$window',
	'nw',
	'serialService',

	function 
	(
		$window,
		nw,
		serialService
	)
	{
		'use strict';

		return {
			restrict: 'E',
			replace: true,
			scope: { },
			templateUrl: 'views/partials/terminalEditor.html',
			link: function($scope, element, attrs)
			{
				$scope.$on("serialData", function(evt, data){
					console.log(data.response.charCodeAt(data.response.length - 1));
					terminal.echo(data.response);
				});

				var terminal = $(element).terminal(function(command, term) 
				{
			        if (command !== '') {
			            try {
			            	switch(command.toLowerCase())
			            	{
			            		case "cls":
			            			terminal.clear();
			            			break;
			            		default:
			            			serialService.write(command);
			            	}
			            	
			            } catch(e) {
			                term.error(new String(e));
			            }
			        } else {
			           term.echo('');
			        }
			    }, 
			    {
			        greetings: '\
  _____                 _ \n\
 |   __|___ ___ ___ _ _|_|___ ___ \n\
 |   __|_ -| . |  _| | | |   | . |\n\
 |_____|___|  _|_| |___|_|_|_|___|\n\
           |_| http://espruino.com\n\
         Copyright '+ (new Date().getFullYear()) +' G.Williams\n',
			        name: 'espruino',
			        width: '100%',
			        height: '100%',
			        prompt: '> ',
			        completion: function(terminal, term, callback)
			        {
			        	callback($.grep(com.espruino.serial.commands, function(itm, idx){
			        		return itm.startsWith(term);
			        	}));
			        }
			    });
			}
		}		
	}

]);
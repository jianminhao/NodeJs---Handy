<<<<<<< HEAD
"use strict";

// Reference to this module.
var app = angular.module('services',[]);

app.factory('PageNavService', function($route, $location)
{
	//array for keeping defined routes
	var routes = [];
	
	angular.forEach($route.routes, function(config, route)
	{
		// Do NOT add same route twice
		if (angular.isUndefined(config.redirectTo))
		{
			routes.push(route);
		}
	});
	
	return {
		goNextPage: function()
		{
			var nextIndex = routes.indexOf($location.path()) + 1;
			if (nextIndex === routes.length) {
				// Do nothing
			} else {
				$location.path(routes[nextIndex]);
			}
		},
		goBackPage: function()
		{
			var backIndex = routes.indexOf($location.path()) - 1;
			if (backIndex === -1) {
				// Do nothing
			} else {
				$location.path(routes[backIndex]);
			}
		},
		goToPage: function( index )
		{
			$location.path(routes[index]);
		}
	}
});

app.run(function($rootScope, PageNavService)
{
	$rootScope.goNextPage = function()
	{
		PageNavService.goNextPage();
	};

	$rootScope.goBackPage = function()
	{
		PageNavService.goBackPage();
	};

	$rootScope.goToPage = function( index )
	{
		PageNavService.goToPage( index );
	};
=======
"use strict";

// Reference to this module.
var app = angular.module('services',[]);

app.factory('PageNavService', function($route, $location)
{
	//array for keeping defined routes
	var routes = [];
	
	angular.forEach($route.routes, function(config, route)
	{
		// Do NOT add same route twice
		if (angular.isUndefined(config.redirectTo))
		{
			routes.push(route);
		}
	});
	
	return {
		goNextPage: function()
		{
			var nextIndex = routes.indexOf($location.path()) + 1;
			if (nextIndex === routes.length) {
				// Do nothing
			} else {
				$location.path(routes[nextIndex]);
			}
		},
		goBackPage: function()
		{
			var backIndex = routes.indexOf($location.path()) - 1;
			if (backIndex === -1) {
				// Do nothing
			} else {
				$location.path(routes[backIndex]);
			}
		},
		goToPage: function( index )
		{
			$location.path(routes[index]);
		}
	}
});

app.run(function($rootScope, PageNavService)
{
	$rootScope.goNextPage = function()
	{
		PageNavService.goNextPage();
	};

	$rootScope.goBackPage = function()
	{
		PageNavService.goBackPage();
	};

	$rootScope.goToPage = function( index )
	{
		PageNavService.goToPage( index );
	};
>>>>>>> b6907696a0c4bdf24fadd03a0efee047d101e35a
});
"use strict";

// Reference to this module.
var app = angular.module('filters',[]);

// Filter to order an object. 
// Params, :(what to filter) :(order within that group) :(reversed=true/false)
app.filter('orderObjectBy', function() {
	return function(items, field, order, reverse) {
		var filtered = [];
		
		angular.forEach(items, function(item) {
			filtered.push(item);
		});
		
		filtered.sort(function (a, b) {
			if( a[field] > b[field] )
			{
				return 1;
			}
			else
			{
				if( a[field] == b[field] )
				{
					return (a[order] > b[order]) ? 1 : -1;
				}
				else
				{
					return -1;
				}
			}
		});
		
		if(reverse) filtered.reverse();
		
		return filtered;
	};
});

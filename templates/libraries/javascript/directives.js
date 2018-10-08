"use strict";

// Reference to this module.
var app = angular.module('directives',[]);

// Loading Screen.
app.directive('loadingScreen', function ()
{
	return {
		restrict: 'E',
		replace: true,
		template: '<div class="loadingScreen text-center"><img src="/images/loader.gif" width="64px" height="64px"/><h2>{{loadingScreenMessage}}</h2></div>',
		link: function (scope, element, attr)
		{
			scope.$watch('loadingScreen', function (val) {
				if (val)
				{
					// Show the template and center it vertically. 150px is an approx of the loading-screen height/2.
					(attr.loadingMessage == "" || attr.loadingMessage == undefined) ? scope.loadingScreenMessage = "Loading, please wait ..." : scope.loadingScreenMessage = attr.loadingMessage;
					$(element).show();
					$(".loadingScreen").css({"margin-top": $(window).height() - $(window).height()/2 - 150 + "px"});
				}
				else
				{
					$(element).hide();
				}
			});
		}
	}
});

// Disabled Anchor Tags. Similar to ngDisabled provided by Angular.
// Note the directive name letter 'a' before the word 'Disabled'. Directives are activated alphabetically.
app.directive('aDisabled', function()
{
	return {
		compile: function(tElement, tAttrs, transclude)
		{
			//Disable ngClick
			tAttrs["ngClick"] = "!("+tAttrs["aDisabled"]+") && ("+tAttrs["ngClick"]+")";
			
			//Toggle "disabled" to class when aDisabled becomes true
			return function (scope, iElement, iAttrs) {
				scope.$watch(iAttrs["aDisabled"], function(newValue) {
					if (newValue !== undefined) {
						iElement.toggleClass("disabled", newValue);
					}
				});
				
				//Disable href on click
				iElement.on("click", function(e) {
					if (scope.$eval(iAttrs["aDisabled"])) {
						e.preventDefault();
					}
				});
			};
		}
	};
});

// Match inputs.
app.directive('sameAs', function()
{
	return {
		require: 'ngModel',
		link: function(scope, elem, attrs, modelCtrl) {
			modelCtrl.$parsers.unshift(validate);
			
			// Force-trigger the parsing pipeline.
			scope.$watch(attrs.sameAs, function() {
				modelCtrl.$setViewValue(modelCtrl.$viewValue);
				modelCtrl.$render();
				
				// Force the current ngModel value to evaluate against the other.
				if (scope.$eval(attrs.sameAs) != modelCtrl.$viewValue)
				{
					modelCtrl.$setDirty(); modelCtrl.$setValidity('same-as', false);
				}
				else
				{
					modelCtrl.$setValidity('same-as', true);
				}
			});
			
			function validate(value) {
				var isValid = scope.$eval(attrs.sameAs) == value;
				modelCtrl.$setValidity('same-as', isValid);
				return isValid ? value : undefined;
			}
		}
	};
});

// Force all Inputs to CAPS.
app.directive('capitalize', function()
{
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, modelCtrl) {
			var capitalize = function(inputValue) {
				if(inputValue == undefined) inputValue = '';
				var capitalized = inputValue.toUpperCase();
				if(capitalized !== inputValue) {
					modelCtrl.$setViewValue(capitalized);
					modelCtrl.$render();
				}
				return capitalized;
			}
			modelCtrl.$parsers.push(capitalize);
			capitalize(scope[attrs.ngModel]);
		}
	};
});

// app.directive('validateFormGroups', [function() {
    // return {
        // restrict: "A",
        // link: function(scope, element, attrs) {
            // if (element.get(0).nodeName.toLowerCase() === 'div') {
                // element.find('.form-group').each(function(i, formGroup) {
                    // showValidation(angular.element(formGroup));
                // });
            // } else {
                // showValidation(element);
            // }

            // function showValidation(formGroupEl) {
                // var input = formGroupEl.find('input[data-ng-model], textarea[data-ng-model], select[data-ng-model], input[ng-model], textarea[ng-model], select[ng-model]');
				// if (input.length > 0) {
                    // scope.$watch(function() {
                        // return (input.hasClass('ng-invalid') && (!input.hasClass('ng-pristine') || input.hasClass('ng-touched')));
                    // }, function(isInvalid) {
                        // formGroupEl.toggleClass('has-error', isInvalid);
                    // });
                // }
            // }
        // }
    // };
// }]);

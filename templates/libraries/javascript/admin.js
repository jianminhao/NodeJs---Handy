var INDEX_HOME = 0;
var INDEX_ABOUT = 1;
var INDEX_CONTACT = 2;
var app = angular.module('myApp', ['ngAnimate', 'ngRoute', 'ngMessages', 'services', 'directives', 'filters']);

// configure our routes
app.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl : 'pages/home.html',
            data: { order: INDEX_HOME, active: 'home', label: 'Home' },
            controller  : 'homeCtrl'
        })
        .when('/about', {
            templateUrl : 'pages/about.html',
            data: { order: INDEX_ABOUT, active: 'about', label: 'About' },
            controller  : 'aboutCtrl'
        })
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            data: { order: INDEX_CONTACT, active: 'contact', label: 'Contact' },
            controller  : 'contactCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
});

app.controller('homeCtrl', function($scope, $route, $http, PageNavService)
{
    // Login Form
    $("#idFormLogin").on('submit', function(e)
    {
        // Prevent Default Submit Event
        e.preventDefault();

        if (Parse.User.current())
        {
            PageNavService.goToPage(INDEX_CONTACT);
        }
        else
        {
            // Get data from the form and put them into variables
            var data = $(this).serializeArray();
            var username = data[0].value;
            var password = data[1].value;

            // Try to login.
            Parse.User.logIn(username, password, {
                success: function(user)
                {
                    //$scope.goNextPage();
                    PageNavService.goToPage(INDEX_CONTACT);
                },
                error: function(user, error)
                {
                    console.log(error);
                }
            });
        }
    });
});

app.controller('aboutCtrl', function($scope, $route, $http, PageNavService) {
    $scope.message = 'This is the about page';
});

app.controller('contactCtrl', function($scope, $route, $http, PageNavService) {
    $scope.message = 'Contact us!';
});

$(document).ready(function()
{
    // Parse Init
    Parse.$ = jQuery;
    var parse_app_id = "x5K6Lz5LFTtI5iAKJJzT0EE6jIUJ3Ph22zsABKgx";
    var parse_javascript_id = "rkRg35EbpWGoMOigNS2T7Trg6qLCgg40O59km1iR";
    Parse.initialize(parse_app_id, parse_javascript_id);

    // Prevent all buttons to submit forms.
    $("button").button().click(function (event)
    {
        event.preventDefault();
    });

    // Prevent Backspace to go back a page.
    var rx = /INPUT|SELECT|TEXTAREA/i;
    $(document).bind("keydown keypress", function( e )
    {
        if( e.which == 8 )
        {
            if( !rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly )
            {
                e.preventDefault();
            }
        }
    });

    // Home page Navigation background.
    $(window).scroll(function() {
        var screenHeight = $(this).scrollTop();
        if( screenHeight > 50 && screenHeight < 200) {
            $('.navbar-fixed-top').addClass('start-opaque');
        } else if($(this).scrollTop() > 200) {
            $('.navbar-fixed-top').removeClass('opaque-start').addClass('opaque');
        } else {
            $('.navbar-fixed-top').removeClass('opaque-start').removeClass('opaque');
        }
    });
});

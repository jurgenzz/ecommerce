angular.module('myxmap', ['eCtrl', 'ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');
        $stateProvider
            .state('getstartd', {
                url: '/getstarted',
                onEnter: ['$state', 'auth', '$window', function ($state, auth, $window) {
                    if (auth.isLoggedIn()) {
                        $window.location.href = 'dash#!/login'
                    }
                }]

            })

        $urlRouterProvider.otherwise('getstarted');
    });
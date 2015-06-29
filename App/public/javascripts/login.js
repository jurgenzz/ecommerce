angular.module('myxmap', ['userFactory', 'ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');
        $stateProvider
            .state('getstarted', {
                url: '/getstarted',
                controller:'loginCtrl',
                onEnter: ['$state', 'auth', '$window', function ($state, auth, $window) {
                    if (auth.isLoggedIn()) {
                        $window.location.href = 'dash#!/home';
                    }
                }]

            });

        $urlRouterProvider.otherwise('getstarted');
    })
    .directive('match', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {

                scope.$watch('[' + attrs.ngModel + ', ' + attrs.match + ']', function(value){
                    ctrl.$setValidity('match', value[0] === value[1] );
                }, true);

            }
        }
    }])

    .controller('loginCtrl', function($scope, $state, auth, $window){
        $scope.user = {};

        $scope.register = function(){
            auth.register($scope.user).error(function(error){
                $scope.error = error.message;

            }).then(function(){
                $window.location.href = 'dash#!/login'
            });
        };

        $scope.logIn = function(){
            auth.logIn($scope.user).error(function(error){
                $scope.error = "Hey, something went wrong. Check your email and password and try again!";
                console.log(error);
            }).then(function(){
                $window.location.href = 'dash#!/login'
            });
        };
    });
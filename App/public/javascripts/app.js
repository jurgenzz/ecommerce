angular.module('myxmap', ['eCtrl', 'ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider){
        $locationProvider.hashPrefix("!");
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl:'dash/home.ejs',
                controller:'indexCtrl'

            })
            .state('products', {
                url:'/products/:userId',
                templateUrl:'dash/products.ejs',
                controller:'productsCtrl'
            })
            .state('add', {
                url: '/add/:userId',
                templateUrl: 'dash/add.ejs',
                controller: 'addCtrl'
            });
        $urlRouterProvider.otherwise('home');
    });
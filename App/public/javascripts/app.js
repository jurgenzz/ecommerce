angular.module('myxmap', ['eCtrl', 'ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider){
        $locationProvider.hashPrefix("!");
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl:'dash/home.ejs',
                controller:'indexCtrl',
                onEnter: ['$state', 'auth', function($state, auth) {
                    if(auth.isLoggedIn()){
                        console.log('true');
                    } else {
                        $state.go('login');
                    }
                }]

            })
            .state('products', {
                url:'/products',
                templateUrl:'dash/products.ejs',
                controller:'productsCtrl',
                onEnter: ['$state', 'auth', function($state, auth) {
                    if(auth.isLoggedIn()){
                        console.log('true');
                    } else {
                        $state.go('login');
                    }
                }]
            })
            .state('add', {
                url: '/add',
                templateUrl: 'dash/add.ejs',
                controller: 'addCtrl',
                onEnter: ['$state', 'auth', function($state, auth) {
                    if(auth.isLoggedIn()){
                        console.log('true');
                    } else {
                        $state.go('login');
                    }
                }]
            })
            .state('login', {
                url: '/login',
                templateUrl: 'dash/login.ejs',
                controller:'loginCtrl',
                onEnter: ['$state', 'auth', function($state, auth){
                    if(auth.isLoggedIn()){
                        $state.go('home');

                    }
                }]
            })
            .state('register', {
                url: '/register',
                templateUrl: 'dash/register.ejs',
                controller:'loginCtrl',
                onEnter: ['$state', 'auth', function($state, auth){
                    if(auth.isLoggedIn()){
                        $state.go('home');
                    }
                }]
            });
        $urlRouterProvider.otherwise('home');
    });
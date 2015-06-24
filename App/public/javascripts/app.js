angular.module('myxmap', ['eCtrl', 'ui.router', 'ngFileUpload'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider){
        $locationProvider.hashPrefix('!');
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
            .state('allProducts', {
                url:'/all',
                templateUrl:'dash/allProducts.ejs',
                controller:'allProductsCtrl'
            })
            .state('stores', {
                url:'/stores',
                templateUrl:'dash/stores.ejs',
                controller:'storesCtrl'
            })
            .state('addStore', {
                url:'/stores/add',
                templateUrl:'dash/addStore.ejs',
                controller:'storesCtrl'
            })
            .state('category', {
                url:'/:storeId/categories/',
                templateUrl:'dash/categories.ejs',
                controller:'categoriesCtrl'
            })
            .state('addC', {
                url:'/:storeId/categories/add',
                templateUrl:'dash/addC.ejs',
                controller:'categoriesCtrl'
            })
            .state('products', {
                url:'/:storeId/:categoryId/products/',
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
                url: '/:storeId/:categoryId/products/add',
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
                templateUrl: '/register.ejs',
                controller:'loginCtrl',
                onEnter: ['$state', 'auth', function($state, auth){
                    if(auth.isLoggedIn()){
                        $state.go('home');
                    }
                }]
            });
        $urlRouterProvider.otherwise('home');
    });
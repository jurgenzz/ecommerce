angular.module('myxmap', ['eCtrl', 'ui.router', 'userFactory', 'ngFileUpload', 'flash'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider){
        $locationProvider.hashPrefix('!');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl:'dash/home.ejs',
                controller:'indexCtrl',
                onEnter: ['$state', 'auth', '$window', function($state, auth, $window) {
                    if(!auth.isLoggedIn()){
                        $window.location.href = '/login';
                    }
                }]

            })
            .state('allProducts', {
                url:'/all',
                templateUrl:'dash/allProducts.ejs',
                controller:'allProductsCtrl',
                onEnter: ['$state', 'auth', '$window', function($state, auth, $window) {
                    if(!auth.isLoggedIn()){
                        $window.location.href = '/login';
                    }
                }]
            })
            .state('stores', {
                url:'/stores',
                templateUrl:'dash/stores.ejs',
                controller:'storesCtrl',
                onEnter: ['$state', 'auth', '$window', function($state, auth, $window) {
                    if(!auth.isLoggedIn()){
                        $window.location.href = '/login';

                    }
                }]
            })
            .state('addStore', {
                url:'/stores/add',
                templateUrl:'dash/addStore.ejs',
                controller:'storesCtrl',
                onEnter: ['$state', 'auth', '$window', function($state, auth, $window) {
                    if(!auth.isLoggedIn()){
                        $window.location.href = '/login';
                    }
                }]
            })
            .state('category', {
                url:'/:storeId/categories/',
                templateUrl:'dash/categories.ejs',
                controller:'categoriesCtrl',
                onEnter: ['$state', 'auth', '$window', function($state, auth, $window) {
                    if(!auth.isLoggedIn()){
                        $window.location.href = '/login';
                    }
                }]
            })
            .state('addC', {
                url:'/:storeId/categories/add',
                templateUrl:'dash/addC.ejs',
                controller:'categoriesCtrl',
                onEnter: ['$state', 'auth', '$window', function($state, auth, $window) {
                    if(!auth.isLoggedIn()){
                        $window.location.href = '/login';
                    }
                }]
            })
            .state('products', {
                url:'/:storeId/:categoryId/products/',
                templateUrl:'dash/products.ejs',
                controller:'productsCtrl',
                onEnter: ['$state', 'auth', function($state, auth) {
                    if(!auth.isLoggedIn()){
                        $window.location.href = '/login';
                    }
                }]
            })
            .state('product', {
                url:'/:storeId/:categoryId/:productId/info',
                templateUrl:'dash/product.ejs',
                controller:'productCtrl',
                onEnter: ['$state', 'auth', '$window', function($state, auth, $window) {
                    if(!auth.isLoggedIn()){
                        $window.location.href = '/login';
                    }
                }]
            })
            .state('editProduct', {
                url:'/:storeId/:categoryId/:productId/edit',
                templateUrl:'dash/edit.ejs',
                controller:'productCtrl',
                onEnter: ['$state', 'auth', '$window', function($state, auth, $window) {
                    if(!auth.isLoggedIn()){
                        $window.location.href = '/login';
                    }
                }]
            })
            .state('api', {
                url:'/api',
                templateUrl:'dash/api.ejs',
                controller:'apiCtrl',
                onEnter: ['$state', 'auth', '$window', function($state, auth, $window) {
                    if(!auth.isLoggedIn()){
                        $window.location.href = '/login';
                    }
                }]
            })
            .state('orders', {
                url:'/orders',
                templateUrl:'dash/orders.ejs',
                controller:'orderCtrl',
                onEnter: ['$state', 'auth', '$window', function($state, auth, $window) {
                    if(!auth.isLoggedIn()){
                        $window.location.href = '/login';
                    }
                }]
            })
            .state('demo', {
                url:'/api/demo',
                templateUrl:'dash/demo.ejs',
                controller:'demoCtrl'
            })

            .state('add', {
                url: '/:storeId/:categoryId/products/add',
                templateUrl: 'dash/add.ejs',
                controller: 'addCtrl',
                onEnter: ['$state', 'auth', '$window', function($state, auth, $window) {
                    if(!auth.isLoggedIn()){
                        $window.location.href = '/login';
                    }
                }]
            });
        $urlRouterProvider.otherwise('home');
    });
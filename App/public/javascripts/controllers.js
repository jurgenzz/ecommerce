angular.module('eCtrl', [])
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

    .controller('indexCtrl', ['$scope', '$http', 'auth', function($scope, $http, auth){
        //$http.get('http://localhost:3000/api)
        //    .success(function(data){
        //        console.log(data);
        //    })
        $scope.isLoggedIn = auth.isLoggedIn;

    }])
    .controller('addCtrl', function($scope, $http, $stateParams, auth, $window) {
        // $http.post('http://localhost:3000/api/products')
        $scope.currentId = auth.currentId;
        $scope.storeId = $stateParams.storeId;
        $scope.catId = $stateParams.categoryId;
        var url = 'dash#!/' + $scope.storeId + '/' + $scope.catId + '/products/';
        $scope.saveProduct = function() {
            var data = $scope.product;
            $http.post('http://localhost:3000/api/user/' + $scope.currentId() + '/' + $scope.storeId + '/' + $scope.catId +"/products", data)
                .success(function() {
                    console.log(data);
                    $window.location.href = url;
                })
        }



    })

    .controller('storesCtrl', function($scope, $http, auth, $window) {
        $scope.currentId = auth.currentId;
        $scope.stores = "";
        var url = 'dash#!/stores';
        $http.get('http://localhost:3000/api/user/' + $scope.currentId())
            .success(function(data){
                $scope.stores = data.stores;
            });
        $scope.saveStore = function() {
            var data = $scope.stories;
            $http.post('http://localhost:3000/api/user/' + $scope.currentId() + '/stores', data)
                .success(function(data) {
                    console.log(data);
                    $window.location.href = url;

                })
        };
    })


    .controller('categoriesCtrl', function($scope, $http, $stateParams, auth, $window){
        $scope.currentId = auth.currentId;
        $scope.storeId = $stateParams.storeId;
        $scope.categories = "";
        $http.get('http://localhost:3000/api/user/' + $scope.currentId() + "/" + $scope.storeId)
            .success(function(data) {
                $scope.categories = data;
                console.log(data);
            });
        $scope.saveCategory = function() {
            var storeId = $stateParams.storeId;
            var data = $scope.category;
            var url = 'dash#!/' + storeId + '/categories/';
            $http.post('http://localhost:3000/api/user/' + $scope.currentId() + '/' + storeId + '/category', data)
                .success(function(data) {
                    console.log(data);
                    $window.location.href = url;
                })
        };
        $window.localStorage['shop'] = $scope.storeId;
        console.log($window.localStorage['shop']);

    })
    .controller('productsCtrl', function($scope, $http, $stateParams, auth, $window){
        $scope.currentId = auth.currentId;
        $scope.storeId = $stateParams.storeId;
        $scope.catId = $stateParams.categoryId;
        $scope.products = "";
        $http.get('http://localhost:3000/api/user/' + $scope.currentId() + '/' + $scope.storeId + '/' + $scope.catId)
            .success(function(data) {
                $scope.products = data;
                console.log(data);

            })
    })

    .factory('auth', ['$http', '$window', function($http, $window){
        var auth = {};

        auth.saveToken = function (token){
            $window.localStorage['proco-news-token'] = token;
        };

        auth.getToken = function(){
            return $window.localStorage['proco-news-token'];
        };

        auth.isLoggedIn = function() {
            var token = auth.getToken();

            if(token){
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.exp > Date.now() / 1000;
            }else{
                return false;
            }
        };

        auth.currentUser = function(){
            if(auth.isLoggedIn()) {
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.username;
            }
        };

        auth.currentId = function() {
            if(auth.isLoggedIn()) {
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload._id;
            }
        };


        auth.register = function(user){
            return $http.post('api/register', user).success(function(data){
                auth.saveToken(data.token);
            });
        };

        auth.logIn = function(user){
            return $http.post('api/login', user).success(function(data){
                auth.saveToken(data.token);
            });
        };

        auth.logOut = function(){
            $window.localStorage.removeItem('proco-news-token');
            $window.location.href = 'dash#!/login'
        };

        return auth;
    }])
    .controller('sideCtrl', function($window, $scope, $http, auth) {
        $scope.currentId = auth.currentId;
        var url = "http://localhost:3000/api/user/" + $scope.currentId();
        $scope.store = "/" + $window.localStorage['shop'];
        var category = "/" + $window.localStorage['category'];
        var storeUrl = 'http://localhost:3000/api/user/' + $scope.currentId() + $scope.store;
        $http.get(storeUrl)
            .success(function(data) {
                console.log(data);
                $scope.categories = data.categories;
            });
        console.log(storeUrl);
        $http.get(url)
            .success(function(data) {
                $scope.stores = data.stores;
                console.log($scope.stores);
            })
    })

    .controller('loginCtrl', [
        '$scope',
        '$state',
        'auth',
        function($scope, $state, auth){
            $scope.user = {};

            $scope.register = function(){
                auth.register($scope.user).error(function(error){
                    console.log($scope.user);
                    $scope.error = error;
                }).then(function(){
                    $state.go('home');
                });
            };

            $scope.logIn = function(){
                auth.logIn($scope.user).error(function(){
                    $scope.error = "Hey, something went wrong. Check your email and password and try again!";
                }).then(function(){
                    $state.go('home');
                });
            };
        }])

    .controller('NavCtrl', [
        '$scope',
        'auth',
        function($scope, auth){
            $scope.isLoggedIn = auth.isLoggedIn;
            $scope.currentUser = auth.currentUser;
            $scope.currentId = auth.currentId;
            $scope.logOut = auth.logOut;
        }]);
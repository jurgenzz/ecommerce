angular.module('eCtrl', [])

    .controller('indexCtrl', ['$scope', '$http', 'auth', function($scope, $http, auth){
        //$http.get('http://localhost:3000/api)
        //    .success(function(data){
        //        console.log(data);
        //    })
        $scope.isLoggedIn = auth.isLoggedIn;

    }])
    .controller('addCtrl', function($scope, $http, $stateParams, auth) {
        // $http.post('http://localhost:3000/api/products')
        $scope.currentId = auth.currentId;
        $scope.storeId = $stateParams.storeId;
        $scope.catId = $stateParams.categoryId;
        $scope.saveProduct = function() {
            var data = $scope.product;
            $http.post('http://localhost:3000/api/user/' + $scope.currentId() + '/' + $scope.storeId + '/' + $scope.catId +"/products", data)
                .success(function() {
                    console.log(data);
                })
        }



    })

    .controller('storesCtrl', function($scope, $http, auth) {
        $scope.currentId = auth.currentId;
        $scope.stores = "";
        $http.get('http://localhost:3000/api/user/' + $scope.currentId())
            .success(function(data){
                $scope.stores = data.stores;
            });
        $scope.saveStore = function() {
            var data = $scope.stories;
            $http.post('http://localhost:3000/api/user/' + $scope.currentId() + '/stores', data)
                .success(function(data) {
                    console.log(data);
                })
        }
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
        }
    })
    .controller('productsCtrl', function($scope, $http, $stateParams, auth){
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
        };

        return auth;
    }])

    .controller('loginCtrl', [
        '$scope',
        '$state',
        'auth',
        function($scope, $state, auth){
            $scope.user = {};

            $scope.register = function(){
                auth.register($scope.user).error(function(error){
                    $scope.error = error;
                }).then(function(){
                    $state.go('home');
                });
            };

            $scope.logIn = function(){
                auth.logIn($scope.user).error(function(error){
                    $scope.error = error;
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
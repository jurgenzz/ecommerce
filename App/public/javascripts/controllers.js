angular.module('eCtrl', ['ngFileUpload'])


    .controller('indexCtrl', ['$scope', '$http', 'auth', function($scope, $http, auth){
        //check if logged in
        //$scope.isLoggedIn = auth.isLoggedIn;

    }])

    .controller('allProductsCtrl', function($scope, $http, auth) {
        $scope.currentId = auth.currentId;
        $http.get('/api/user/products/' + $scope.currentId())
            .success(function(data){
                $scope.products = data;
                //console.log(data);
            })
            .error(function() {
                $scope.message = 'Add some products first';
            })
    })
    .controller('addCtrl', function($scope, $http, $stateParams, auth, $window, Flash) {
        // $http.post('/api/products')
        $scope.currentId = auth.currentId;
        $scope.storeId = $stateParams.storeId;
        $scope.catId = $stateParams.categoryId;
        var url = 'dash#!/' + $scope.storeId + '/' + $scope.catId + '/products/';
        $scope.saveProduct = function() {
            var data = $scope.product;
            $http.post('/api/user/' + $scope.currentId() + '/' + $scope.storeId + '/' + $scope.catId +"/products"
                , data, {
                    headers: {Authorization: 'Bearer '+auth.getToken()}
                })
                .success(function() {
                    //console.log(data);
                    $window.location.href = url;
                    var message = '<strong>Product created!</strong>';
                    Flash.create('success', message, 'custom-class');
                })
        }
    })

    .controller('storesCtrl', function($scope, $http, auth, $window, Flash) {
        $scope.currentId = auth.currentId;
        $scope.stores = "";
        var url = 'dash#!/stores';
        $http.get('/api/user/' + $scope.currentId())
            .success(function(data){
                $scope.stores = data.stores;
            })
            .error(function() {
                $scope.message = 'Add some products first';
            });
        $scope.saveStore = function() {
            var data = $scope.stories;
            $http.post('/api/user/' + $scope.currentId() + '/stores', data, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
            })
                .success(function(data) {
                    //console.log(data);
                    $window.location.href = url;
                    var message = '<strong>Store created!</strong>';
                    Flash.create('success', message, 'custom-class');

                })

        };
    })


    .controller('categoriesCtrl', function($scope, $http, $stateParams, auth, $window, Flash){
        $scope.currentId = auth.currentId;
        $scope.storeId = $stateParams.storeId;
        $scope.categories = "";
        $http.get('/api/user/' + $scope.currentId() + "/" + $scope.storeId)
            .success(function(data) {
                $scope.categories = data;
                $window.localStorage['shop'] = data.name;
                //console.log(data);
            });
        $scope.saveCategory = function() {
            var storeId = $stateParams.storeId;
            var data = $scope.category;
            var url = 'dash#!/' + storeId + '/categories/';
            $http.post('/api/user/' + $scope.currentId() + '/' + storeId + '/category', data, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
            })
                .success(function(data) {
                    //console.log(data);
                    $window.location.href = url;
                    var message = '<strong>Category created!</strong>';
                    Flash.create('success', message, 'custom-class');
                })
        };
        //console.log($window.localStorage['shop']);
        $window.localStorage['shopId'] = $scope.storeId;

    })
    .controller('productsCtrl', function($scope, $http, $stateParams, auth, $window){
        $scope.currentId = auth.currentId;
        $scope.storeId = $stateParams.storeId;
        $scope.catId = $stateParams.categoryId;
        $scope.products = "";
        $http.get('/api/user/' + $scope.currentId() + '/' + $scope.storeId + '/' + $scope.catId)
            .success(function(data) {
                $scope.products = data;
                //console.log(data);

            })

            .error(function() {
                $scope.message = 'Add some products first';
            })
    })
    .controller('productCtrl', function($scope, $http, $stateParams, auth, $window, Flash){
        $scope.currentId = auth.currentId;
        $scope.storeId = $stateParams.storeId;
        $scope.catId = $stateParams.categoryId;
        $scope.productId = $stateParams.productId;
        $scope.products ="";
        var url = '/api/user/' + $scope.currentId() + '/' + $scope.storeId + '/' + $scope.catId + '/' + $scope.productId;
        $http.get(url)
            .success(function(data) {
                $scope.products = data;
                $scope.category = data.category;
                $scope.store = data.store;
                //console.log(data.category);
            })
            .error(function() {
                $scope.message = 'Add some products first';
            });

        $scope.delete = function() {
            $http.delete(url)
                .success(function(){
                    $window.location.href = 'dash#!/' + $scope.storeId + '/' + $scope.catId + '/products/';
                    var message = '<strong>Product removed!</strong>';
                    Flash.create('success', message, 'custom-class');
                })
        };
        $scope.edit = function() {
            var data= $scope.product;
            $http.put(url, data)
                .success(function() {
                    $window.location.href = 'dash#!/' + $scope.storeId + '/' + $scope.catId + '/' + $scope.productId + '/info';
                    var message = '<strong>Product changed!!</strong>';
                    Flash.create('success', message, 'custom-class');
                })
        }

    })


    .controller('sideCtrl', function($window, $scope, $http, auth) {
        $scope.currentId = auth.currentId;
        var url = "/api/user/" + $scope.currentId();
        $scope.store = $window.localStorage['shop'];
        $scope.storeId = "/" + $window.localStorage['shopId'];
        //console.log($scope.store);
        var category = "/" + $window.localStorage['category'];
        var storeUrl = '/api/user/' + $scope.currentId() + $scope.storeId;
        $http.get(storeUrl)
            .success(function(data) {
                //console.log(data);
                $scope.categories = data.categories;
            })
            .error(function() {
                $scope.message = 'Add some products first';
            });
        //console.log(storeUrl);
        $http.get(url)
            .success(function(data) {
                $scope.stores = data.stores;
                //console.log($scope.stores);
            })
    })


    .controller('NavCtrl', [
        '$scope',
        'auth',
        function($scope, auth){
            $scope.isLoggedIn = auth.isLoggedIn;
            $scope.currentUser = auth.currentUser;
            $scope.currentId = auth.currentId;
            $scope.logOut = auth.logOut;
        }])

    .controller('apiCtrl', function($scope, auth) {
        $scope.id = auth.currentId();
    })
    .controller('demoCtrl', function($scope, auth, $http, $stateParams) {
        $scope.currentId = auth.currentId;
        $http.get('/api/user/products/' + $scope.currentId())
            .success(function(data){
                $scope.products = data;
                //console.log(data);
            })
    })
    .controller('orderCtrl', function($scope, auth, $stateParams, $http) {
        console.log('ordersCtrl');
        $scope.currentId = auth.currentId;
        var url = '/api/order/' + $scope.currentId() + '/';
        $http.get(url)
            .success(function(data) {
                $scope.orders = data;
                console.log(data);
            });
    });
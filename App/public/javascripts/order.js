angular.module('myxmap', [ 'ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl:'orders/order.ejs',
                controller:'indexCtrl'

            })
            .state('order', {
                url: '/order/:userId/:productId/info/:storeId/:categoryId',
                controller:'orderCtrl',
                templateUrl:'orders/add.ejs'
            });

    })
    .controller('indexCtrl', function(){
        console.log('indexCtrl')
    })

    .controller('orderCtrl', function($scope, $stateParams, $http){
        $scope.currentId = $stateParams.userId;
        $scope.storeId = $stateParams.storeId;
        $scope.catId = $stateParams.categoryId;
        $scope.productId = $stateParams.productId;
        console.log($stateParams.storeId);
        var url = '/api/user/' + $scope.currentId + '/' + $scope.storeId + '/' + $scope.catId + '/' + $scope.productId;
        $http.get(url)
            .success(function(data){
                console.log(data);
            });

        $scope.addOrder = function() {
            var data = $scope.order;
            $http.post('/api/order/' + $scope.currentId + '/' + $scope.productId, data)
                .success(function(){
                    console.log(data);
                });
        }
    });
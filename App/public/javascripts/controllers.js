

angular.module('eCtrl', [])

    .controller('indexCtrl', ['$scope', '$http', function($scope, $http){
        $http.get('http://localhost:3000/api/products')
            .success(function(data){
                console.log(data);
            })

    }])
    .controller('addCtrl', function($scope, $http, $stateParams) {
        // $http.post('http://localhost:3000/api/products')
        $scope.id = $stateParams.userId;
        $scope.saveProduct = function() {
            var data = $scope.product;
            $http.post('http://localhost:3000/api/user/' + $scope.id + "/products", data)
                .success(function() {
                    console.log(data);
                })
        }



    })
    .controller('productsCtrl', function($scope, $http, $stateParams){
      $scope.id = $stateParams.userId;
      $scope.products = "";
        $http.get('http://localhost:3000/api/user/' + $scope.id)
            .success(function(data) {
                $scope.products = data.products;
                console.log(data);
            })
        });


angular.module('eCtrl', [])

    .controller('indexCtrl', ['$scope', '$http', function($scope, $http){
        $http.get('http://localhost:3000/api/products')
            .success(function(data){
                console.log(data);
            })

    }])
    .controller('addCtrl', function($scope, $http) {
        // $http.post('http://localhost:3000/api/products')
        $scope.saveProduct = function() {
            var data = $scope.product;
            $http.post('http://localhost:3000/api/products', data)
                .success(function() {
                    console.log(data);
                })
        }



    })
    .controller('productsCtrl', function($scope, $http){
      $scope.products = "";
        $http.get('http://localhost:3000/api/products')
            .success(function(data) {
                $scope.products = data;
            })
        });
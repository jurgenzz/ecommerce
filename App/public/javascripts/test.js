angular.module('addApp',[])

    .controller('addCtrl', function($scope, $http) {
        $scope.forma = function() {
            var data = $scope.form;
            $http.post('/api/test', data)
                .success(function(){
                    console.log(data)
                });
        }
    });
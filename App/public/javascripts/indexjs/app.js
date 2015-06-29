angular.module('indexApp', ['hljs'])

    .config(function (hljsServiceProvider) {
        hljsServiceProvider.setOptions({
            // replace tab with 2 spaces
            tabReplace: '  '
        });
    })

    .controller('docsCtrl', function($scope, $parse) {
        console.log("test");
        $scope.tabWidth = 4;
        $scope.user = '{"_id":"558fe8850063191c1a503635","emails":"test@mail.com","__v":2,"products":[],"stores":[{"_id":"558fe89a0063191c1a503636","name":"Example Store One","__v":2,"categories":["558fe8d10063191c1a503638","558fe8e90063191c1a503639"]},{"_id":"558fe8a10063191c1a503637","name":"Example Store 2","__v":0,"categories":[]}]}';

        $scope.toPrettyJSON = function (objStr, tabWidth) {
            var obj = $parse(objStr)({});

            var result = JSON.stringify(obj, null, Number(tabWidth));

            return result;
        };


    });
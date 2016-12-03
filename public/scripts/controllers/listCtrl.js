app.controller('listCtrl', ['$window','$interval', '$http', '$scope', '$rootScope', '$state', '$stateParams', 'MODULE_CONFIG',
    function($window,$interval, $http, $scope, $rootScope, $state, $stateParams, MODULE_CONFIG) {

        $scope.all=false;
        $scope.current={};

        function loadEquipments() {
            $http.get('/equipments').then(function(response) {
                if(response.data.hasOwnProperty('data')) {
                    $scope.equipments = response.data.data;
                }
            }, function(err) {
                console.log(err);
            })
        }

        loadEquipments();

        $interval(function() {
            loadEquipments();
        }, 5000);


        $scope.getId=function(id){
            $http.get('/equipments/'+id).then(function(response) {
                if(response.data.hasOwnProperty('data')){
                        if(response.data.data){
                            $scope.current=response.data.data;
                        }
                        else{
                            $scope.current.equipmentId=id;
                            $scope.current.position='Not Found';
                        }
                }
                else {
                    console.log('some Error Occured')
                }
            }, function(err) {
                console.log(err);
            })
        }

        $scope.toggle=function(){
            $scope.all = !$scope.all
        }

    }
]);

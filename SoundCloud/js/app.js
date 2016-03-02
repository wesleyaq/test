(function() {
    var app = angular.module('SoundCloud', [])
        .factory('serviceCloud', ['$http', function($http) {
            var getResult = function(topic, client) {
                return $http.get('https://api.soundcloud.com/tracks?q=' + topic + '&client_id=' + client +'&limit=11')
                    .then(function(response) {
                        return response.data;

                    });
            }

            return {
                getResult: getResult
            };
        }])
        
        .controller('SoundCloudCtrl', ['$scope', 'serviceCloud', function($scope, serviceCloud) {
            $scope.respuesta = [];
            $scope.wAudio = new Audio();
            $scope.linkTracks = 'https://api.soundcloud.com/tracks/'
            $scope.client_id = {
                'keys': [{
                    'id': 'ae1c0d2a28b3eae3bd0d11eb9e1704a4'
                }, {
                    'id': '02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea'
                }]
            };
            $scope.consumer_key = "?consumer_key=";
            $scope.ids_src = $scope.client_id.keys[Math.floor(Math.random() * $scope.client_id.keys.length)]

            $scope.mostrarResultado = function(data) {
                $scope.respuesta = data;
                for (var i = $scope.respuesta.length - 1; i >= 0; i--) {
                    console.log($scope.respuesta[i].stream_url);
                };
            }
            $scope.search = function(topic) {
                serviceCloud
                    .getResult(topic, $scope.ids_src.id)
                    .then($scope.mostrarResultado)

            };
            $scope.loadAudio = function(id_ta){
                console.log(id_ta)
            }
        }]);

})();
/*
var _ids = {
        'keys': [{
            'id': 'ae1c0d2a28b3eae3bd0d11eb9e1704a4'
        }, {
            'id': '02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea'
        }]
    }
    // var _src = "https://www.googleapis.com/youtube/v3/search"; 
var _src = 'https://api.soundcloud.com/tracks';
var _ids_src = _ids.keys[Math.floor(Math.random() * _ids.keys.length)];*/

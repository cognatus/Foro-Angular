var aplicacion = angular.module('aplicacion', []);

aplicacion.controller('Foro', function($scope, $http) {

    $scope._id = null;
    $scope.nombre = '';
    $scope.mensaje = '';
    $scope.fecha = '';
    $scope.foro = [];

    $scope.cargarForo = function(){
        $http({
            method: 'GET', url: '/listar'
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope.foro = data;
            }else{
                alert('Error al intentar recuperar los mensajes del foro.');
            }
        }).
        error(function() {
            alert('Error al intentar recuperar los mensajes del foro.');
        });
    };

    $scope.guardarForo = function() {
        $http({
            method: 'POST',
            url: '/guardar',
            params: {
                nombre: $scope.nombre,
                mensaje: $scope.mensaje,
                fecha: $scope.fecha,
                _id: $scope._id
            }
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope.limpiarDatos();
                $scope.cargarForo();    
            }else{
                alert('Error al intentar recuperar los mensajes del foro.');
            }
        }).
        error(function() {
            alert('Error al intentar recuperar los mensajes del foro.');
        });
    }
    $scope.limpiarDatos = function() {
        $scope._id = null;
        $scope.nombre = '';
        $scope.apellido = '';
        $scope.domicilio = '';
        $scope.telefono = '';
        $scope.email = '';
    };
});
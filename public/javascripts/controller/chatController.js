app.controller('chatController', ['$scope', ($scope) => {
    $scope.onlineList = [];
    const socket = io.connect("http://localhost:3000");
    socket.on('onlineList', Users => {
        $scope.onlineList = Users;
        $scope.$apply();
    })
}]);


'use strict';
/* App Controllers */

function PageController($routeParams, $http, $log) {
    var scope = this;
    scope.$log = $log;
    scope.index = parseInt($routeParams.index);
    $http.get('data/survey1.json').success(function(response){
        scope.survey = response;
    });
}
PageController.prototype.currentPage = function() {
    this.$log.log(this.survey.pages[this.index]);
    return this.survey.pages[this.index];
};

PageController.$inject = ['$routeParams', '$http', '$log'];

function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];

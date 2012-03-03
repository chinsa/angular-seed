(function() {
  'use strict';
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  namespace('Questionnaire');

  this.Questionnaire.ApplicationController = (function() {

    ApplicationController.$inject = ['$rootScope'];

    function ApplicationController($scope) {
      var _this = this;
      this.$scope = $scope;
      this.$scope.$on('$afterRouteChange', function(scope, current, previous) {
        _this.$scope.questionnaireId = current.params.questionnaire;
        return _this.$scope.questionIndex = current.params.question;
      });
    }

    return ApplicationController;

  })();

  this.Questionnaire.QuestionnaireListController = (function() {

    QuestionnaireListController.$inject = ['$scope', 'QuestionnaireService'];

    function QuestionnaireListController($scope, QuestionnaireService) {
      var _this = this;
      this.$scope = $scope;
      this.QuestionnaireService = QuestionnaireService;
      this.showPage = __bind(this.showPage, this);
      this.$scope.showPage = this.showPage;
      this.QuestionnaireService.list().success(function(response) {
        return angular.extend(_this.$scope, response);
      });
    }

    QuestionnaireListController.prototype.showPage = function() {
      return this.$scope.questionnaireId === '';
    };

    return QuestionnaireListController;

  })();

  this.Questionnaire.QuestionnaireController = (function() {

    QuestionnaireController.$inject = ['$scope', 'QuestionnaireService'];

    function QuestionnaireController($scope, QuestionnaireService) {
      var _this = this;
      this.$scope = $scope;
      this.QuestionnaireService = QuestionnaireService;
      this.showPage = __bind(this.showPage, this);
      this.$scope.showPage = this.showPage;
      this.$scope.$watch('questionnaireId', function() {
        return QuestionnaireService.get(_this.questionnaireId).success(function(questionnaire) {
          return angular.extend(_this.$scope, questionnaire);
        });
      });
    }

    QuestionnaireController.prototype.showPage = function() {
      return this.$scope.questionnaireId !== '' && !angular.isNumber(this.$scope.questionIndex);
    };

    return QuestionnaireController;

  })();

  this.Questionnaire.QuestionController = (function() {

    QuestionController.$inject = ['$scope'];

    function QuestionController($scope) {
      this.$scope = $scope;
      this.choiceCSSClass = __bind(this.choiceCSSClass, this);
    }

    QuestionController.prototype.choiceCSSClass = function(page, choice) {
      if (page.response === choice) {
        return 'blue';
      } else {
        return 'white';
      }
    };

    return QuestionController;

  })();

}).call(this);

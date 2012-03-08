(function() {
  'use strict';
  angular.module('AppConfig', []).config([
    '$routeProvider', function($routeProvider) {
      var _this = this;
      $routeProvider.when('/', {
        template: '/templates/questionnaire-list.html'
      });
      $routeProvider.when('/:questionnaire', {
        template: '/templates/questionnaire-details.html',
        handler: function(current) {
          return $rootScope.questionnaireId = current.params.questionnaire;
        }
      });
      $routeProvider.when('/:questionnaire/summary', {
        template: '/templates/questionnaire-summary.html',
        handler: function(current) {
          return $rootScope.questionnaireId = current.params.questionnaire;
        }
      });
      return $routeProvider.when('/:questionnaire/:question', {
        template: '/templates/question.html',
        handler: function(current) {
          $rootScope.questionnaireId = current.params.questionnaire;
          return $rootScope.questionIndex = Number(current.params.question);
        }
      });
    }
  ]).run([
    'PageRouter', function(PageRouter) {
      return PageRouter.run();
    }
  ]);

}).call(this);

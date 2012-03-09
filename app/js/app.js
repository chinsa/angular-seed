(function() {
  'use strict';
  angular.module('AppConfig', []).config([
    '$routeProvider', function($routeProvider) {
      var updateQuestionnIndex, updateQuestionnaire,
        _this = this;
      updateQuestionnaire = function(scope, next) {
        var questionnaire, _ref;
        questionnaire = (_ref = next.params.questionnaire) != null ? _ref : '';
        return scope.$root.questionnaireId = questionnaire;
      };
      updateQuestionnIndex = function(scope, next) {
        var questionIndex;
        questionIndex = Number(next.params.questionIndex);
        if ((questionIndex != null) && !isNaN(questionIndex)) {
          return scope.$root.questionIndex = questionIndex;
        } else {
          return next.redirectTo = '/';
        }
      };
      $routeProvider.when('/', {
        template: '/templates/questionnaire-list.html'
      });
      $routeProvider.when('/:questionnaire', {
        template: '/templates/questionnaire-detail.html',
        handler: function(scope, next) {
          return updateQuestionnaire(scope, next);
        }
      });
      $routeProvider.when('/:questionnaire/summary', {
        template: '/templates/questionnaire-summary.html',
        handler: function(scope, next) {
          return updateQuestionnaire(scope, next);
        }
      });
      $routeProvider.when('/:questionnaire/0', {
        redirectTo: '/:questionnaire'
      });
      return $routeProvider.when('/:questionnaire/:questionIndex', {
        template: '/templates/question.html',
        handler: function(scope, next) {
          updateQuestionnaire(scope, next);
          return updateQuestionnIndex(scope, next);
        }
      });
    }
  ]);

}).call(this);

(function() {
  'use strict';
  /* http://docs.angularjs.org/#!angular.service
  */
  namespace("Questionnaire", {
    QuestionnaireApplication: [
      'RouteHandler', '$rootScope', '$routeParams', function(RouteHandler, $rootScope, $routeParams) {
        var _this = this;
        RouteHandler.handle('/', {
          template: '/templates/questionnaire-list.html'
        });
        RouteHandler.handle('/:questionnaire', {
          template: '/templates/questionnaire-details.html',
          handler: function(current) {
            return $rootScope.questionnaireId = $routeParams.questionnaire;
          }
        });
        RouteHandler.handle('/:questionnaire/summary', {
          template: '/templates/questionnaire-summary.html',
          handler: function(current) {
            return $rootScope.questionnaireId = $routeParams.questionnaire;
          }
        });
        return RouteHandler.handle('/:questionnaire/:question', {
          template: '/templates/question.html',
          handler: function(current) {
            $rootScope.questionnaireId = $routeParams.questionnaire;
            return $rootScope.questionIndex = Number($routeParams.question);
          }
        });
      }
    ]
  });

}).call(this);

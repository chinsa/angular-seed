(function() {
  'use strict';
  /* http://docs.angularjs.org/#!angular.service
  */
  namespace("Questionnaire", {
    QuestionnaireApplication: [
      '$route', 'PageManager', function($route, PageManager) {
        $route.when('/', {
          pageName: 'list'
        });
        $route.when('/q/:questionnaire/p/:page', {
          pageName: function(route) {
            return "page-" + route.params.page;
          }
        });
        $route.when('/q/:questionnaire', {
          pageName: 'page-0'
        });
        $route.otherwise({
          redirectTo: '/'
        });
        return PageManager.addPage({
          name: 'list',
          template: 'templates/questionnaires.html'
        });
      }
    ]
  });

}).call(this);

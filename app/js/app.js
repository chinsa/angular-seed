(function() {
  'use strict';
  /* http://docs.angularjs.org/#!angular.service
  */
  namespace("Questionnaire", {
    QuestionnaireApplication: [
      '$route', '$rootScope', function($route, $rootScope) {
        $route.when('/');
        $route.when('/:questionnaire');
        $route.when('/:questionnaire/:question');
        return $rootScope.pages = [
          {
            name: 'questionnaire-list',
            template: '/templates/questionnaire-list.html'
          }, {
            name: 'questionnaire-detail',
            template: 'templates/questionnaire-detail.html'
          }
        ];
      }
    ]
  });

}).call(this);

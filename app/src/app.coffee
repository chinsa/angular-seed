'use strict'
### http://docs.angularjs.org/#!angular.service ###

namespace "Questionnaire"
  QuestionnaireApplication:
      ['$route', '$rootScope'
      ($route, $rootScope)->
        $route.when('/')
        $route.when('/:questionnaire')
        $route.when('/:questionnaire/:question')

        # Add the initial pages to show for this application
        $rootScope.pages = [
          name: 'questionnaire-list'
          template: '/templates/questionnaire-list.html'
        ,
          name: 'questionnaire-detail'
          template: 'templates/questionnaire-detail.html'
        ]
      ]

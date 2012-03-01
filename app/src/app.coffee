'use strict'
### http://docs.angularjs.org/#!angular.service ###

namespace "Questionnaire"
  QuestionnaireApplication:
      ['$route', 'PageManager'
      ($route, PageManager)->
        # These are "page" routes, which means that they contain a pageName parameter.
        # The pageName is either a string or a function that returns a string.
        # The PageManager service uses this parameter to select which page to display.
        $route.when('/', { pageName: 'list' })
        $route.when('/q/:questionnaire/p/:page', { pageName: (route)->"page-#{route.params.page}" })
        $route.when('/q/:questionnaire', { pageName: 'page-0' })
        $route.otherwise({ redirectTo: '/'})

        # Add the initial page to show for this application
        PageManager.addPage(
          name: 'list'
          template: 'templates/questionnaires.html'
        )
      ]
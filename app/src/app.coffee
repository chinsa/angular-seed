'use strict'
### http://docs.angularjs.org/#!angular.service ###

namespace "Questionnaire"
  QuestionnaireApplication:
    ['RouteHandler', '$rootScope', '$routeParams', (RouteHandler, $rootScope, $routeParams)->
    
      RouteHandler.handle('/',
        template: '/templates/questionnaire-list.html'
      )
      RouteHandler.handle('/:questionnaire',
        template: '/templates/questionnaire-details.html'
        handler: (current)=>
          $rootScope.questionnaireId = $routeParams.questionnaire
      )
      RouteHandler.handle('/:questionnaire/summary',
        template: '/templates/questionnaire-summary.html',
        handler: (current)=>
          $rootScope.questionnaireId = $routeParams.questionnaire
      )
      RouteHandler.handle('/:questionnaire/:question',
        template: '/templates/question.html'
        handler: (current)=>
          $rootScope.questionnaireId = $routeParams.questionnaire
          $rootScope.questionIndex = Number($routeParams.question)
      )
    ]

'use strict'

angular.module('AppConfig',[])
  .config(['$routeProvider', ($routeProvider)->
    # Set up the routes and their handlers    
    $routeProvider.when('/',
      template: '/templates/questionnaire-list.html'
    )
    $routeProvider.when('/:questionnaire',
      template: '/templates/questionnaire-details.html'
      handler: (current)=>
        $rootScope.questionnaireId = current.params.questionnaire
    )
    $routeProvider.when('/:questionnaire/summary',
      template: '/templates/questionnaire-summary.html',
      handler: (current)=>
        $rootScope.questionnaireId = current.params.questionnaire
    )
    $routeProvider.when('/:questionnaire/:question',
      template: '/templates/question.html'
      handler: (current)=>
        $rootScope.questionnaireId = current.params.questionnaire
        $rootScope.questionIndex = Number(current.params.question)
    )
  ])
  .run(['PageRouter', (PageRouter)->
    PageRouter.run()
  ])
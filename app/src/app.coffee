'use strict'

angular.module('AppConfig',[])
  .config(['$routeProvider', ($routeProvider)->
    updateQuestionnaire = (scope, next)->
      questionnaire = next.params.questionnaire ?  ''
      scope.$root.questionnaireId = questionnaire
    
    updateQuestionnIndex = (scope, next)->
      questionIndex = Number(next.params.questionIndex)
      if questionIndex? and not isNaN(questionIndex)
        scope.$root.questionIndex = questionIndex
      else
        next.redirectTo = '/'

    # Set up the routes and their handlers    
    $routeProvider.when('/',
      template: '/templates/questionnaire-list.html'
    )
    $routeProvider.when('/:questionnaire',
      template: '/templates/questionnaire-detail.html'
      handler: (scope, next)=>
        updateQuestionnaire(scope, next)
    )
    $routeProvider.when('/:questionnaire/summary',
      template: '/templates/questionnaire-summary.html',
      handler: (scope, next)=>
        updateQuestionnaire(scope, next)
    )
    $routeProvider.when('/:questionnaire/0',
      redirectTo: '/:questionnaire'
    )    
    $routeProvider.when('/:questionnaire/:questionIndex',
      template: '/templates/question.html'
      handler: (scope, next)=>
        updateQuestionnaire(scope, next)
        updateQuestionnIndex(scope, next)
    )
  ])

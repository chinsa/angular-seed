'use strict'
### http://docs.angularjs.org/#!angular.service ###

Services = angular.module('Services', [])

# A service that enables pages to be displayed based on the routeParams
class PageManager
  constructor: ($rootScope, $location, @$log)->
    # Initialize the page list and and wire it up to the rootScope so that the view can display them
    $rootScope.pages = @pages = {}
    # Hook into the route change event so that we can update which page is current
    $rootScope.$on '$afterRouteChange', (scope, next, current)=>
      # Extract the page name from the route falling back on the params if the function does not exist or returns nothing
      $rootScope.currentPageName = next.$route?.pageName?(next) ? next.$route?.pageName ? next.params.page
      @$log.log "Current page is now '#{$rootScope.currentPageName}'"

  addPage: (page)->
    @$log.log "Adding page: '#{page.name}'"
    @pages[page.name]=page

  removePage: (name)->
    @$log.log "Deleting page: '#{name}'"
    @pages.delete[name]

Services.factory("PageManager", ['$rootScope','$location', '$log', ($rootScope, $location, $log)-> new PageManager($rootScope, $location, $log)])

# A service that provides access to the questionnaire data
class QuestionnaireService
  constructor: (@$http, $rootScope, @PageManager, @$log)->
    @$log.log "Initializing QuestionnaireService"
    
    $rootScope.$on '$beforeRouteChange', (scope, next, current)=>
      # Update the questionnaire name if it has changed
      $rootScope.currentQuestionnaireName = next.params.questionnaire
    
    $rootScope.$watch('currentQuestionnaireName', ()=>
      @deleteQuestionPages($rootScope.currentQuestionnaire) if $rootScope.currentQuestionnaire?
      $rootScope.currentQuestionnaire = null
      if $rootScope.currentQuestionnaireName?
        @load($rootScope.currentQuestionnaireName).success (questionnaire)=>
          $rootScope.currentQuestionnaire = questionnaire
          @createQuestionsPages($rootScope.currentQuestionnaire) if $rootScope.currentQuestionnaire?
    )

  deleteQuestionPages: (questionnaire)->
    for question in questionnaire.questions
      delete @PageManager.removePage("#{questionnaire.name}-{question.name}")

  createQuestionsPages: (questionnaire)->
    for question, i in questionnaire.questions
      @PageManager.addPage(
        name: "#{questionnaire.name}-{question.name}"
        type: "question"
        template: "templates/question-#{question.type}.html",
        question: question
        next: "#{questionnaire.name}-{questionnaire.questions[i+1].name}" if i+1 < questionnaire.questions.length
        previous: "#{questionnaire.name}-{questionnaire.questions[i-1].name}" if i > 0
      )


  list: ()->
    @$log.log "Questionnaire List Requested"
    unless @questionnairePromise?    
      @$log.log "Loading Questionnaire List"
      @currentQuestionnaire = null
      @questionnairePromise = @$http
        .get('data/questionnaires.json')
        .success (questionnaires)=>
          @$log.log "Questionnaire List Received"
          questionnaires
    @questionnairePromise

  load: (name)->
    @$log.log "Questionnaire '#{name}' Loading"
    @currentQuestionnaire = @$http
      .get("data/questionnaires/#{name}.json")
      .success (questionnaire)=>
        @$log.log "Questionnaire '#{name}' Loaded"
        questionnaire

Services.factory("QuestionnaireService", ['$http', '$rootScope','PageManager','$log', ($http, $rootScope, PageManager, $log)-> new QuestionnaireService($http, $rootScope, PageManager, $log)])

# A services that manages the responses
class ResponseManager
  constructor: (@QuestionnaireService, @$log)->
    return this

  newResponse: ()->
    date = new Date()
    @qs.currentQuestionnaire.success (questionnaire)=>
      @currentResponse =
        questionnaire: questionnaire
        submission:
          date: date.toDateString()
          time: date.getTime()
        hash: null
        responses: (question: question, choice: null for question in questionnaire.questions)

Services.factory("ResponseManager", ['QuestionnaireService', '$log', (QS, $log)-> new ResponseManager(QS, $log)])
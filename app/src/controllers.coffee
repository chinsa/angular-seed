'use strict'
class @StepController
  @inject: ['$routeParams','Survey']
  constructor: ($routeParams, Survey)->
    @surveyId = $routeParams.survey
    @step = $routeParams.step
    @survey = Survey.get(survey: $routeParams.survey, (survey)=>
      @step = survey.questions[$routeParams.step]
    )


# App Controllers
class @SurveyController
  @$inject: ['$routeParams','Survey']
  constructor: ($routeParams, Survey)->
    console.log($routeParams)
    @survey = Survey.get(survey: $routeParams.survey, ()=>
      @pages = []
      @pages.push(new IntroPage(0, @survey.title, @survey.description))
      questionPages = []
      for question, index in @survey.questions
        page = new QuestionPage(question, index+1)
        questionPages.push(page)
      Array::push.apply(@pages,questionPages)
      @pages.push(new ResponsePage(questionPages, @pages.length))
    )
    @currentPage = 0

  isCurrentPage: (page)->
    page.index is @currentPage

  hasNextPage: ()->
    @currentPage < @pages.length-1

  hasPreviousPage: ()->
    @currentPage > 0

  goToNextPage: ()->
    @currentPage += 1

  goToPreviousPage: ()->
    @currentPage -= 1

  goToPage: (pageIndex)->
    @currentPage = pageIndex

  canMoveToNext: (page)->
    page.response? or not page.question?

  selectChoice: (page, choice)->
    page.response = choice

  responseCSSClass: (page) ->
    if @isValid(page)
      'success' 
    else
      'warning'

  choiceCSSClass: (page, choice)->
    if page.response is choice 
      'blue'
    else
      'white'

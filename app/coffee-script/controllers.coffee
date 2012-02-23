'use strict'
class Page
  constructor: (@index, @title, @description, @type='simple')->

class QuestionPage extends Page
  constructor: (@question, index)->
    super(index, @question.title, @question.description, "question-#{@question.type}")

class IntroPage extends Page

class ResponsePage extends Page
  constructor: (@questionPages, index, title, description)->
    super(title, description, 'response')

# App Controllers
class @SurveyController
  @$inject: ['Survey']
  constructor: (Survey)->
    @survey = Survey.get( ()=>
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

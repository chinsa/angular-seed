'use strict'

# App Controllers
class @SurveyController
  @$inject: ['Survey']
  constructor: (Survey)->
    @survey = Survey.get()
    @currentPage = 0

  isCurrentPage: (page)->
    page is @survey.pages[@currentPage]

  hasNextPage: ()->
    @currentPage < @survey.pages.length-1

  hasPreviousPage: ()->
    @currentPage > 0

  goToNextPage: ()->
    @currentPage += 1

  goToPreviousPage: ()->
    @currentPage -= 1

  goToPage: (page)->
    @currentPage = i for p, i in @survey.pages when p is page

  isValid: (page)->
    page.response?

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

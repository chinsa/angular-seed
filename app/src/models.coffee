class @Page
  constructor: (@index, @title, @description, @type='simple')->

class @QuestionPage extends Page
  constructor: (@question, index)->
    super(index, @question.title, @question.description, "question-#{@question.type}")

class @IntroPage extends Page

class @ResponsePage extends Page
  constructor: (@questionPages, index, title, description)->
    super(index, title, description, 'response')


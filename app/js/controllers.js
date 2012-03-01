(function() {
  'use strict';
  this.StepController = (function() {

    StepController.inject = ['$routeParams', 'Survey'];

    function StepController($routeParams, Survey) {
      var _this = this;
      this.surveyId = $routeParams.survey;
      this.step = $routeParams.step;
      this.survey = Survey.get({
        survey: $routeParams.survey
      }, function(survey) {
        return _this.step = survey.questions[$routeParams.step];
      });
    }

    return StepController;

  })();

  this.SurveyController = (function() {

    SurveyController.$inject = ['$routeParams', 'Survey'];

    function SurveyController($routeParams, Survey) {
      var _this = this;
      console.log($routeParams);
      this.survey = Survey.get({
        survey: $routeParams.survey
      }, function() {
        var index, page, question, questionPages, _len, _ref;
        _this.pages = [];
        _this.pages.push(new IntroPage(0, _this.survey.title, _this.survey.description));
        questionPages = [];
        _ref = _this.survey.questions;
        for (index = 0, _len = _ref.length; index < _len; index++) {
          question = _ref[index];
          page = new QuestionPage(question, index + 1);
          questionPages.push(page);
        }
        Array.prototype.push.apply(_this.pages, questionPages);
        return _this.pages.push(new ResponsePage(questionPages, _this.pages.length));
      });
      this.currentPage = 0;
    }

    SurveyController.prototype.isCurrentPage = function(page) {
      return page.index === this.currentPage;
    };

    SurveyController.prototype.hasNextPage = function() {
      return this.currentPage < this.pages.length - 1;
    };

    SurveyController.prototype.hasPreviousPage = function() {
      return this.currentPage > 0;
    };

    SurveyController.prototype.goToNextPage = function() {
      return this.currentPage += 1;
    };

    SurveyController.prototype.goToPreviousPage = function() {
      return this.currentPage -= 1;
    };

    SurveyController.prototype.goToPage = function(pageIndex) {
      return this.currentPage = pageIndex;
    };

    SurveyController.prototype.canMoveToNext = function(page) {
      return (page.response != null) || !(page.question != null);
    };

    SurveyController.prototype.selectChoice = function(page, choice) {
      return page.response = choice;
    };

    SurveyController.prototype.responseCSSClass = function(page) {
      if (this.isValid(page)) {
        return 'success';
      } else {
        return 'warning';
      }
    };

    SurveyController.prototype.choiceCSSClass = function(page, choice) {
      if (page.response === choice) {
        return 'blue';
      } else {
        return 'white';
      }
    };

    return SurveyController;

  })();

}).call(this);

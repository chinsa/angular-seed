(function() {
  'use strict';
  var IntroPage, Page, QuestionPage, ResponsePage,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Page = (function() {

    function Page(index, title, description, type) {
      this.index = index;
      this.title = title;
      this.description = description;
      this.type = type != null ? type : 'simple';
    }

    return Page;

  })();

  QuestionPage = (function(_super) {

    __extends(QuestionPage, _super);

    function QuestionPage(question, index) {
      this.question = question;
      QuestionPage.__super__.constructor.call(this, index, this.question.title, this.question.description, "question-" + this.question.type);
    }

    return QuestionPage;

  })(Page);

  IntroPage = (function(_super) {

    __extends(IntroPage, _super);

    function IntroPage() {
      IntroPage.__super__.constructor.apply(this, arguments);
    }

    return IntroPage;

  })(Page);

  ResponsePage = (function(_super) {

    __extends(ResponsePage, _super);

    function ResponsePage(questionPages, index, title, description) {
      this.questionPages = questionPages;
      ResponsePage.__super__.constructor.call(this, title, description, 'response');
    }

    return ResponsePage;

  })(Page);

  this.SurveyController = (function() {

    SurveyController.$inject = ['Survey'];

    function SurveyController(Survey) {
      var _this = this;
      this.survey = Survey.get(function() {
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

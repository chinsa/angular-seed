(function() {
  'use strict';
  this.SurveyController = (function() {

    SurveyController.$inject = ['Survey'];

    function SurveyController(Survey) {
      this.survey = Survey.get();
      this.currentPage = 0;
    }

    SurveyController.prototype.isCurrentPage = function(page) {
      return page === this.survey.pages[this.currentPage];
    };

    SurveyController.prototype.hasNextPage = function() {
      return this.currentPage < this.survey.pages.length - 1;
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

    SurveyController.prototype.goToPage = function(page) {
      var i, p, _len, _ref, _results;
      _ref = this.survey.pages;
      _results = [];
      for (i = 0, _len = _ref.length; i < _len; i++) {
        p = _ref[i];
        if (p === page) _results.push(this.currentPage = i);
      }
      return _results;
    };

    SurveyController.prototype.isValid = function(page) {
      return page.response != null;
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

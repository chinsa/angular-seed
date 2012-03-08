(function() {
  'use strict';
  var QuestionnaireService, createFactory;

  QuestionnaireService = (function() {

    QuestionnaireService.$inject = ['$http', '$log'];

    function QuestionnaireService($http, $log) {
      this.$http = $http;
      this.$log = $log;
      this.$log.log("QuestionnaireService: Initializing");
      this.questionnairePromises = [];
      this.questionnaireListPromise = null;
    }

    QuestionnaireService.prototype.list = function() {
      var _this = this;
      this.$log.log("QuestionnaireService: List Requested");
      if (this.questionnaireListPromise == null) {
        this.$log.log("QuestionnaireService: Loading List");
        this.questionnaireListPromise = this.$http.get('data/questionnaires.json').success(function(questionnaires) {
          _this.$log.log("QuestionnaireService: List Loaded");
          return questionnaires;
        });
      }
      return this.questionnaireListPromise.success(function(questionnaire) {});
    };

    QuestionnaireService.prototype.get = function(name) {
      var _this = this;
      this.$log.log("QuestionnaireService: Questionnaire '" + name + "' Requested");
      if (this.questionnairePromises[name] == null) {
        this.$log.log("QuestionnaireService: Questionnaire '" + name + "' Loading");
        this.questionnairePromises[name] = this.$http.get("data/questionnaires/" + name + ".json").success(function(questionnaire) {
          _this.$log.log("QuestionnaireService: Questionnaire '" + name + "' Loaded");
          return questionnaire;
        });
      }
      return this.questionnairePromises[name];
    };

    QuestionnaireService.prototype.newResponse = function() {
      var date,
        _this = this;
      date = new Date();
      return this.qs.currentQuestionnaire.success(function(questionnaire) {
        var question;
        return _this.currentResponse = {
          questionnaire: questionnaire,
          submission: {
            date: date.toDateString(),
            time: date.getTime()
          },
          hash: null,
          responses: (function() {
            var _i, _len, _ref, _results;
            _ref = questionnaire.questions;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              question = _ref[_i];
              _results.push({
                question: question,
                choice: null
              });
            }
            return _results;
          })()
        };
      });
    };

    return QuestionnaireService;

  })();

  createFactory = function(Cls) {
    return [
      '$injector', function($injector) {
        return $injector.instantiate(Cls);
      }
    ];
  };

  angular.module('QuestionnaireModule', []).factory("QuestionnaireService", createFactory(QuestionnaireService));

}).call(this);

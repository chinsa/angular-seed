(function() {
  'use strict';
  /* http://docs.angularjs.org/#!angular.service
  */
  var QuestionnaireService, ResponseManager, Services;

  Services = angular.module('Services', []);

  QuestionnaireService = (function() {

    function QuestionnaireService($http, $rootScope, $routeParams, $log) {
      this.$http = $http;
      this.$rootScope = $rootScope;
      this.$log = $log;
      this.$log.log("QuestionnaireService: Initializing QuestionnaireService");
      this.questionnairePromises = [];
      this.questionnaireListPromise = null;
    }

    QuestionnaireService.prototype.deleteQuestionPages = function() {};

    QuestionnaireService.prototype.createQuestionsPages = function(questionnaire) {
      var i, question, _len, _ref, _results;
      this.questionPages = [];
      _ref = questionnaire.questions;
      _results = [];
      for (i = 0, _len = _ref.length; i < _len; i++) {
        question = _ref[i];
        _results.push(this.questionPages.push({
          name: "page-" + i,
          type: "question",
          template: "templates/question-" + question.type + ".html",
          question: question,
          next: i + 1 < questionnaire.questions.length ? "" + questionnaire._id + "-" + questionnaire.questions[i + 1].name : void 0,
          previous: i > 0 ? "" + questionnaire._id + "-" + questionnaire.questions[i - 1].name : void 0
        }));
      }
      return _results;
    };

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

    return QuestionnaireService;

  })();

  Services.factory("QuestionnaireService", [
    '$http', '$rootScope', '$routeParams', '$log', function($http, $rootScope, $routeParams, $log) {
      return new QuestionnaireService($http, $rootScope, $routeParams, $log);
    }
  ]);

  ResponseManager = (function() {

    function ResponseManager(QuestionnaireService, $log) {
      this.QuestionnaireService = QuestionnaireService;
      this.$log = $log;
      return this;
    }

    ResponseManager.prototype.newResponse = function() {
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

    return ResponseManager;

  })();

  Services.factory("ResponseManager", [
    'QuestionnaireService', '$log', function(QS, $log) {
      return new ResponseManager(QS, $log);
    }
  ]);

}).call(this);

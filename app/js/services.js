(function() {
  'use strict';
  /* http://docs.angularjs.org/#!angular.service
  */
  var PageManager, QuestionnaireService, ResponseManager, Services;

  Services = angular.module('Services', []);

  PageManager = (function() {

    function PageManager($rootScope, $location, $log) {
      var _this = this;
      this.$log = $log;
      $rootScope.pages = this.pages = {};
      $rootScope.$on('$afterRouteChange', function(scope, next, current) {
        var _ref, _ref2, _ref3, _ref4;
        $rootScope.currentPageName = (_ref = (_ref2 = (_ref3 = next.$route) != null ? typeof _ref3.pageName === "function" ? _ref3.pageName(next) : void 0 : void 0) != null ? _ref2 : (_ref4 = next.$route) != null ? _ref4.pageName : void 0) != null ? _ref : next.params.page;
        return _this.$log.log("Current page is now '" + $rootScope.currentPageName + "'");
      });
    }

    PageManager.prototype.addPage = function(page) {
      this.$log.log("Adding page: '" + page.name + "'");
      return this.pages[page.name] = page;
    };

    PageManager.prototype.removePage = function(name) {
      this.$log.log("Deleting page: '" + name + "'");
      return this.pages["delete"][name];
    };

    return PageManager;

  })();

  Services.factory("PageManager", [
    '$rootScope', '$location', '$log', function($rootScope, $location, $log) {
      return new PageManager($rootScope, $location, $log);
    }
  ]);

  QuestionnaireService = (function() {

    function QuestionnaireService($http, $rootScope, PageManager, $log) {
      var _this = this;
      this.$http = $http;
      this.PageManager = PageManager;
      this.$log = $log;
      this.$log.log("Initializing QuestionnaireService");
      $rootScope.$on('$beforeRouteChange', function(scope, next, current) {
        return $rootScope.currentQuestionnaireName = next.params.questionnaire;
      });
      $rootScope.$watch('currentQuestionnaireName', function() {
        if ($rootScope.currentQuestionnaire != null) {
          _this.deleteQuestionPages($rootScope.currentQuestionnaire);
        }
        $rootScope.currentQuestionnaire = null;
        if ($rootScope.currentQuestionnaireName != null) {
          return _this.load($rootScope.currentQuestionnaireName).success(function(questionnaire) {
            $rootScope.currentQuestionnaire = questionnaire;
            if ($rootScope.currentQuestionnaire != null) {
              return _this.createQuestionsPages($rootScope.currentQuestionnaire);
            }
          });
        }
      });
    }

    QuestionnaireService.prototype.deleteQuestionPages = function(questionnaire) {
      var question, _i, _len, _ref, _results;
      _ref = questionnaire.questions;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        question = _ref[_i];
        _results.push(delete this.PageManager.removePage("" + questionnaire.name + "-{question.name}"));
      }
      return _results;
    };

    QuestionnaireService.prototype.createQuestionsPages = function(questionnaire) {
      var i, question, _len, _ref, _results;
      _ref = questionnaire.questions;
      _results = [];
      for (i = 0, _len = _ref.length; i < _len; i++) {
        question = _ref[i];
        _results.push(this.PageManager.addPage({
          name: "" + questionnaire.name + "-{question.name}",
          type: "question",
          template: "templates/question-" + question.type + ".html",
          question: question,
          next: i + 1 < questionnaire.questions.length ? "" + questionnaire.name + "-{questionnaire.questions[i+1].name}" : void 0,
          previous: i > 0 ? "" + questionnaire.name + "-{questionnaire.questions[i-1].name}" : void 0
        }));
      }
      return _results;
    };

    QuestionnaireService.prototype.list = function() {
      var _this = this;
      this.$log.log("Questionnaire List Requested");
      if (this.questionnairePromise == null) {
        this.$log.log("Loading Questionnaire List");
        this.currentQuestionnaire = null;
        this.questionnairePromise = this.$http.get('data/questionnaires.json').success(function(questionnaires) {
          _this.$log.log("Questionnaire List Received");
          return questionnaires;
        });
      }
      return this.questionnairePromise;
    };

    QuestionnaireService.prototype.load = function(name) {
      var _this = this;
      this.$log.log("Questionnaire '" + name + "' Loading");
      return this.currentQuestionnaire = this.$http.get("data/questionnaires/" + name + ".json").success(function(questionnaire) {
        _this.$log.log("Questionnaire '" + name + "' Loaded");
        return questionnaire;
      });
    };

    return QuestionnaireService;

  })();

  Services.factory("QuestionnaireService", [
    '$http', '$rootScope', 'PageManager', '$log', function($http, $rootScope, PageManager, $log) {
      return new QuestionnaireService($http, $rootScope, PageManager, $log);
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

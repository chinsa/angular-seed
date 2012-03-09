(function() {
  'use strict';
  var QuestionnaireService, createFactory,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  QuestionnaireService = (function() {

    QuestionnaireService.$inject = ['$http', '$rootScope', '$q', '$log'];

    function QuestionnaireService($http, $rootScope, $q, $log) {
      var _this = this;
      this.$http = $http;
      this.$rootScope = $rootScope;
      this.$q = $q;
      this.$log = $log;
      this.newResponse = __bind(this.newResponse, this);
      this.clearQuestionnaire = __bind(this.clearQuestionnaire, this);
      this.updateCurrentQuestionnaire = __bind(this.updateCurrentQuestionnaire, this);
      this.$log.log("QuestionnaireService: Initializing");
      this.questionnaireListPromise = null;
      this.currentQuestionnairePromise = null;
      this.questionnairePromises = [];
      this.$rootScope.$watch('questionnaireId', function(id) {
        if (id == null) id = '';
        return _this.updateCurrentQuestionnaire(id);
      });
      this.$rootScope.$watch('questionIndex', function(value) {});
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
      return this.questionnaireListPromise;
    };

    QuestionnaireService.prototype.get = function(id) {
      var q,
        _this = this;
      if (id === '') {
        this.$log.log("QuestionnaireService: Questionnaire '" + id + "' is Invalid");
        q = this.$q.defer();
        q.reject('Invalid questionnaire id');
        return q.promise;
      } else {
        this.$log.log("QuestionnaireService: Questionnaire '" + id + "' Requested");
        if (this.questionnairePromises[id] == null) {
          this.$log.log("QuestionnaireService: Questionnaire '" + id + "' Loading");
          this.questionnairePromises[id] = this.$http.get("data/questionnaires/" + id + ".json").success(function(questionnaire) {
            return _this.$log.log("QuestionnaireService: Questionnaire '" + id + "' Loaded");
          });
        }
        return this.questionnairePromises[id];
      }
    };

    QuestionnaireService.prototype.updateCurrentQuestionnaire = function(id) {
      var _this = this;
      return this.currentQuestionnairePromise = this.get(id).then(function(response) {
        var questionnaire;
        questionnaire = response.data;
        _this.$rootScope.questionnaire = questionnaire;
        return _this.$rootScope.response = _this.newResponse(questionnaire);
      }, function() {
        return _this.clearQuestionnaire();
      });
    };

    QuestionnaireService.prototype.clearQuestionnaire = function() {
      this.$rootScope.questionnaire = null;
      return this.$rootScope.response = null;
    };

    QuestionnaireService.prototype.newResponse = function(questionnaire) {
      var now;
      now = new Date();
      return this.$rootScope.response = {
        questionnaire: questionnaire._id,
        date: now.toDateString(),
        time: now.getTime(),
        type: 'response',
        answers: questionnaire.questions.map(function(question, index) {
          return {
            question: question,
            questionIndex: index + 1,
            isValid: false
          };
        })
      };
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

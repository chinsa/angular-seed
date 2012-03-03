(function() {
  'use strict';
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  namespace('Questionnaire');

  this.Questionnaire.ApplicationController = (function() {

    ApplicationController.$inject = ['$rootScope', '$location', '$log', 'QuestionnaireService'];

    function ApplicationController($rootScope, $location, $log, QuestionnaireService) {
      var _this = this;
      this.$rootScope = $rootScope;
      this.$location = $location;
      this.$log = $log;
      this.QuestionnaireService = QuestionnaireService;
      this.onQuestionnaireChanged = __bind(this.onQuestionnaireChanged, this);
      this.onPathChanged = __bind(this.onPathChanged, this);
      this.$rootScope.$watch((function() {
        return _this.$location.path();
      }), this.onPathChanged);
      this.$rootScope.$watch('questionnaireId', this.onQuestionnaireChanged);
    }

    ApplicationController.prototype.onPathChanged = function() {
      var urlParts, _ref;
      urlParts = this.$location.path().split('/');
      this.$rootScope.questionnaireId = (_ref = urlParts != null ? urlParts[1] : void 0) != null ? _ref : '';
      this.$rootScope.questionIndex = Number(urlParts != null ? urlParts[2] : void 0);
      if (this.$rootScope.questionnaireId !== '' && this.$rootScope.questionIndex > 0) {
        return this.$rootScope.pageTemplate = '/templates/question.html';
      } else if (this.$rootScope.questionnaireId !== '') {
        return this.$rootScope.pageTemplate = '/templates/questionnaire-detail.html';
      } else {
        return this.$rootScope.pageTemplate = '/templates/questionnaire-list.html';
      }
    };

    ApplicationController.prototype.onQuestionnaireChanged = function() {
      var _this = this;
      if (this.$rootScope.questionnaireId !== '') {
        return this.QuestionnaireService.get(this.$rootScope.questionnaireId).success(function(questionnaire) {
          var now;
          _this.$rootScope.questionnaire = questionnaire;
          now = new Date();
          return _this.$rootScope.response = {
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
        });
      }
    };

    return ApplicationController;

  })();

  this.Questionnaire.QuestionnaireListController = (function() {

    QuestionnaireListController.$inject = ['$scope', 'QuestionnaireService', '$log'];

    function QuestionnaireListController($scope, QuestionnaireService, $log) {
      var _this = this;
      this.$scope = $scope;
      this.QuestionnaireService = QuestionnaireService;
      this.$log = $log;
      this.QuestionnaireService.list().success(function(list) {
        return angular.extend(_this.$scope, list);
      });
    }

    return QuestionnaireListController;

  })();

  this.Questionnaire.QuestionnaireController = (function() {

    QuestionnaireController.$inject = ['$scope', '$location', 'QuestionnaireService', '$log'];

    function QuestionnaireController($scope, $location, QuestionnaireService, $log) {
      this.$scope = $scope;
      this.$location = $location;
      this.QuestionnaireService = QuestionnaireService;
      this.$log = $log;
      this.start = __bind(this.start, this);
      this.home = __bind(this.home, this);
      this.$scope.home = this.home;
      this.$scope.start = this.start;
    }

    QuestionnaireController.prototype.home = function() {
      return this.$location.path('/');
    };

    QuestionnaireController.prototype.start = function() {
      return this.$location.path("/" + this.$scope.questionnaireId + "/1");
    };

    return QuestionnaireController;

  })();

  this.Questionnaire.QuestionController = (function() {

    QuestionController.$inject = ['$scope', 'QuestionnaireService', '$location', '$log'];

    function QuestionController($scope, QuestionnaireService, $location, $log) {
      this.$scope = $scope;
      this.QuestionnaireService = QuestionnaireService;
      this.$location = $location;
      this.$log = $log;
      this.isValid = __bind(this.isValid, this);
      this.onQuestionChanged = __bind(this.onQuestionChanged, this);
      this.$scope.isValid = this.isValid;
      $scope.$watch("questionIndex", this.onQuestionChanged);
    }

    QuestionController.prototype.onQuestionChanged = function() {
      var _this = this;
      return this.QuestionnaireService.get(this.$scope.questionnaireId).success(function(questionnaire) {
        var index, question, questions;
        questions = questionnaire.questions;
        index = _this.$scope.questionIndex - 1;
        question = questions[index];
        _this.$scope.question = question;
        _this.$scope.answer = _this.$scope.response.answers[index];
        _this.$scope.questionTemplate = "/templates/questions/" + question.type + ".html";
        _this.$scope.next = function() {
          if (index < questions.length - 1) {
            return _this.$location.path("/" + _this.$scope.questionnaireId + "/" + (index + 2));
          }
        };
        return _this.$scope.back = function() {
          return _this.$location.path("/" + _this.$scope.questionnaireId + "/" + index);
        };
      });
    };

    QuestionController.prototype.isValid = function() {
      var _ref;
      return (_ref = this.$scope.answer) != null ? _ref.isValid : void 0;
    };

    return QuestionController;

  })();

  this.Questionnaire.QuestionChoiceController = (function() {

    QuestionChoiceController.$inject = ['$scope'];

    function QuestionChoiceController($scope) {
      this.$scope = $scope;
      this.selectChoice = __bind(this.selectChoice, this);
      this.choiceCSSClass = __bind(this.choiceCSSClass, this);
      this.$scope.choiceCSSClass = this.choiceCSSClass;
      this.$scope.selectChoice = this.selectChoice;
    }

    QuestionChoiceController.prototype.choiceCSSClass = function(choice) {
      var _ref;
      if (((_ref = this.$scope.answer) != null ? _ref.choice : void 0) === choice) {
        return 'blue';
      } else {
        return 'white';
      }
    };

    QuestionChoiceController.prototype.selectChoice = function(choice) {
      this.$scope.answer.choice = choice;
      return this.$scope.answer.isValid = choice != null;
    };

    return QuestionChoiceController;

  })();

}).call(this);

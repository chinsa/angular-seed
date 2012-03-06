(function() {
  'use strict';
  var QuestionnaireService, ResponseManager, RouteHandler, Services,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Services = angular.module('Services', []);

  QuestionnaireService = (function() {

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

    return QuestionnaireService;

  })();

  Services.factory("QuestionnaireService", [
    '$http', '$log', function($http, $log) {
      return new QuestionnaireService($http, $log);
    }
  ]);

  RouteHandler = (function() {

    function RouteHandler($routeProvider, $rootScope, $log) {
      var _this = this;
      this.$routeProvider = $routeProvider;
      this.$rootScope = $rootScope;
      this.$log = $log;
      this.redirectTo = __bind(this.redirectTo, this);
      this.handle = __bind(this.handle, this);
      this.$log.log("RouteHandler: Initializing");
      this.$rootScope.$on('$afterRouteChange', function(current, previous) {
        if ((current != null ? current.template : void 0) != null) {
          _this.$log.log("RouteHandler: updating page template for route: " + current.name + " to " + current.template);
          _this.$rootScope.pageTemplate = current.template;
        }
        if ((current != null ? current.handler : void 0) != null) {
          _this.$log.log("RouteHandler: running handler for route: " + current.name);
          current.handler(current, previous);
        }
        if (!(((current != null ? current.template : void 0) != null) || ((current != null ? current.handler : void 0) != null))) {
          return _this.$log.log("RouteHandler: unhandled route: " + (current != null ? current.name : void 0));
        }
      });
    }

    RouteHandler.prototype.handle = function(path, options) {
      if (options == null) options = {};
      this.$log.log("RouteHandler: Create handler: " + path);
      return this.$routeProvider.when(path, options);
    };

    RouteHandler.prototype.redirectTo = function(path) {
      return this.$location.path("" + path);
    };

    return RouteHandler;

  })();

  Services.factory("RouteHandler", [
    '$routeProvider', '$rootScope', '$log', function($routeProvider, $rootScope, $log) {
      return new RouteHandler($routeProvider, $rootScope, $log);
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

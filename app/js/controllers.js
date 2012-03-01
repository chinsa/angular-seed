(function() {
  'use strict';
  var Controller,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  namespace('Questionnaire');

  Controller = (function() {

    function Controller($scope) {
      this.$scope = $scope;
    }

    Controller.prototype.addHelper = function(name) {
      return this.$scope[name] = this[name];
    };

    return Controller;

  })();

  this.Questionnaire.PageController = (function(_super) {

    __extends(PageController, _super);

    PageController.$inject = ['$scope', 'PageManager'];

    function PageController($scope, PageManager) {
      this.PageManager = PageManager;
      this.pageCSSClass = __bind(this.pageCSSClass, this);
      this.isCurrent = __bind(this.isCurrent, this);
      PageController.__super__.constructor.call(this, $scope);
      this.addHelper('isCurrent');
      this.addHelper('pageCSSClass');
    }

    PageController.prototype.isCurrent = function() {
      return this.$scope.page.name === this.$scope.currentPageName;
    };

    PageController.prototype.pageCSSClass = function() {
      if (this.isCurrent()) return 'current';
    };

    return PageController;

  })(Controller);

  this.Questionnaire.QuestionnaireListController = (function(_super) {

    __extends(QuestionnaireListController, _super);

    QuestionnaireListController.$inject = ['$scope', 'PageManager', 'QuestionnaireService'];

    function QuestionnaireListController($scope, PageManager, QuestionnaireService) {
      var _this = this;
      QuestionnaireListController.__super__.constructor.call(this, $scope, PageManager);
      QuestionnaireService.list().success(function(response) {
        return angular.extend($scope, response);
      });
    }

    return QuestionnaireListController;

  })(this.Questionnaire.PageController);

  this.Questionnaire.QuestionController = (function(_super) {

    __extends(QuestionController, _super);

    QuestionController.$inject = ['$scope', 'PageManager'];

    function QuestionController($scope, PageManager) {
      this.choiceCSSClass = __bind(this.choiceCSSClass, this);      QuestionController.__super__.constructor.call(this, $scope, PageManager);
      this.addHelper('choiceCSSClass');
    }

    QuestionController.prototype.choiceCSSClass = function(page, choice) {
      if (page.response === choice) {
        return 'blue';
      } else {
        return 'white';
      }
    };

    return QuestionController;

  })(this.Questionnaire.PageController);

}).call(this);

(function() {
  "use strict";
  head.js({
    jquery: "/lib/jquery.min.js"
  }, {
    maskedinput: "/lib/jquery.maskedinput-1.3.js"
  }, {
    jqueryUI: "/lib/jquery.ui/jquery-ui-1.8.18.min.js"
  }, {
    namespace: "/lib/namespace.min.js"
  }, {
    angular: "/lib/angular/angular.js"
  }, {
    controllers: "/js/controllers.js"
  }, {
    pagerouter: "/js/page-router.js"
  }, {
    questionnaires: "/js/questionnaires.js"
  }, {
    widgets: "/js/widgets.js"
  }, {
    application: "/js/app.js"
  });

  head.ready("application", function() {
    var module;
    return module = angular.module('QuestionnaireApp', ['AppConfig', 'QuestionnaireModule', 'PageRouterModule', 'WidgetModule']);
  });

}).call(this);

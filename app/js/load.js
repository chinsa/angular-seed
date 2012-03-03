(function() {
  "use strict";
  head.js({
    jquery: "/lib/jquery.min.js"
  }, {
    namespace: "/lib/namespace.min.js"
  }, {
    angular: "/lib/angular/angular.js"
  }, {
    controllers: "/js/controllers.js"
  }, {
    services: "/js/services.js"
  }, {
    services: "/js/filters.js"
  }, {
    application: "/js/app.js"
  });

  head.ready("application", function() {
    var module;
    module = angular.module('QuestionnaireApp', ['Services', 'Filters']);
    return module.run(Questionnaire.QuestionnaireApplication);
  });

}).call(this);

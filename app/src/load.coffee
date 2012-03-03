"use strict";

head.js(
  # load files in parallel but execute them in sequence
  { jquery     : "/lib/jquery.min.js"          }
  { namespace  : "/lib/namespace.min.js"       }
  { angular    : "/lib/angular/angular.js"     }
  { controllers: "/js/controllers.js"   }
  { services   : "/js/services.js"      }
  { services   : "/js/filters.js"      }
  { application: "/js/app.js"           }
)

head.ready( "application", ->
  # Declare app-level module which depends on filters, and services
  module = angular.module( 'QuestionnaireApp', ['Services', 'Filters'] )
  module.run( Questionnaire.QuestionnaireApplication )
)

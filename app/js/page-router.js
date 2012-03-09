(function() {
  var PageRouter, createFactory,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  PageRouter = (function() {

    PageRouter.$inject = ['$route', '$rootScope', '$log'];

    function PageRouter($route, $rootScope, $log) {
      this.$route = $route;
      this.$rootScope = $rootScope;
      this.$log = $log;
      this.redirectTo = __bind(this.redirectTo, this);
      this.watch = __bind(this.watch, this);
      this.$log.log("RouteHandler: Initializing");
    }

    PageRouter.prototype.watch = function() {
      var _this = this;
      return this.$rootScope.$on('$beforeRouteChange', function(event, next, current) {
        var handler, route, scope, template;
        route = next != null ? next.$route : void 0;
        scope = event.targetScope;
        template = route != null ? route.template : void 0;
        handler = route != null ? route.handler : void 0;
        if (template != null) {
          _this.$log.log("RouteHandler: updating page template to " + next.template);
          _this.$rootScope.pageTemplate = template;
        }
        if (handler != null) {
          _this.$log.log("RouteHandler: running handler for route");
          handler(scope, next, current);
        }
        if (!((template != null) || (handler != null))) {
          return _this.$log.log("RouteHandler: unhandled route");
        }
      });
    };

    PageRouter.prototype.redirectTo = function(path) {
      return this.$location.path("" + path).replace();
    };

    return PageRouter;

  })();

  createFactory = function(Cls) {
    return [
      '$injector', function($injector) {
        return $injector.instantiate(Cls);
      }
    ];
  };

  angular.module('PageRouterModule', []).factory("PageRouter", createFactory(PageRouter)).run([
    'PageRouter', function(PageRouter) {
      return PageRouter.watch();
    }
  ]);

}).call(this);

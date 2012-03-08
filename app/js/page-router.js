(function() {
  var PageRouter, createFactory,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  PageRouter = (function() {

    PageRouter.$inject = ['$rootScope', '$log'];

    function PageRouter($rootScope, $log) {
      this.$rootScope = $rootScope;
      this.$log = $log;
      this.redirectTo = __bind(this.redirectTo, this);
      this.run = __bind(this.run, this);
      this.$log.log("RouteHandler: Initializing");
    }

    PageRouter.prototype.run = function() {
      var _this = this;
      return this.$rootScope.$on('$afterRouteChange', function(current, previous) {
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
    };

    PageRouter.prototype.redirectTo = function(path) {
      return this.$location.path("" + path);
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

  angular.module('PageRouterModule', []).factory("PageRouter", createFactory(PageRouter));

}).call(this);

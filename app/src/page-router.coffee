class PageRouter
  @$inject: ['$rootScope', '$log']
  constructor: (@$rootScope, @$log)->
    @$log.log "RouteHandler: Initializing"

  run: ()=>
    @$rootScope.$on('$afterRouteChange', (current, previous)=>

      if current?.template?
        # If there is a template associated with the route then update the $rootScope
        @$log.log "RouteHandler: updating page template for route: #{current.name} to #{current.template}"
        @$rootScope.pageTemplate = current.template

      if current?.handler?
        # If there is a handler on the route then run it
        @$log.log "RouteHandler: running handler for route: #{current.name}"
        current.handler(current, previous)

      unless current?.template? or current?.handler?
        @$log.log "RouteHandler: unhandled route: #{current?.name}"
    )

  redirectTo: (path)=>
    @$location.path("#{path}")

createFactory = (Cls) ->
  ['$injector', ($injector) -> $injector.instantiate(Cls)]

angular.module('PageRouterModule', [])
  .factory("PageRouter", createFactory(PageRouter))

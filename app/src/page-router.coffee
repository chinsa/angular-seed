class PageRouter
  @$inject: ['$route', '$rootScope', '$log']
  constructor: (@$route, @$rootScope, @$log)->
    @$log.log "RouteHandler: Initializing"

  # Watch for changes to the route and update the page template and run handler
  watch: ()=>
    @$rootScope.$on('$beforeRouteChange', (event, next, current)=>
      route = next?.$route
      scope = event.targetScope
      template = route?.template
      handler = route?.handler

      if template?
        # If there is a template associated with the route then update the $rootScope
        @$log.log "RouteHandler: updating page template to #{next.template}"
        @$rootScope.pageTemplate = template

      if handler?
        # If there is a handler on the route then run it
        @$log.log "RouteHandler: running handler for route"
        handler(scope, next, current)
        # By the way, the handler can modify the next route. For instance, it could set a redirect 

      unless template? or handler?
        @$log.log "RouteHandler: unhandled route"
    )

  redirectTo: (path)=>
    @$location.path("#{path}").replace()

createFactory = (Cls) ->
  ['$injector', ($injector) -> $injector.instantiate(Cls)]

angular.module('PageRouterModule', [])
  .factory("PageRouter", createFactory(PageRouter))
  .run(['PageRouter', (PageRouter)->
    PageRouter.watch()
  ])
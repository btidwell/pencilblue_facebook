module.exports = function FeedControllerModule(pb){
  var util = pb.util;

  
  function FeedController(){}
  
  util.inherits(FeedController, pb.BaseController);
  
  FeedController.prototype.getPagePosts = function(cb){
    var pluginService = new pb.PluginService(this.site);
    var OauthService = pluginService.getService("oauthService", "pencilblue_facebook", this.site);
    var PostsService = pluginService.getService("postsService", "pencilblue_facebook", this.site);
    var oauthService = new OauthService({"site":this.site});
    var postsService = new PostsService({"site":this.site});
    oauthService.getAccessToken(function(accessToken){
      postsService.getPagePosts(accessToken, cb);
    });
  };
  
  FeedController.getRoutes = function(cb){
    var routes = [
      {
        method: 'get',
        path: '/action/facebook/posts',
        auth_required: false,
        content_type: 'application/json',
        handler: 'getPagePosts' 
      }
    ];
    cb(null, routes);
  };
  
  return FeedController;
};
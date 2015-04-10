module.exports = function FeedControllerModule(pb){
  var util = pb.util;
  var OauthService = pb.PluginService.getService("oauthService", "pencilblue_facebook");
  var PostsService = pb.PluginService.getService("postsService", "pencilblue_facebook");
  
  function FeedController(){}
  
  util.inherits(FeedController, pb.BaseController);
  
  FeedController.prototype.getPagePosts = function(cb){
    OauthService.getAccessToken(function(accessToken){
      PostsService.getPagePosts(accessToken, cb);
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
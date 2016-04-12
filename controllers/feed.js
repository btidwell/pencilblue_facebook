/*
 Copyright (C) 2015  Careerbuilder, LLC

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

module.exports = function FeedControllerModule(pb){
  var util = pb.util;


  function FeedController(){}

  util.inherits(FeedController, pb.BaseController);

  FeedController.prototype.getPagePosts = function(cb){
    var OauthService = pb.PluginService.getService("oauthService", "pencilblue_facebook", this.site);
    var PostsService = pb.PluginService.getService("postsService", "pencilblue_facebook", this.site);
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
        handler: 'getPagePosts',
        localization: true
      }
    ];
    cb(null, routes);
  };

  return FeedController;
};

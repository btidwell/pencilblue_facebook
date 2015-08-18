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

module.exports = function PostsServiceModule(pb){
  var PluginService = pb.PluginService;
  var FB = require('fb');
  
  function PostsService(){}
  
  PostsService.init = function(cb){
    pb.log.debug("PostsService: Initialized");
    cb(null, true);
  };
  
  PostsService.getName = function(){
    return "postsService";
  };
  
  PostsService.prototype.getPagePosts = function(accessToken, cb){
    var self = this;
    var pluginService = new PluginService();
    pluginService.getSettingsKV('pencilblue_facebook', function(err, settings){
      self.callApi(accessToken, '/v2.3/' + settings.facebook_page_id + '/posts', cb);
    });
  };
  
  PostsService.prototype.callApi = function(accessToken, route, cb){
    FB.api(route, {"access_token":accessToken},function(response){
      cb({
        status:200,
        content:JSON.stringify(response)
      });
    });
  };
  
  return PostsService;
};
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

var OauthService = require('./oauth_service_mock');
var PostsService = require('./posts_service_mock');
function PluginService() {}

PluginService.prototype.getSettingsKV = function(pluginName, cb){
  cb(null, {
    app_id: 'mockappid',
    app_secret: 'mockappsecret',
    facebook_page_id: 'mockpageid'
  });
};

PluginService.getService = function(serviceName, pluginName){
  if(serviceName === OauthService.getName()){
    return OauthService;
  }
  else if(serviceName === PostsService.getName()){
    return PostsService;
  }
};

module.exports = PluginService;
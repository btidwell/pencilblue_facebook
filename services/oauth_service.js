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

module.exports = function OauthServiceModule(pb) {
  var FB = require('fb');
  
  function OauthService(){}
  
  OauthService.init = function(cb){
    pb.log.debug("OauthService: Initialized");
    cb(null, true);
  };
  
  OauthService.getName = function(){
    return "oauthService";
  };
  
  OauthService.prototype.getAccessToken = function(cb){
    var self = this;
    var pluginService = new PluginService();
    pluginService.getSettingsKV('pencilblue_facebook', function(err, settings){
      self.callApi('oauth/access_token', {
        client_id: settings.app_id,
        client_secret: settings.app_secret,
        grant_type: 'client_credentials'
      }, cb);
    }); 
  };
  
  OauthService.prototype.callApi = function(route, params, cb){
    FB.api(route, params, function (res) {
      var accessToken = '';
      if(!res || res.error) {
        pb.log.error(!res ? 'error occurred' : res.error);
      }
      else{
        accessToken = res.access_token;
      }
      FB.setAccessToken(accessToken);
      if(cb){
        cb(accessToken);
      }
    });
  };
  
  return OauthService;
};
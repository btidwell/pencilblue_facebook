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

module.exports = function OauthServiceModule(pb) {
  var FB = require('fb');

  function OauthService(options) {
    if (options){
      this.site = options.site ? options.site : '';
    }else {
      this.site = '';
    }
  }
  
  OauthService.init = function(cb){
    pb.log.debug("OauthService: Initialized");
    cb(null, true);
  };
  
  OauthService.getName = function(){
    return "oauthService";
  };
  
  OauthService.prototype.getAccessToken = function(cb){
    var self = this;
    var pluginService = new pb.PluginService(self.site);
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
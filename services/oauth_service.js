module.exports = function OauthServiceModule(pb){
  var PluginService = pb.PluginService;
  var FB = require('fb');
  
  function OauthService(){}
  
  OauthService.init = function(cb){
    pb.log.debug("OauthService: Initialized");
    cb(null, true);
  };
  
  OauthService.getName = function(){
    return "oauthService";
  };
  
  OauthService.getAccessToken = function(cb){
    var pluginService = new PluginService();
    pluginService.getSettingsKV('pencilblue_facebook', function(err, settings){
      FB.api('oauth/access_token', {
        client_id: settings.app_id,
        client_secret: settings.app_secret,
        grant_type: 'client_credentials'
      }, function (res) {
          if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            throw res.error;
          }
          var accessToken = res.access_token;
          FB.setAccessToken(accessToken);
          if(cb){
            cb(accessToken);
          }
      });
    }); 
  };
  
  return OauthService;
};
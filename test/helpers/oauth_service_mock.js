function OauthService(){}

OauthService.getName = function(){
    return "oauthService";
};

OauthService.getAccessToken = function(cb){
  cb('mockaccesstoken');
};

module.exports = OauthService;
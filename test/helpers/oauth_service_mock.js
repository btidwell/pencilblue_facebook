function OauthService(){}

OauthService.getName = function(){
    return "oauthService";
};

OauthService.prototype.getAccessToken = function(cb){
  cb('mockaccesstoken');
};

module.exports = OauthService;
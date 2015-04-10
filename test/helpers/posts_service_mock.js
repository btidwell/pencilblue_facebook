function PostsService(){}

PostsService.getName = function(){
  return "postsService";
};

PostsService.prototype.getPagePosts = function(accessToken, cb){
  cb(null, '{data:[{id:"mockid",message:"Mock Message", created_time:"2015-04-09T16:00:04+0000"}]}');
};

module.exports = PostsService;
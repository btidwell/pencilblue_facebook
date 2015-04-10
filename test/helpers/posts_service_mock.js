function PostsService(){}

PostsService.getName = function(){
  return "postsService";
};

PostsService.getPagePosts = function(cb){
  cb('{}');
};

module.exports = PostsService;
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var mockService = require('../test/helpers/pb_mock_service');
var FeedControllerModule = require('../controllers/feed');
var OauthService = require('../test/helpers/oauth_service_mock');
var PostsService = require('../test/helpers/posts_service_mock');

describe('When using the Feed Controller', function(){
  var pb;
  var FeedController;
  var expectedJSON;
  var oauthService = new OauthService();
  var postsService = new PostsService();
  before(function(){
    pb = mockService.getMockPB();
    FeedController = FeedControllerModule(pb);
    expectedJSON = '{data:[{id:"mockid",message:"Mock Message", created_time:"2015-04-09T16:00:04+0000"}]}';
    var oauthStub = sinon.stub(oauthService, 'getAccessToken');
    var postsStub = sinon.stub(postsService, 'getPagePosts');
    oauthStub.onCall(0).yields('mockaccesstoken');
    postsStub.onCall(0).yields(null, expectedJSON);
  });
  
  it('We should expect a JSON response from the request handler getPosts', function(done){
    var feedController = new FeedController();
    feedController.getPagePosts(function(err, result){
      expect(result).to.equal(expectedJSON);
      done();
    });
  });
  
  it('We should expect a public GET route for getPosts handler with a content_type of application/json', function(done){
    FeedController.getRoutes(function(err, routes){
      expect(routes.length).to.equal(1);
      var route = routes[0];
      expect(route.method).to.equal('get');
      expect(route.path).to.equal('/action/facebook/posts');
      expect(route.auth_required).to.equal(false);
      expect(route.content_type).to.equal('application/json');
      expect(route.handler).to.equal('getPagePosts');
      done();
    });
  });
});
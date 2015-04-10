var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var mockService = require('../test/helpers/pb_mock_service');
var pb = mockService.getMockPB();
var PostsServiceModule = require('../services/posts_service');
var FB = require('fb');

describe('When using the PostsService', function(){
  var PostsService;
  var postsService;
  var apiSpy;
  var apiStub;
  var apiCredentials;
  var pluginService;
  var expectedJSON;
  before(function(){
    expectedJSON = {data:[{id:"mockid",message:"Mock Message", created_time:"2015-04-09T16:00:04+0000"}]};
    pluginService = new pb.PluginService();
    pluginService.getSettingsKV('pencilblue_facebook', function(err, settings){
      apiCredentials = {
        client_id: settings.app_id,
        client_secret: settings.app_secret,
        grant_type: 'client_credentials'
      }
      PostsService = PostsServiceModule(pb);
      postsService = new PostsService();
      apiStub = sinon.stub(FB, 'api');
      apiStub.onCall(0).yields(expectedJSON);
      apiSpy = sinon.spy(postsService, 'callApi');
    });
  });
  
  after(function(){
    FB.api.restore();
  });
  
  it('getName should return "postsService"', function(end){
    expect(PostsService.getName()).to.equal('postsService');
    end();
  });
  
  it('service should contain an init function that yields a null err and a result of true', function(end){
    PostsService.init(function(err, result){
      expect(err).to.equal(null);
      expect(result).to.equal(true);
      end();
    });
  });
  
  it('the service should return an access token from the facebook api module', function(end){
    var accessToken = 'mockaccesstoken';
    postsService.getPagePosts(accessToken, function(content){
      expect(content.status).to.equal(200);
      expect(content.content).to.equal(JSON.stringify(expectedJSON));
      var args = apiSpy.getCall(0).args;
      expect(args[0]).to.equal(accessToken);
      expect(args[1]).to.equal('/v2.3/mockpageid/posts');
      expect(typeof args[2]).to.equal('function');
      end();
    });
  });
  
});

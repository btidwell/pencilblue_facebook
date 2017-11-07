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
      apiSpy = sinon.spy(postsService, 'getPagePosts');
    });
  });

  after(function(){
    FB.api.restore();
  });

  it('getName should return "postsService"', function(end){
    expect(PostsService.getName()).to.equal('postsService');
    end();
  });

  it('instantiation should take in an options object', function(end){
    var tmpPostsService = new PostsService({'site':'8675309'});
    expect(tmpPostsService.site).to.equal('8675309');
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
    postsService.getPagePosts(accessToken, {'facebook_page_id': 'mockpageid'}, function(content){
      expect(content.content).to.equal(JSON.stringify(expectedJSON));
      var args = apiStub.getCall(0).args;
      expect(args[0]).to.equal('/v2.10/mockpageid/posts');
      expect(args[1]).to.deep.equal({access_token: accessToken});
      expect(typeof args[2]).to.equal('function');
      end();
    });
  });

});

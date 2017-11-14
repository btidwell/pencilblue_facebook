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
var OauthServiceModule = require('../services/oauth_service');
var FB = require('fb');

describe('When using the OauthService', function(){
  var OauthService;
  var oauthService;
  var apiSpy;
  var apiStub;
  var apiCredentials;
  var pluginService
  before(function(){
    pluginService = new pb.PluginService();
    pluginService.getSettingsKV('pencilblue_facebook', function(err, settings){
      apiCredentials = {
        client_id: settings.app_id,
        client_secret: settings.app_secret,
        grant_type: 'client_credentials'
      }
      OauthService = OauthServiceModule(pb);
      oauthService = new OauthService();
      apiStub = sinon.stub(FB, 'api');
      apiStub.onCall(0).yields({access_token: 'mockaccesstoken'});
      apiStub.onCall(1).yields({access_token: '', error: 'mockError'});
      apiSpy = sinon.spy(oauthService, 'getAccessToken');
    });

  });

  after(function(){
    FB.api.restore();
  });

  it('getName should return "oauthService"', function(end){
    expect(OauthService.getName()).to.equal('oauthService');
    end();
  });

  it('instantiation should take in an options object', function(end){
    var tmpOauthService = new OauthService({'site':'8675309'});
    expect(tmpOauthService.site).to.equal('8675309');
    end();
  });

  it('service should contain an init function that yields a null err and a result of true', function(end){
    OauthService.init(function(err, result){
      expect(err).to.equal(null);
      expect(result).to.equal(true);
      end();
    });
  });

  it('the service should return an access token from the facebook api module', function(end){
      let settings = {
          app_id: 'mockappid',
          app_secret: 'mockappsecret'
      };
      oauthService.getAccessToken(settings, function(accessToken){
      expect(accessToken).to.equal('mockaccesstoken');
      var args = apiStub.getCall(0).args;
      expect(args[0]).to.equal('oauth/access_token');
      expect(args[1].client_id).to.equal(apiCredentials.client_id);
      expect(args[1].client_secret).to.equal(apiCredentials.client_secret);
      expect(args[1].grant_type).to.equal(apiCredentials.grant_type);
      expect(typeof args[2]).to.equal('function');
      end();
    });
  });

  it('should log an errorbut return empty token when api bombs', function(end){
    oauthService.getAccessToken({}, function(accessToken){
      expect(accessToken).to.equal('');
      end();
    });
  });

});

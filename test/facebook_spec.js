var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var mockService = require('../test/helpers/pb_mock_service');
var pb = mockService.getMockPB();
var FacebookPluginModule = require('../facebook');

describe('When using the facebook main module', function(){
  var Facebook;
  before(function(){
    Facebook = FacebookPluginModule(pb);
  });
  
  it('Should contain a constructor Function', function(){
    var facebook = new Facebook();
    expect(typeof facebook).to.equal('object');
  });
  
  it('Should contain an onInstall function', function(end){
    Facebook.onInstall(function(err, result){
      expect(err).to.equal(null);
      expect(result).to.equal(true);
      end();
    });
  });
  
  it('Should contain an onUninstall function', function(end){
    Facebook.onUninstall(function(err, result){
      expect(err).to.equal(null);
      expect(result).to.equal(true);
      end();
    });
  });
  
  it('Should contain an onStartup function', function(end){
    Facebook.onStartup(function(err, result){
      expect(err).to.equal(null);
      expect(result).to.equal(true);
      end();
    });
  });
  
  it('Should contain an onShutdown function', function(end){
    Facebook.onShutdown(function(err, result){
      expect(err).to.equal(null);
      expect(result).to.equal(true);
      end();
    });
  });
});
var PluginService = require("./plugin_service_mock");
var BaseController = require('./mock_base_controller');
var util = require("util");
module.exports.getMockPB = function(){
    return {
        config: {
            sitePort:'8080',
            siteRoot:'http://dev.careerbuildercareers.com:8080',
            crawler:{
                maxConcurrency: 10
            }
        },
        log:{
            silly:function(message){log(message);},
            info:function(message){log(message);},
            error:function(message){log(message);},
            debug:function(message){log(message);}
        },
        PluginService: PluginService,
        BaseController: BaseController.BaseController,
        util : util
    };
};
function log(message){
    //console.log is commented out unless a debug of pb.log messages is needed.  
    //console.log(message);
}
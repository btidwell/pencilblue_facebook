function BaseController(){};

BaseController.prototype.init = function(props, cb) {
	var self = this;
	cb();
};

BaseController.prototype.getPostParams = function(cb) {
	cb(null, null);
};

/**
 * Parses the incoming payload of a request as JSON formatted data.
 * @method getJSONPostParams
 * @param {Function} cb
 */
BaseController.prototype.getJSONPostParams = function(cb) {
    cb(null, null);
};

BaseController.prototype.redirect = function(url, cb) {
    cb(url);
};

BaseController.apiResponse = function(cd, msg, dta) {

    return JSON.stringify("nothing");
};

//exports
module.exports.BaseController = BaseController;

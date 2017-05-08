
var _ = require('underscore'),
    util = require('util'),
    utils = require('yourttoo.common').utils,
    super_ = require('../field');
    
/**
    * ArrayString FieldType Constructor
    * @extends Field
    * @api public
    */

function arraystring(list, path, options) {
        this._nativeType = [String];
        //options.nofilter = true;
        arraystring.super_.call(this, list, path, options);
}    
    

util.inherits(arraystring, super_);


exports = module.exports = arraystring;
﻿var _ = require('underscore'),
	util = require('util'),
	bcrypt = require('bcrypt-nodejs'),
	utils = require('yourttoo.common').utils,
	super_ = require('../field');



function password(list, path, options) {
    this.workFactor = options.workFactor || 10;
    this._nativeType = String;
    options.nosort = true; // You can't sort on password fields
    // TODO: implement filtering, hard-coded as disabled for now
    options.nofilter = true;
    password.super_.call(this, list, path, options);
};


util.inherits(password, super_);

password.prototype.addToSchema = function () {

    var field = this,
		schema = this.list.schema;

    this.paths = {
        confirm: this.options.confirmPath || this._path.append('_confirm')
    };

    schema.path(this.path, _.defaults({ type: String }, this.options));

    schema.pre('save', function (next) {

        if (!this.isModified(field.path))
            return next();

        var item = this;

        bcrypt.genSalt(field.workFactor, function (err, salt) {
            if (err)
                return next(err);

            bcrypt.hash(item.get(field.path), salt, function () { }, function (err, hash) {
                if (err)
                    return next(err);

                // override the cleartext password with the hashed one
                item.set(field.path, hash);
                next();
            });
        });

    });

    this.underscoreMethod('compare', function (candidate, callback) {
        bcrypt.compare(candidate, this.get(field.path), callback);
    });

    this.bindUnderscoreMethods();

}



password.prototype.validateInput = function (data, required, item) {

    if (!this.required) {
        return true;
    }

    if (item) {
        return (data[this.path] || item.get(this.path)) ? true : false;
    } else {
        return data[this.path] ? true : false;
    }

}


    /*!
     * Export class
     */

exports = module.exports = password;

module.exports = function(options){
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var filter_auth = common.schemadefinitions;
    var behaviour = null;
    //check collectionname
    var collection = options.collectionname;
    //check environment
    var environment = options.environment;
    behaviour = filter_auth.schemadefaultbehaviour[collection];

    if (behaviour != null ) {
        options.fields = (options.fields == null || options.fields == '' || options.fields == '*') ?
            behaviour.fields.default : options.fields;
        options.populate = (options.populate == null || options.populate.length == 0) ? 
            behaviour.populate : options.populate;
    }

    return options;
}
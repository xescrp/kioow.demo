
var collectionStoreName = 'Mementos';

var recoverstorageitem = module.exports.recoverstorageitem = function (key, mongo, callback) {
    var filter = {
        query: {  key: key },
        sortcondition: null,
        collectionname: collectionStoreName
    };
    
    mongo.find(filter, function (results) {
        if (results.ResultOK == true && results.Data != null && results.Data.length > 0) {
            callback(results.Data[0]);
        } else {
            callback(null);
        }
    });
}

var savestorageitem = module.exports.savestorageitem = function (request, mongo, callback) {
    recoverstorageitem(request.key, mongo, function (item) {
        console.log(item);
        if (item != null) {
            //update item...
            item.key = request.key;
            item.date = new Date();
            item.item = request.item;
        } else {
            item = mongo.getmodel({
                collectionname: collectionStoreName, modelobject: {
                    key: request.key,
                    date: new Date(),
                    item: request.item
                }
            });
        }
        if (item.key == null) { 
            item.key = request.key;
            item.date = new Date();
            item.item = request.item;
        }
        console.log('before save...');
        console.log(item);
        item.save(function (err, doc) {
            if (err) { 
                console.log(err);
            }
            callback(doc);
        });
    });
}

var compress = module.exports.compress = function (item, callback) {
    require('../../interface/zipcompressor')('deflate', item, function (ziped) { 
        callback(ziped);
    });
}

var uncompress = module.exports.uncompress = function (item, callback) {
    require('../../interface/zipcompressor')('unzip', item, function (dziped) { 
        callback(dziped);
    });
}
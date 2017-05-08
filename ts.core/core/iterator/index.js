//Example hashkey: 
//  - Iterator for search: 'single#search',
//  - Iterator for yto search: 'single#product.search'

function getiterator(hashkey) {
    var splitedkeys = hashkey.split('#');
    var mode = splitedkeys[0];
    var itkey = splitedkeys[1];
    var subkey = iterators[mode];

    var iterator = null;

    if (itkey.indexOf('.') >= 0) {
        //has a subiterator..
        var subs = itkey.split('.');
        var itclass = subs[0];
        var itsubclass = subs[1];
        
        iterator = subkey[itclass][itsubclass];
    } else { 
        //simple iterator
        iterator = subkey[itclass];
    }
    return iterator;
}

var iterators = {
    single: {
        product: {
            ytoprice: require('./single/product.ytoprice')
        }, 
        search: require('./single/search')
    }, 
    many: {
        ytosearch: require('./many/ytosearch')
    }
}

module.exports = function (hashkey) { 
    return getiterator(hashkey);
}

module.exports.single = iterators.single;

module.exports.many = iterators.many;
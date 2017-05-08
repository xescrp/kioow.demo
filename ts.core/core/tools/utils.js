
var _ = require('underscore'),
	inflect = require('i')();

    // HTML Entities for Text <> HTML conversion
var htmlEntities = require('./htmlEntities'),
	htmlEntitiesMap = {},
	htmlEntitiesRegExp = '';

(function () {
    for (var i in htmlEntities) {
        var ent = String.fromCharCode(htmlEntities[i]);
        htmlEntitiesMap[ent] = i;
        htmlEntitiesRegExp += '|' + ent;
    }
    htmlEntitiesRegExp = new RegExp(htmlEntitiesRegExp.substr(1), 'g');
})();

    // Diacritics support
var diacritics = require('./diacritics');
    // Cyrillic transliteration
var transliteration = require('./transliteration.cyr');

    // Constants for distance calculation
var RADIUS_KM = 6371,
	RADIUS_MILES = 3959;

    /**
     * Determines if `arg` is a function.
     *
     * @param {Object|Array|String|Function|RegExp|any} arg
     * @return {Boolean}
     * @api public
     */
var hasProperty = exports.hasProperty = function (object, key) {
    return _.has(object, key);
}


var isFunction = exports.isFunction = function (arg) {
    return ('function' == typeof arg);
}


    /**
     * Determines if `arg` is an object.
     *
     * @param {Object|Array|String|Function|RegExp|any} arg
     * @return {Boolean}
     * @api public
     */

var isObject = exports.isObject = function (arg) {
    return '[object Object]' == Object.prototype.toString.call(arg);
}


    /**
     * Determines if `arg` looks like a valid mongo ObjectId
     *
     * @param {Object|Array|String|Function|RegExp|any} arg
     * @return {Boolean}
     * @api public
     */

var isValidObjectId = exports.isValidObjectId = function (arg) {
    var len = arg.length;
    if (len == 12 || len == 24) {
        return /^[0-9a-fA-F]+$/.test(arg);
    } else {
        return false;
    }
}


    /**
     * Determines if `arg` is an array.
     *
     * @param {Object|Array|String|Function|RegExp|any} arg
     * @return {Boolean}
     * @api public
     */

var isArray = exports.isArray = function (arg) {
    return Array.isArray(arg);
}


    /**
     * Determines if `arg` is a date.
     *
     * @param {Object|Array|String|Function|RegExp|any} arg
     * @return {Boolean}
     * @api public
     */

var isDate = exports.isDate = function (arg) {
    return '[object Date]' == Object.prototype.toString.call(arg);
}


    /**
     * Determines if `arg` is a string.
     *
     * @param {Object|Array|String|Function|RegExp|any} arg
     * @return {Boolean}
     * @api public
     */

var isString = exports.isString = function (arg) {
    return 'string' == typeof arg;
}


    /**
     * Determines if `arg` is a number.
     *
     * @param {Object|Array|String|Function|RegExp|any} arg
     * @return {Boolean}
     * @api public
     */

var isNumber = exports.isNumber = function (arg) {
    return 'number' == typeof arg;
}


    /**
     * Make sure an email address looks valid.
     * May cause false-negatives in extremely rare cases, see
     * http://www.regular-expressions.info/email.html
     *
     * @param {String} str
     * @return {String}
     * @api public
     */

var isEmail = exports.isEmail = function (str) {
    return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.['a-z0-9!#$%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(str);
} // ' // sublime syntax hilighter fix


    /**
     * Copies and merges options with defaults.
     *
     * @param {Object} defaults
     * @param {Object} options
     * @return {Object} the options argument merged with defaults
     * @api public
     */

var options = exports.options = function (defaults, options) {

    options = options || {};

    if (!defaults)
        return options;

    var keys = Object.keys(defaults), i = keys.length, k;

    while (i--) {
        k = keys[i];
        if (!(k in options)) {
            options[k] = defaults[k];
        }
    }

    return options;

}


    /**
     * Creates a map of options
     *
     * @param {Array} options
     * @param {String} property to map
     * @param {Boolean} clone the options?
     * @return {Object} the map object
     * @api public
     */

var optionsMap = exports.optionsMap = function (arr, property, clone) {
    if (arguments.length == 2 && 'boolean' == typeof property) {
        clone = property;
        property = undefined;
    }
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        var prop = (property) ? arr[i][property] : arr[i];
        if (clone) {
            prop = _.clone(prop);
        }
        obj[arr[i].value] = prop;
    }
    return obj;
}


    /**
     * Recursively binds method properties of an object to a scope
     * and returns a new object containing the bound methods
     *
     * @param {Object} object with method properties, can be nested in other objects
     * @param {Object} scope to bind as `this`
     * @return {Object} a new object containing the bound methods
     * @api public
     */

var bindMethods = exports.bindMethods = function (obj, scope) {

    var bound = {};

    for (var prop in obj) {
        if ('function' == typeof obj[prop]) {
            bound[prop] = obj[prop].bind(scope);
        } else if (isObject(obj[prop])) {
            bound[prop] = bindMethods(obj[prop], scope);
        }
    }

    return bound;

}


    /**
     * Generates a 'random' string of characters to the specified length.
     * 
     * @param {Number or Array}   len      the length of string to generate, can be a range (Array), Defaults to 10.
     * @param {String}            chars    characters to include in the string, defaults to `0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz`
     * @return {String}
     * @api public
     */

var randomString = exports.randomString = function (len, chars) {

    var str = '';

    if (!len) {
        len = 10;
    } else if (isArray(len)) {
        var min = number(len[0]);
        var max = number(len[1]);
        len = Math.round(Math.random() * (max - min)) + min;
    } else {
        len = number(len);
    }

    chars = chars || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';

    for (var i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;

}

/**
 * For an rfc4122 version 4 compliant solution, this is one-liner(ish) compact solution:
 */

var guidGenerate = exports.guidGenerate = function ()
{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

    /**
     * Converts a string to a number, accepting human-friendly input, e.g.
     * - 1,432
     * - $1432
     * - 2.5
     *
     * @param {String} input
     * @return {Number} number
     * @api public
     */

var number = exports.number = function (str) {
    return parseFloat(String(str).replace(/[^\-0-9\.]/g, ''));
}


    /**
     * Escapes a string to be safely converted to a regular expression
     *
     * @param {String} string
     * @return {String} escaped string
     * @api public
     */

var escapeRegExp = exports.escapeRegExp = function (str) {
    if (!isString(str) || !str.length) return '';
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}


    /**
     * Escapes a string to be safely used as a literal Javascript string
     *
     * @param {String} string
     * @return {String} escaped string
     * @api public
     */

var escapeString = exports.escapeString = function (str) {
    if (!isString(str) || !str.length) return '';
    return str.replace(/[\\'"]/g, "\\$&");
}


    /**
     * Strips diacritics from a string, replacing them with their simple equivalents
     *
     * @param {String} string
     * @return {String} stripped string
     * @api public
     */

var stripDiacritics = exports.stripDiacritics = function (str) {
    if (!isString(str) || !str.length) return '';
    var rtn = [];
    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        rtn.push(diacritics[c] || c);
    }
    return rtn.join('');
}


    /**
     * Transliterates Russian and Ukrainian words from cyrillic to latin.
     * 
     * @param  {String} word
     * @return {String} transliterated word
     * @api public
     */
var transliterate = exports.transliterate = function (str) {
    if (!isString(str) || !str.length) return '';
    var rtn = [];
    // applying зг-zgh rule
    str = str.replace(transliteration.regexp.Zgh, 'Zgh');
    str = str.replace(transliteration.regexp.zgh, 'zgh');
    // replace characters with equivalent maps
    for (var i = 0; i < str.length; i++) {
        var character = str[i],
			latinCharacter = transliteration.characterMap[character];
        rtn.push((latinCharacter || '' === latinCharacter) ? latinCharacter : character);
    }
    return rtn.join('');
};


    /**
     * Generates a slug from a string. Word breaks are hyphenated.
     * 
     * You can optionally provide a custom separator.
     *
     * @param {String} str
     * @param {String} sep (defaults to '-')
     * @return {String} slug
     * @api public
     */

var slug = exports.slug = function (str, sep) {
    if (!isString(str) || !str.length) return '';
    sep = sep || '-';
    var esc = escapeRegExp(sep);
    str = stripDiacritics(str);
    str = transliterate(str);
    return str.replace(/['"()\.]/g, '').replace(/[^a-z0-9_\-]+/gi, sep).replace(new RegExp(esc + '+', 'g'), sep).replace(new RegExp('^' + esc + '+|' + esc + '+$'), '').toLowerCase();
}


    /**
     * Converts a string to its singular form
     *
     * @param {String} str
     * @return {String} singular form of str
     * @api public
     */

var singular = exports.singular = function (str) {
    return inflect.singularize(str);
}


    /**
     * Displays the singular or plural of a string based on a number
     * or number of items in an array.
     * 
     * If arity is 1, returns the plural form of the word.
     *
     * @param {String} count
     * @param {String} singular string
     * @param {String} plural string
     * @return {String} singular or plural, * is replaced with count
     * @api public
     */

var plural = exports.plural = function (count, sn, pl) {

    if (arguments.length == 1) {
        return inflect.pluralize(count);
    }

    if ('string' != typeof sn) sn = '';

    if (!pl) {
        pl = inflect.pluralize(sn);
    }

    if ('string' == typeof count) {
        count = Number(count);
    } else if ('number' != typeof count) {
        count = _.size(count);
    }

    return (count == 1 ? sn : pl).replace('*', count);

}


    /**
     * Converts the first letter in a string to uppercase
     *
     * @param {String} str
     * @return {String} Str
     * @api public
     */

var upcase = exports.upcase = function (str) {
    if (!isString(str) || !str.length) return '';
    return (str.substr(0, 1).toUpperCase() + str.substr(1));
}


    /**
     * Converts the first letter in a string to lowercase
     *
     * @param {String} Str
     * @return {String} str
     * @api public
     */

var downcase = exports.downcase = function (str) {
    if (!isString(str) || !str.length) return '';
    return (str.substr(0, 1).toLowerCase() + str.substr(1));
}


    /**
     * Converts a string to title case
     *
     * @param {String} str
     * @return {String} Title Case form of str
     * @api public
     */

var titlecase = exports.titlecase = function (str) {
    if (!isString(str) || !str.length) return '';
    str = str.replace(/([a-z])([A-Z])/g, '$1 $2');
    var parts = str.split(/\s|_|\-/);
    for (var i = 0; i < parts.length; i++) {
        if (parts[i] && !/^[A-Z0-9]+$/.test(parts[i])) {
            parts[i] = upcase(parts[i]);
        }
    }
    return _.compact(parts).join(' ');
}


    /**
     * Converts a string to camel case
     *
     * @param {String} str
     * @param {Boolean} lowercaseFirstWord
     * @return {String} camel-case form of str
     * @api public
     */

var camelcase = exports.camelcase = function (str, lc) {
    return inflect.camelize(str, !(lc));
}


    /**
     * Decodes HTML Entities in a string
     *
     * @param {String}
     * @return {String}
     * @api public
     */

var decodeHTMLEntities = exports.decodeHTMLEntities = function (str) {
    if (!isString(str) || !str.length) return '';
    return str.replace(/&[^;]+;/g, function (match, ent) {
        return String.fromCharCode(ent[0] !== '#' ? htmlEntities[ent] : ent[1] === 'x' ? parseInt(ent.substr(2), 16) : parseInt(ent.substr(1), 10));
    });
};


    /**
     * Encodes HTML Entities in a string
     *
     * @param {String}
     * @return {String}
     * @api public
     */

var encodeHTMLEntities = exports.encodeHTMLEntities = function (str) {
    if (!isString(str) || !str.length) return '';
    return str.replace(htmlEntitiesRegExp, function (match) {
        return '&' + htmlEntitiesMap[match] + ';';
    });
};


    /**
     * Converts text to HTML (line breaks to <br>)
     *
     * @param {String} str
     * @return {String}
     * @api public
     */

var textToHTML = exports.textToHTML = function (str) {
    if (!isString(str) || !str.length) return '';
    return encodeHTMLEntities(str).replace(/\n/g, '<br>');
}


    /**
     * Ultra simple converter to turn HTML into text.
     * 
     * Really only useful when you need a lightweight way to remove html from a string
     * before cropping it, so you don't end up with partial tags or an invalid DOM
     * structure.
     * 
     * It will convert `br`, `p`, `div`, `li`, `td`, `th` tags to single line-breaks.
     * All other tags are stripped.
     * 
     * Multiple line breaks are then compressed to a single line break, and leading /
     * trailing white space is stripped.
     * 
     * For a more sophisticated use-case, you should check out the `to-markdown` and
     * `html-to-text` packages on npm.
     *
     * @param {String} str
     * @return {String}
     * @api public
     */

var htmlToText = exports.htmlToText = function (str) {
    if (!isString(str) || !str.length) return '';
    // remove all source-code line-breaks first
    str = str.replace(/\n/g, '');
    // turn non-breaking spaces into normal spaces
    str = str.replace(/&nbsp;/g, ' ');
    // <br> tags become single line-breaks
    str = str.replace(/<br>/gi, '\n');
    // <p>, <li>, <td> and <th> tags become double line-breaks
    str = str.replace(/<(?:p|li|td|th)[^>]*>/gi, '\n');
    // strip all other tags (including closing tags)
    str = str.replace(/<[^>]*>/g, '');
    // compress white space
    str = str.replace(/(\s)\s+/g, '$1');
    // remove leading or trailing spaces
    str = str.replace(/^\s+|\s+$/g, '');

    return decodeHTMLEntities(str);
}


    /**
     * Crops a string to the specified length.
     * 
     * You can optionally a string to append (only appended if the original string was longer
     * than the specified length).
     * 
     * If preserveWords is true, the length is extended to the end of the last word that would
     * have been cropped.
     *
     * @param {String} string to crop
     * @param {Number} length to crop to
     * @param {String} string to append
     * @param {Boolean} whether to preserve the last word in full
     * @return {String} cropped string
     * @api public
     */

var cropString = exports.cropString = function (str, length, append, preserveWords) {

    if (!isString(str) || !str.length) return '';

    if ('boolean' == typeof append) {
        preserveWords = append;
        append = null;
    }

    str = String(str);

    if (str.length <= length) return str;

    var cropTo = length;

    if (preserveWords) {
        var r = str.substr(cropTo);
        var word = r.match(/^\w+/);
        if (word && word.length) {
            cropTo += word[0].length;
        }
    }

    var rtn = str.substr(0, cropTo);

    return (rtn.length < str.length && append) ? rtn + append : rtn;

}


    /**
     * Crops an HTML string safely by converting it to text, cropping it, then converting it
     * back to HTML. Also prevents cross-site attacks by stripping tags.
    */

var cropHTMLString = exports.cropHTMLString = function (str, length, append, preserveWords) {
    return textToHTML(cropString(htmlToText(str), length, append, preserveWords));
}


    /**
     * Converts a key to a label.
     *
     * @param {String} key
     * @return {String}
     * @api public
     */

var keyToLabel = exports.keyToLabel = function (str) {

    if (!isString(str) || !str.length) return '';

    str = str.replace(/([a-z])([A-Z])/g, '$1 $2');
    str = str.replace(/([0-9])([a-zA-Z])/g, '$1 $2');
    str = str.replace(/([a-zA-Z])([0-9])/g, '$1 $2');

    var parts = str.split(/\s|\.|_|-|:|;|([A-z\u00C0-\u00ff]+)/);

    for (var i = 0; i < parts.length; i++) {
        if (parts[i] && !/^[A-Z0-9]+$/.test(parts[i])) {
            parts[i] = upcase(parts[i]);
        }
    }

    return _.compact(parts).join(' ');

}


    /**
     * Converts a key to a path. Like slug(keyToLabel(str)) but
     * optionally converts the last word to a plural.
     *
     * @param {String} key
     * @return {String}
     * @api public
     */

var keyToPath = exports.keyToPath = function (str, plural) {
    if (!isString(str) || !str.length) return '';
    parts = slug(keyToLabel(str)).split('-');
    if (parts.length && plural) {
        parts[parts.length - 1] = inflect.pluralize(parts[parts.length - 1])
    }
    return parts.join('-');
}


    /**
     * Converts a key to a property. Like keyToPath but converts
     * to headlessCamelCase instead of dash-separated
     *
     * @param {String} key
     * @return {String}
     * @api public
     */

var keyToProperty = exports.keyToProperty = function (str, plural) {
    if (!isString(str) || !str.length) return '';
    parts = slug(keyToLabel(str)).split('-');
    if (parts.length && plural) {
        parts[parts.length - 1] = inflect.pluralize(parts[parts.length - 1])
    }
    for (var i = 1; i < parts.length; i++) {
        parts[i] = upcase(parts[i]);
    }
    return parts.join('');
}

    /**
     * Distance calculation function
     * 
     * See http://en.wikipedia.org/wiki/Haversine_formula
     * 
     * @param {Array} point1
     * @param {Array} point2
     * @return {Number} distance in radians
     * @api public
     */

var calculateDistance = exports.calculateDistance = function (point1, point2) {

    var dLng = (point2[0] - point1[0]) * Math.PI / 180;
    var dLat = (point2[1] - point1[1]) * Math.PI / 180;
    var lat1 = (point1[1]) * Math.PI / 180;
    var lat2 = (point2[1]) * Math.PI / 180;

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return c;

}


    /**
     * Returns the distance between two [lat,lng] points in kilometres
     * 
     * @param {Array} point1
     * @param {Array} point2
     * @return {Number} distance in kilometres
     * @api public
     */

var kmBetween = exports.kmBetween = function (point1, point2) {
    return calculateDistance(point1, point2) * RADIUS_KM;
}


    /**
     * Returns the distance between two [lat,lng] points in miles
     * 
     * @param {Array} point1
     * @param {Array} point2
     * @return {Number} distance in miles
     * @api public
     */

var milesBetween = exports.milesBetween = function (point1, point2) {
    return calculateDistance(point1, point2) * RADIUS_MILES;
}


var populateNested = exports.populateNested = function (docs, population, callback)
{
    var core = require('../core');
    core.list(population.model).model
                        .populate(docs, { path: population.path }, function (err, docs2) {
                            callback(docs);
                        });
}


var generateRegCode = exports.generateRegCode = function (callback) {
    var omtcore = require('../core');
    omtcore.list('Sequences').model.find().exec(function (err, docs) {
        if (err) { throw err; }
        if (docs != null && docs.length > 0) {
            var sq = docs[0];

            sq.mainindex++;
            sq.save(function (err, doc) {
                if (err) { throw err; }
                if (doc) {
                    var code = getCode(sq.mainindex, 2);
                    callback(code);
                }
            });


        }
        else {
            var sq = omtcore.list('Sequences').model({
                name: 'Main DB Sequences',
                mainindex: 1,
                productindex: 1,
                queryindex: 1
            });

            sq.save(function (err, doc) {
                if (err) { throw err; }
                if (doc) {
                    var code = getCode(sq.mainindex, 2);
                    callback(code);
                }
            });
        }
    });
    
    
}

var generateQueryCode = exports.generateQueryCode = function (callback) {
    var omtcore = require('../core');
    omtcore.list('Sequences').model.find().exec(function (err, docs) {
        if (err) { throw err; }
        if (docs != null && docs.length > 0) {
            var sq = docs[0];
            
            sq.queryindex++;
            sq.save(function (err, doc) {
                if (err) { throw err; }
                if (doc) {
                    var code = getCode(sq.queryindex, 2);
                    callback(code);
                }
            });


        }
        else {
            var sq = omtcore.list('Sequences').model({
                name: 'Main DB Sequences',
                mainindex: 1,
                productindex: 1,
                queryindex: 1
            });
            
            sq.save(function (err, doc) {
                if (err) { throw err; }
                if (doc) {
                    var code = getCode(sq.queryindex, 2);
                    callback(code);
                }
            });
        }
    });


}


var generateProductCode = exports.generateProductCode = function (callback) {
    var omtcore = require('../core');
    omtcore.list('Sequences').model.find().exec(function (err, docs) {
        if (err) { throw err; }
        if (docs != null && docs.length > 0) {
            var sq = docs[0];

            sq.productindex++;
            var i = sq.productindex;
            sq.save(function (err, doc) {
                if (err) { throw err; }
                if (doc) {
                    var code = getCode(i, 3);
                    console.log(code);
                    callback(code);
                }
            });


        }
        else {
            var sq = omtcore.list('Sequences').model({
                name: 'Main DB Sequences',
                mainindex: 1,
                productindex: 1,
                queryindex: 1
            });

            var i = sq.productindex;

            sq.save(function (err, doc) {
                if (err) { throw err; }
                if (doc) {
                    var code = getCode(i, 3);
                    console.log(code);
                    callback(code);
                }
            });
        }
    });


}


/**
 * genera una secuencia para las reservas basadas en 8 digitos
 */
var generateBookingCode = exports.generateBookingCode = function (callback) {
    var omtcore = require('../core');
    omtcore.list('Sequences').model.find().exec(function (err, docs) {
        if (err) { throw err; }
        if (docs != null && docs.length > 0) {
            var sq = docs[0];

            if(sq.bookingindex==null){            	
            	sq.bookingindex=1000;
            }
            else
            	sq.bookingindex++;
            sq.save(function (err, doc) {            	
                if (err) { throw err; }
                if (doc) {
                    var code = getCode(sq.bookingindex, 8);
                    callback(code);
                }
            });


        }
        else {
            var sq = omtcore.list('Sequences').model({
                name: 'Main DB Sequences',
                mainindex: 1,
                productindex: 1,
                bookingindex: 1000
            });

            var i = sq.bookingindex;
            sq.save(function (err, doc) {
                if (err) { throw err; }
                if (doc) {
                    var code = getCode(i, 8);
                    console.log(code);
                    callback(code);
                }
            });
        }
    });
}

var removeObsoleteAvailability = exports.removeObsoleteAvailability = function (product) {
    var saveyears = [];
    if (product != null && product.availability != null) {
        var currentyear = new Date().getFullYear();
        for (var i = 0, len = product.availability.length; i < len; i++) {
            //remove past years...
            
            if (product.availability[i].year < currentyear) { 
                //not to save...
            }
            else { 
                saveyears.push(product.availability[i]);
            }
        }

    }
    return saveyears;
}

var getMinimumPrices = exports.getMinimumPrices = function (product) {
    var months = ['January', 'February', 'March', 
        'April', 'May', 'June', 'July', 'August', 
        'September', 'October', 'November', 'December'];
    var actualdate = new Date();
    function getMinimum(monthdays) {
        var price = {
            year: 0,
            month: '',
            minprice: 0,
            currency: {
                label: '',
                symbol: '',
                value: ''
            }
        };
        
        if (monthdays != null && monthdays.length > 0) {
            
            for (var i = 0, len = monthdays.length; i < len; i++) {
                var day = monthdays[i];
                if (price.minprice == 0) {
                    price.minprice = day.rooms.double.price;
                    price.currency.label = day.rooms.currency.label;
                    price.currency.symbol = day.rooms.currency.symbol;
                    price.currency.value = day.rooms.currency.value;
                } else {
                    if (price.minprice > day.rooms.double.price && price.minprice > 0) {
                        price.minprice = day.rooms.double.price;
                        price.currency.label = day.rooms.currency.label;
                        price.currency.symbol = day.rooms.currency.symbol;
                        price.currency.value = day.rooms.currency.value;
                    }
                }
            }
        }
        return price;
    }
    var minimums = [];
    //triple for...
    
    if (product != null && product.availability != null) {
        //Every year...
        for (var i = 0, len = product.availability.length; i < len; i++) {
            var avail = product.availability[i];
            //Every month
            for (var m = 0, lenn = months.length; m < lenn; m++) {
                
                var mdays = avail[months[m]].availability;
                var price = {
                    year: avail.year,
                    month: months[m],
                    minprice: 0,
                    currency: {
                        label: '',
                        symbol: '',
                        value: ''
                    }
                };
                var std = 30;
                if (m == 1) { 
                    std = 27;
                }
                var evaldate = new Date(price.year, m, std);
                if (evaldate >= actualdate) {
                    
                        if (mdays != null && mdays.length > 0) {
                            price = getMinimum(mdays);
                            price.year = avail.year;
                            price.month = months[m];
                        }
                        minimums.push(price);
                    }
                
            }

        }
    }
    return minimums;
}

var getMinimumPriceFromPricesBy = exports.getMinimumPriceFromPricesBy = function (year, month, prices) {
    var minprice = {
        value : 0,
        currency : ""
    }
    var currentyear = new Date().getFullYear();

    if (prices != null && prices.length > 0) {
        var filteredprices = _.filter(prices, function (price) { 
            return (price.year == year) && (price.month.toLowerCase() == month.toLowerCase());
        });
        if (filteredprices != null && filteredprices.length > 0) { 
            minprice = filteredprices[0];
        }
    }
    return minprice;
}

var getMinimumPriceFromPrices = exports.getMinimumPriceFromPrices = function (prices) {
    var minprice = {
        value : 0,
        currency : ""
    }
    
    if (prices != null && prices.length > 0) {
        var pricevalues = _.pluck(prices, 'minprice');
        var pricecurrency = _.find(prices, function (price) {
            return (price.currency != null && price.currency.label != null && price.currency.label != '');
        });
        if (pricecurrency != null) { 
            minprice.currency = pricecurrency.currency;
        }
        if (pricevalues != null && pricevalues.length > 0) {
            pricevalues.sort(function (a, b) { return a - b; });
            minprice = pricevalues[0];
        }
    }
    return minprice;
}

var getMinimumPrice = exports.getMinimumPrice = function(from, to, availability) {
    var prices = [];
    var currency = null;
    
    var pricemin = {
        value : 0,
        currency : ""
    };
    
    if (availability == null || availability.length == 0) {
        return pricemin;
    }
    
    var iterate = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    while (iterate <= to) {
        var avail = null;
        var month = _getMonthNameEnglish(iterate.getMonth())
        for (var i = 0, len = availability.length; i < len; i++) {
            if (availability[i].year == iterate.getFullYear()) {
                avail = availability[i];
                break;
            }
        }
        if (avail != null) {
            var days = avail[month].availability;
            if (days != null && days.length > 0) {
                for (var t = 0, len = days.length; t < len; t++) {
                    var day = days[t];
                    if (day != null && day.rooms.double != null && day.rooms.double.price > 0) {
                        prices.push(day.rooms.double.price);
                        currency = day.rooms.currency;
                        if (pricemin.value == 0) {
                            pricemin.value = day.rooms.double.price;
                            pricemin.currency = day.rooms.currency;
                        } else {
                            if (pricemin.value > day.rooms.double.price && pricemin.value > 0) {
                                pricemin.value = day.rooms.double.price;
                                pricemin.currency = day.rooms.currency;
                            }
                        }
                        
                    }
                }
            }
        }
        iterate.setMonth(iterate.getMonth() + 1);
    }
    return pricemin;
    
}


var _addNumSeps = exports._addNumSeps = function (nStr) {
    var sep = ',';
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + sep + '$2');
    }
    return x1 + x2;
}

var updateproductcities = exports.updateproductcities = function (product, cmscities) {
    if (product.itinerary != null && product.itinerary.length > 0) {
        for (var i = 0, len = product.itinerary.length; i < len; i++) {
            //DEPARTURE CITIES
            if (product.itinerary[i].departurecity != null && 
                    product.itinerary[i].departurecity.city != '' && 
                    product.itinerary[i].departurecity.location != null) {
                var slug = slug(
                    product.itinerary[i].departurecity.city + ' ' + 
                        product.itinerary[i].departurecity.location.countrycode);
                var cmscity = cmscities.get(slug);
                if (cmscity != null && cmscity.label_es != null && cmscity.label_es != '') {
                    product.itinerary[i].departurecity.city_es = cmscity.label_es;
                    product.itinerary[i].departurecity.slug = slug;
                }
            }
            //SLEEP CITIES
            if (product.itinerary[i].sleepcity != null && 
                    product.itinerary[i].sleepcity.city != '' && 
                    product.itinerary[i].sleepcity.location != null) {
                var slug = slug(
                    product.itinerary[i].sleepcity.city + ' ' + 
                        product.itinerary[i].sleepcity.location.countrycode);
                var cmscity = cmscities.get(slug);
                if (cmscity != null && cmscity.label_es != null && cmscity.label_es != '') {
                    product.itinerary[i].sleepcity.city_es = cmscity.label_es;
                    product.itinerary[i].sleepcity.slug = slug;
                }
            }
            //STOP CITIES
            if (product.itinerary[i].stopcities != null && product.itinerary[i].stopcities.length > 0) {
                for (var st = 0, len = product.itinerary[i].stopcities.length; st < len; st++) {
                    if (product.itinerary[i].stopcities[st] != null && 
                            product.itinerary[i].stopcities[st].city != '' && 
                            product.itinerary[i].stopcities[st].location != null) {
                        var slug = slug(
                            product.itinerary[i].stopcities[st].city + ' ' + 
                            product.itinerary[i].stopcities[st].location.countrycode);
                        var cmscity = cmscities.get(slug);
                        if (cmscity != null && cmscity.label_es != null && cmscity.label_es != '') {
                            product.itinerary[i].stopcities[st].city_es = cmscity.label_es;
                            product.itinerary[i].stopcities[st].slug = slug;
                        }
                    }
                }
            }
        }
    }
    return product;
}

var getCode = exports.getCode = function (index, length) {

    var formatNumber = exports.formatNumber = function (num, length) {
        var r = "" + num;
        while (r.length < length) {
            r = "0" + r;
        }
        return r;
    }

    return formatNumber(index, length);
}


var compareproducts = exports.compareproducts = function (a, b) {
    if (a.createdOn > b.createdOn)
        return -1;
    if (a.createdOn < b.createdOn)
        return 1;
    return 0;
}

var compareproductsbydmc = exports.compareproductsbydmc = function (a, b) {
    if (a == null || a.dmc == null) { 
        return 1;
    }
    if (b == null || b.dmc == null) {
        return 1;
    }

    if (a.dmc.code > b.dmc.code)
        return -1;
    if (a.dmc.code < b.dmc.code)
        return 1;
    return 0;
}

var comparedmcs = exports.comparedmcs = function (a, b) {
    if (a.company.name.toLowerCase() < b.company.name.toLowerCase())
        return -1;
    if (a.company.name.toLowerCase() > b.company.name.toLowerCase())
        return 1;
    return 0;
}

var getfileextension = exports.getfileextension = function (filename) {
    var a = filename.split(".");
    if (a.length === 1 || (a[0] === "" && a.length === 2)) {
        return "";
    }
    return a.pop();
}

function _parse_uri(str) {

    var parseUri = { options: {} };
    parseUri.options = {
        strictMode: false,
        key: ["source", "protocol", "authority", "userInfo", "user",
            "password", "host", "port", "relative", "path", "directory",
            "file", "query", "anchor"],
        q: {
            name: "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser: {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
    };

    var o = parseUri.options,
        m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
        uri = {},
        i = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
};

    // ========== END GENERAL USE ===========


    //******** START: Cloudinary Tools
var cloudinary_urls = exports.cloudinary_urls = function (str) {
    if (str != null && str != '') {
        var uri = _parse_uri(str);
        var orgcloudname = 'open-market-travel';
        var altcloudname = 'openmarket-travel';

        var cloudname = '';

        if (str.indexOf(orgcloudname) > -1) {
            cloudname = orgcloudname;
        }
        if (str.indexOf(altcloudname) > -1) {
            cloudname = altcloudname;
        }
        if (str.indexOf('img-empty') > -1) {
            str = 'http://res.cloudinary.com/open-market-travel/image/upload/v1413988030/img-empty_fguche.png';
            uri = _parse_uri(str);
            cloudname = orgcloudname;
        }


        if (str.indexOf('cloudinary.com') > -1) {
            return {
                mainproductimage: 'http://res.cloudinary.com/' + cloudname + '/image/upload/c_fill,h_450,w_850,q_70/' + uri.file,
                mainproductimageretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/c_fill,h_900,w_1700,q_30/' + uri.file,
                itinerarydaythumb: 'http://res.cloudinary.com/' + cloudname + '/image/upload/c_fill,h_120,w_120,q_70/' + uri.file,
                itinerarydaythumbretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/c_fill,h_120,w_120,q_70/' + uri.file,
                avatarb36: 'http://res.cloudinary.com/' + cloudname + '/image/upload/w_36,h_36,c_fill,g_face,q_90/' + uri.file,
                avatarm42: 'http://res.cloudinary.com/' + cloudname + '/image/upload/w_42,h_42,c_fill,g_face,q_90/' + uri.file,
                avatarm42retina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/w_84,h_84,c_fill,g_face,q_50/' + uri.file,
                avatarl70: 'http://res.cloudinary.com/' + cloudname + '/image/upload/w_70,h_70,c_fill,g_face,q_90/' + uri.file,
                avatarl70retina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/w_84,h_84,c_fill,g_face,q_50/' + uri.file,
                avatar100: 'http://res.cloudinary.com/' + cloudname + '/image/upload/w_100,h_100,c_fill,g_face,q_90/' + uri.file,
                avatar100retina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/w_200,h_200,c_fill,g_face,q_30/' + uri.file,
                searchresult: 'http://res.cloudinary.com/' + cloudname + '/image/upload/c_fill,h_215,w_360,q_70/' + uri.file,
                searchresultretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/c_fill,h_215,w_360,q_70/' + uri.file,
                corporateselfie: 'http://res.cloudinary.com/' + cloudname + '/image/upload/c_fill,h_140,w_250,g_faces,q_70/' + uri.file,
                corporateselfieretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/c_fill,h_280,w_500,g_faces,q_30/' + uri.file
            };
        }
        else {
            return {
                url: str
            }
        }

    }
    else {
        return 'http://res.cloudinary.com/open-market-travel/image/upload/v1413988030/img-empty_fguche.png';
    }

}

var cloudinary_url = exports.cloudinary_url = function (str, imagename) {
    var urls = cloudinary_urls(str);
    if (urls[imagename]) {
        return urls[imagename];
    }
    else {
        return str;
    }
}
    //******** END:   Cloudinary Tools
var _exists_in_array = exports.exists_in_array = function(obj, coll) {
    var finded = false;
    if (coll) {
        var objjson = JSON.stringify(obj);
        for (var i = 0; i < coll.length; i++) {
            var colljson = JSON.stringify(coll[i]);
            if (colljson == objjson) {
                finded = true;
                break;
            }
        }
    }
    return finded;
}

var get_all_locations_from_product = exports.get_all_locations_from_product = function (product) {
    var locations = [];
    if (product) {
        if (product.itinerary != null && product.itinerary.length > 0) {
            for (var i = 0; i < product.itinerary.length; i++) {
                var dep = product.itinerary[i].departurecity.location;
                var sle = product.itinerary[i].sleepcity.location;
                if (!_exists_in_array(dep, locations)) {
                    locations.push(dep);
                }
                if (!_exists_in_array(sle, locations)) {
                    locations.push(sle);
                }
                if (product.itinerary[i].stopcities != null && product.itinerary[i].stopcities.length > 0) {
                    for (var j = 0; j < product.itinerary[i].stopcities.length; j++) {
                        var sto = product.itinerary[i].stopcities[j].location;
                        if (!_exists_in_array(sto, locations)) {
                            locations.push(sto);
                        }
                    }
                }
            }
        }
    }
    return locations;
}

var get_all_locations_and_hotels_from_product = exports.get_all_locations_and_hotels_from_product = function (product) {
    var locations = [];
    var hotels = [];
    var rt = { locations: null, hotels: null };
    if (product) {
        if (product.itinerary != null && product.itinerary.length > 0) {
            for (var i = 0; i < product.itinerary.length; i++) {
                //categoria de hotel
                var hotelcat = product.itinerary[i].hotel.category;
                if (hotels.indexOf(product.itinerary[i].hotel.category) < 0) { 
                    hotels.push(product.itinerary[i].hotel.category);
                }
                //locations...
                var dep = product.itinerary[i].departurecity.location;
                var sle = product.itinerary[i].sleepcity.location;
                
                if (!_exists_in_array(dep, locations)) {
                    locations.push(dep);
                }
                if (!_exists_in_array(sle, locations)) {
                    locations.push(sle);
                }
                if (product.itinerary[i].stopcities != null && product.itinerary[i].stopcities.length > 0) {
                    for (var j = 0; j < product.itinerary[i].stopcities.length; j++) {
                        var sto = product.itinerary[i].stopcities[j].location;
                        if (!_exists_in_array(sto, locations)) {
                            locations.push(sto);
                        }
                    }
                }
            }
        }
    }
    rt.locations = locations;
    rt.hotels = hotels;
    return rt;
}

var get_all_locations_from_dmc = exports.get_all_locations_from_dmc = function (dmc) {
    var locations = [];
    if (dmc) {
        if (dmc.company.operatein != null && dmc.company.operatein.length > 0) {
            for (var i = 0; i < dmc.company.operatein.length; i++) {
                var dep = dmc.company.operatein[i].operateLocation;
                if (!_exists_in_array(dep, locations)) {
                    locations.push(dep);
                }
            }
        }
    }
    return locations;
}


var find_addresses_in_languages = exports.find_addresses_in_languages = function () {

}

var fork = exports.fork = function (asyncCalls, onCompleteCallback) {
    var counter = asyncCalls.length;
    var all_results = [];

    function doCallback(index) {
        return function () {
            counter--;
            var results = [];
            
            for (var i = 0; i < arguments.length; i++) {
                results.push(arguments[i]);
            }
            all_results[index] = results;
            if (counter == 0) {
                onCompleteCallback(all_results);
            }
        }
    }


    for (var i = 0; i < asyncCalls.length; i++) {
        asyncCalls[i](doCallback(i));
    }
}

var accentsTidy = exports.accentsTidy = function (s) {
    var r = s.toLowerCase();
    r = r.replace(new RegExp("[àáâãäå]", 'g'), "a");
    r = r.replace(new RegExp("æ", 'g'), "ae");
    r = r.replace(new RegExp("ç", 'g'), "c");
    r = r.replace(new RegExp("[èéêë]", 'g'), "e");
    r = r.replace(new RegExp("[ìíîï]", 'g'), "i");
    r = r.replace(new RegExp("ñ", 'g'), "n");
    r = r.replace(new RegExp("[òóôõö]", 'g'), "o");
    r = r.replace(new RegExp("œ", 'g'), "oe");
    r = r.replace(new RegExp("[ùúûü]", 'g'), "u");
    r = r.replace(new RegExp("[ýÿ]", 'g'), "y");
    return r;
};




// Removes Duplicates
var _arrayUnique = exports._arrayUnique = function (a) {
    return a.reduce(function (p, c) {
        if (p.indexOf(c) < 0) p.push(c);
        return p;
    }, []);
};

//funcion que devuelve las tags partiendo de un array de tags
var _showTagsArray = exports._showTagsArray = function (tags) {
    var finaltags = [];    
    
	for( var i=0, len = tags.length; i < len; i++){
		if(tags[i]!=null){
			finaltags.push(tags[i].label);
		}
	}	
	return finaltags;
}

// funcion que dado una disponibilidad devuelve las categorias del hotel
var _showHotelCats = exports._showHotelCats = function (itinerary, lang) {
    var cats = [];
    var day = "";
    if (itinerary) {
        for (day in itinerary) {
            if (itinerary[day].hotel != null && itinerary[day].hotel.category != '') {
                var c = itinerary[day].hotel.category;
                cats.push(c);
            }
        }
        cats =  _arrayUnique(cats);
    }
    if (lang == '_es'){

        for (var i = cats.length - 1; i >= 0; i--) {
            if (cats[i] == 'unclassified *'){
                cats[i] = 'sin categorizar';
                console.log("cats[i]", cats[i]);
            }
        };
    }
    return cats
};

//Get Unique countries from itinerary
var _showCountries = exports._showCountries = function (itinerary) {
    var countries = [];
    var day = "";
    if (itinerary) {

        for (day in itinerary) {

            if (itinerary[day].departurecity != null && itinerary[day].departurecity.country.length > 2) {
                var c = itinerary[day].departurecity.country;
                countries.push(c);
            }

            if (itinerary[day].stopcities != null && itinerary[day].stopcities.length > 0) {
                for (var j = 0, len = itinerary[day].stopcities.length; j < len; j++) {
                    if (itinerary[day].stopcities[j].country.length > 2) {
                        var cou = itinerary[day].stopcities[j];
                        var c = cou.country;

                        if (countries.indexOf(c) == -1) {
                            countries.push(c);
                        }
                    }
                }
            }

            if (itinerary[day].sleepcity != null && itinerary[day].sleepcity.country.length > 2) {
                var c = itinerary[day].sleepcity.country;

                if (countries.indexOf(c) == -1) {
                    countries.push(c);
                }
            }
        }
        return _arrayUnique(countries);
    }
};

/**
 * funcion que devuelve el total de pax de la reserva con el formato:
 * they are 2 pax: 2 adults
 */
var _showDistribution = exports._showDistribution = function (roomDistribution) {
	
	
	var totalPax = 0;
	var numAdult = 0;
	var numChild = 0;
	var numBaby = 0;
	var numRoom = 0;
	for(var it=0, len = roomDistribution.length; it < len; it++){
		numRoom++;
		for(var p=0, lenn = roomDistribution[it].paxList.length; p < lenn; p++){
			totalPax++;
			if(roomDistribution[it].paxList[p].typePax!=null){
				if(roomDistribution[it].paxList[p].typePax=="adult"){
					numAdult++;							
				}
				if(roomDistribution[it].paxList[p].typePax=="child"){
					numChild++;
				}
				if(roomDistribution[it].paxList[p].typePax=="baby"){
					numBaby++;
				}
			}
		}
	}
	
	var result = totalPax+" pasajeros: "+numRoom+" Hab. "+numAdult+" Adultos ";
	if(numChild>0){
		if(numChild>1){
			result+= numChild+" niños ";
		}
		else{
			result+= numChild+" niño ";	
		}		
	}
	
	if(numBaby>0){
		if(numBaby>1){
			result+= numBaby+" bebes ";
		}
		else{
			result+= numBaby+" bebe ";	
		}		
	}		
	
	return result;
}
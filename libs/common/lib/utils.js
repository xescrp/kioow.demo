
var _ = require('underscore');
var inflect = require('i')();
// Diacritics support
var diacritics = require('./diacritics');
// Cyrillic transliteration
var transliteration = require('./transliteration.cyr');


function _escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function _replaceAll(string, find, replace) {
    return string.replace(new RegExp(_escapeRegExp(find), 'g'), replace);
}
function _buildTOKEN() {
    var d = new Date().getTime();
    var token = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    
    return token;
}

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


var getDirectories = exports.getDirectories = function (rootDir, cb) {
    var fs = require('fs');
    fs.readdir(rootDir, function (err, files) {
        var dirs = [];
        for (index = 0, len = files.length; index < len; ++index) { 
            file = files[index]; 
            if (file[0] !== '.') { 
                filePath = rootDir + '/' + file; 
                fs.stat(filePath, function(err, stat) {
                    if (stat.isDirectory()) { 
                        dirs.push(file); 
                    } 
                    if (files.length === (index + 1)) { 
                        return cb(dirs); 
                    } 
                }); 
            }
        }
    });
};

var directoryExists = exports.directoryExists = function (path, mask, cb) {
    var fs = require('fs');
    if (typeof mask == 'function') {
        mask = 0777;
    }
    path = path.replace('\\', '/');
    var events = require('events');
    var eventcarrier = function (carrierid) {
        this.name = 'Helper to send events...';
        this.created = new Date();
        this.id = carrierid || 'carrier.' + this.created.toISOString();
    }
    events.EventEmitter.call(eventcarrier);
    eventcarrier.prototype = new events.EventEmitter;

    var cev = new eventcarrier(getToken());

    var dirs = path.split('/');
    var base = dirs.shift();
    var d_error = null;
    var current = base;
    
    cev.on('finished', function () { 
        cb(d_error);
    });

    cev.on('next.dir', function (next) { 
        !stringIsNullOrEmpty(next) ? 
        setImmediate(function () {
            current = [current, next].join('/');
            fs.mkdir(current, mask, function (err) {
                if (err != null && err.code != 'EEXIST') {
                    d_error = err;
                }
                cev.emit('next');
            });
        }) : setImmediate(function () { cev.emit('next'); });
    });

    cev.on('next', function () { 
        dirs != null && dirs.length > 0 ? cev.emit('next.dir', dirs.shift()) : cev.emit('finished');
    }); 

    cev.emit('next');
}

var isValidObjectId = exports.isValidObjectId = function (arg) {
    var len = arg.length;
    if (len == 12 || len == 24) {
        return /^[0-9a-fA-F]+$/.test(arg);
    } else {
        return false;
    }
}

var getHermesSubscriptionsByCollection = exports.getHermesSubscriptionByCollection = function (collectionname) {
    var scs = require('./staticdata').hermessuscriptions;

    var rs = _.filter(scs, function (subscription) { 
        return (subscription.relatedcollections.indexOf(collectionname) >= 0);
    });

    return rs;
}

var stringIsNullOrEmpty = exports.stringIsNullOrEmpty = function (str) { 
    return (str == null || str == '');
}

var isArray = exports.isArray = function (arg) {
    return Array.isArray(arg);
}

var isDate = exports.isDate = function (arg) {
    return '[object Date]' == Object.prototype.toString.call(arg);
}

var isString = exports.isString = function (arg) {
    return 'string' == typeof arg;
}

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

var randomize = exports.randomize = function (min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

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

var guidGenerate = exports.guidGenerate = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

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

var pad = exports.pad = function(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

var escapeRegExp = exports.escapeRegExp = function (str) {
    if (!isString(str) || !str.length) return '';
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

var slug = exports.slug = function (str, sep) {
    if (!isString(str) || !str.length) return '';
    sep = sep || '-';
    var esc = escapeRegExp(sep);
    str = stripDiacritics(str);
    str = transliterate(str);
    return str.replace(/['"()\.]/g, '').replace(/[^a-z0-9_\-]+/gi, sep).replace(new RegExp(esc + '+', 'g'), sep).replace(new RegExp('^' + esc + '+|' + esc + '+$'), '').toLowerCase();
}

var singular = exports.singular = function (str) {
    return inflect.singularize(str);
}

var upcase = exports.upcase = function (str) {
    if (!isString(str) || !str.length) return '';
    return (str.substr(0, 1).toUpperCase() + str.substr(1));
}

var downcase = exports.downcase = function (str) {
    if (!isString(str) || !str.length) return '';
    return (str.substr(0, 1).toLowerCase() + str.substr(1));
}

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

var camelcase = exports.camelcase = function (str, lc) {
    return inflect.camelize(str, !(lc));
}

var decodeHTMLEntities = exports.decodeHTMLEntities = function (str) {
    if (!isString(str) || !str.length) return '';
    return str.replace(/&[^;]+;/g, function (match, ent) {
        return String.fromCharCode(ent[0] !== '#' ? htmlEntities[ent] : ent[1] === 'x' ? parseInt(ent.substr(2), 16) : parseInt(ent.substr(1), 10));
    });
};

var cropHTMLString = exports.cropHTMLString = function (str, length, append, preserveWords) {
    return textToHTML(cropString(htmlToText(str), length, append, preserveWords));
}

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

var keyToPath = exports.keyToPath = function (str, plural) {
    if (!isString(str) || !str.length) return '';
    parts = slug(keyToLabel(str)).split('-');
    if (parts.length && plural) {
        parts[parts.length - 1] = inflect.pluralize(parts[parts.length - 1])
    }
    return parts.join('-');
}

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

var calculateDistance = exports.calculateDistance = function (point1, point2) {
    
    var dLng = (point2[0] - point1[0]) * Math.PI / 180;
    var dLat = (point2[1] - point1[1]) * Math.PI / 180;
    var lat1 = (point1[1]) * Math.PI / 180;
    var lat2 = (point2[1]) * Math.PI / 180;
    
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return c;

}

var kmBetween = exports.kmBetween = function (point1, point2) {
    return calculateDistance(point1, point2) * RADIUS_KM;
}

var milesBetween = exports.milesBetween = function (point1, point2) {
    return calculateDistance(point1, point2) * RADIUS_MILES;
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

var encodeHTMLEntities = exports.encodeHTMLEntities = function (str) {
    if (!isString(str) || !str.length) return '';
    return str.replace(htmlEntitiesRegExp, function (match) {
        return '&' + htmlEntitiesMap[match] + ';';
    });
};

var textToHTML = exports.textToHTML = function (str) {
    if (!isString(str) || !str.length) return '';
    return encodeHTMLEntities(str).replace(/\n/g, '<br>');
}

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

var escapeString = exports.escapeString = function (str) {
    if (!isString(str) || !str.length) return '';
    return str.replace(/[\\'"]/g, "\\$&");
}

var stripDiacritics = exports.stripDiacritics = function (str) {
    if (!isString(str) || !str.length) return '';
    var rtn = [];
    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        rtn.push(diacritics[c] || c);
    }
    return rtn.join('');
}

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

var isObject = exports.isObject = function (arg) {
    return '[object Object]' == Object.prototype.toString.call(arg);
}

var number = exports.number = function (str) {
    return parseFloat(String(str).replace(/[^\-0-9\.]/g, ''));
}


var isNumber = exports.isNumber = function (arg) {
    return 'number' == typeof arg;
}

var isEmail = exports.isEmail = function (str) {
    return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.['a-z0-9!#$%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(str);
}

var hasProperty = exports.hasProperty = function (object, key) {
    return _.has(object, key);
}


var isFunction = exports.isFunction = function (arg) {
    return ('function' == typeof arg);
}

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

var cloneObj = exports.cloneObj = function (obj) {
    return JSON.parse(JSON.stringify(obj));
}

var replaceAll = exports.replaceAll = function (input, find, replace) { 
    return _replaceAll(input, find, replace);
}

var getToken = exports.getToken = function () { 
    return _buildTOKEN();
}

var getfileextension = exports.getfileextension = function (filename) {
    var a = filename.split(".");
    if (a.length === 1 || (a[0] === "" && a.length === 2)) {
        return "";
    }
    return a.pop();
}

var copyfile = exports.copyfile = function (source, target, callback) {
    var cbCalled = false;
    var fs = require('fs');
    function done(err) {
        if (!cbCalled) {
            callback(err);
            cbCalled = true;
        }
    }

    var rd = fs.createReadStream(source);
    rd.on("error", function (err) {
        done(err);
    });
    var wr = fs.createWriteStream(target);
    wr.on("error", function (err) {
        done(err);
    });
    wr.on("close", function (ex) {
        done();
    });
    rd.pipe(wr);
    
    
}
//base 0
var getMonthNameEnglish = module.exports.getMonthNameEnglish = function(monthindex) {
    switch (monthindex) {
        case 0: return 'January'; break;
        case 1: return 'February'; break;
        case 2: return 'March'; break;
        case 3: return 'April'; break;
        case 4: return 'May'; break;
        case 5: return 'June'; break;
        case 6: return 'July'; break;
        case 7: return 'August'; break;
        case 8: return 'September'; break;
        case 9: return 'October'; break;
        case 10: return 'November'; break;
        case 11: return 'December'; break;
    }
}
//base 0
var getMonthNameSpanish = module.exports.getMonthNameSpanish = function (monthindex) {
    switch (monthindex) {
        case 0: return 'Enero'; break;
        case 1: return 'Febrero'; break;
        case 2: return 'Marzo'; break;
        case 3: return 'Abril'; break;
        case 4: return 'Mayo'; break;
        case 5: return 'Junio'; break;
        case 6: return 'Julio'; break;
        case 7: return 'Agosto'; break;
        case 8: return 'Septiembre'; break;
        case 9: return 'Octubre'; break;
        case 10: return 'Noviembre'; break;
        case 11: return 'Diciembre'; break;
    }
}

//@@ default behaviour = 'encode'; options: 'encode', 'decode'  
//@@ default charsetname = 'utf-8'; options: 'none', 'US-ASCII', 'ISO-8859-1', 'UTF-8'
var jsescapeText = module.exports.jsescapeText = function (str, charsetname, behaviour) {
    charsetname = charsetname || 'utf-8';
    charsetname = replaceAll(charsetname, '-', '_');
    charsetname = charsetname.toLowerCase();
    
    var charsets = {
        none : {
            name : 'none',
            containsChar : function (c) {
                return false;
            }
        },
        us_ascii : {
            name : 'US-ASCII',
            containsChar : function (c) {
                return c.charCodeAt(0) < 128;
            }
        },
        iso_8859_1 : {
            name : 'ISO-8859-1',
            containsChar : function (c) {
                return c.charCodeAt(0) < 256;
            }
        },
        utf_8 : {
            name : 'UTF-8',
            containsChar : function (c) {
                return true;
            }
        }
    };
    var selectedcharset = charsets[charsetname];
    var coder = {
        encode : function (input, charset) {
            var output = '';
            for (var i = 0; i < input.length; i++) {
                var j = '\b\t\n\v\f\r"\'\\'.indexOf(input.charAt(i));
                if (j != -1) {
                    output += '\\' + 'btnvfr"\'\\'.substr(j, 1);
                } else if (input.substr(i, 2) == '</') {
                    output += '<\\/';
                    i++;
                } else if (!charset.containsChar(input.charAt(i))) {
                    if (input.charCodeAt(i) > 255) {
                        output += '\\u' + ('000' + input.charCodeAt(i).toString(16)).right(4);
                    } else {
                        output += '\\x' + ('0' + input.charCodeAt(i).toString(16)).right(2);
                    }
                } else {
                    output += input.charAt(i);
                }
            }
            return output;
        },
        decode : function (input, charset) {
            try {
                return !/([^\\]'|\r|\n)/.test(input)? eval("'" + input + "'") : false;
            } catch (e) {
                return false;
            }
        }
    };
    behaviour = behaviour || 'encode';
    var result = behaviour != null ? coder[behaviour.toLowerCase()](str, selectedcharset): null;
    return result;

}

var convertValueToCurrency = module.exports.convertValueToCurrency = function (value, currencyOrig, currencyDest, exchanges) {
    var fin = false;
    var finded = null;
    currencyOrig = currencyOrig || '';
    currencyDest = currencyDest || '';
    var orig_dest = _.find(exchanges, function (change) {
        return change.origin.toLowerCase() == currencyOrig.toLowerCase() && change.destination.toLowerCase() == currencyDest.toLowerCase();
    });
    var dest_orig = _.find(exchanges, function (change) {
        return change.origin.toLowerCase() == currencyDest.toLowerCase() && change.destination.toLowerCase() == currencyOrig.toLowerCase();
    });
    
    orig_dest != null ? finded = Math.ceil(value * orig_dest.change): null;
    dest_orig != null ? finded = Math.ceil(value / dest_orig.change): null;

    return finded;
}

//var convertValueToCurrency = module.exports.convertValueToCurrency = function(value, currencyOrig, currencyDest, exchanges) {
    
//    var fin = false;
//    var finded = null;
//    for (var itExc = 0, len = exchanges.length; itExc < len; itExc++) {
        
//        // 1) si encuentro la tasa de cambio
//        if (exchanges[itExc].origin == currencyOrig && exchanges[itExc].destination == currencyDest) {
//            finded = Math.round(value * exchanges[itExc].change);
//            break;
//        }
    		
//    			// 2) si encuentro la tasa de cambio inversa
//        else if (exchanges[itExc].destination == currencyOrig && exchanges[itExc].origin == currencyDest) {
//            finded = Math.round(value / exchanges[itExc].change);
//            break;
//        }
//    }
//    return finded;
//}

var synchronyzeProperties = module.exports.synchronyzeProperties = function (source, target, options) {
    var level = 0;
    var currentprop = [];
    var schema = options != null ? options.schema : null;
    var verbose = options != null ? options.verbose : null;
    function eachRecursive(Rsource, Rtarget) {
        for (var prop in Rsource) {
            currentprop = currentprop.slice(0, level);
            currentprop[level] = prop;
            var currentpropname = currentprop.join('.');

            if (typeof Rsource[prop] == "object" && Rsource[prop] != null) {
                if (Object.prototype.toString.call(Rsource[prop]) == '[object Array]') {
                    function emptyArray(propertyArray) {
                        if (typeof (propertyArray.remove) === 'function') {
                            var ids = _.pluck(propertyArray, '_id');
                            for (var i = 0, len = ids.length; i < len; i++) {
                                propertyArray.remove(ids[i]);
                            }
                        }
                        else {
                            propertyArray = propertyArray.splice(0, propertyArray.length);
                        }
                        return propertyArray;
                    }
                    (Rtarget[prop] != null && Rtarget[prop].length > 0) ? emptyArray(Rtarget[prop]) : Rtarget[prop] = [];
                    //push elements
                    for (var i = 0, len = Rsource[prop].length; i < len; i++) {
                        Rtarget[prop].push(Rsource[prop][i]);
                    }
                } else {
                    if (Rtarget[prop] == null) {
                        Rtarget[prop] = JSON.parse(JSON.stringify(Rsource[prop]));
                        verbose == 'high' ? console.log('full update of ' + currentprop.join('.')) : null;
                    } else {
                        schema != null && schema.path(currentpropname) != null 
                            && schema.path(currentpropname).instance == 'ObjectID' ? 
                                (Rtarget[prop] = null, Rtarget [prop] = JSON.parse(JSON.stringify(Rsource[prop]))) : 
                                (level++, eachRecursive(Rsource[prop], Rtarget[prop]));
                    }
                }
            }
            else {
                if (!Rsource.hasOwnProperty(prop)) {
                    continue;
                } else {
                    schema != null && schema.path(currentpropname) != null 
                        && schema.path(currentpropname).instance == 'ObjectID' ? Rtarget[prop] = null : null;
                    Rtarget = (Rtarget != null) ? Rtarget : JSON.parse(JSON.stringify(Rsource));
                    Rtarget[prop] = (prop != '__v') ? Rsource[prop] : Rtarget[prop];
                    verbose == 'high' ? console.log('update for ' + currentprop.join('.')) : null;
                }
            }
        }
        level > 0 ? level-- : null;
    }
    
    eachRecursive(source, target);
    
    return target;
}

var sortingHelpers = module.exports.sortingHelpers = {
    orderProductByPriceAsc : function (a, b) { 
        return a.minprice.value - b.minprice.value;
    },
    orderProductByPriceDesc : function (a, b) {
        return  b.minprice.value - a.minprice.value;
    }
}

var getlastavailabilityday = exports.getlastavailabilityday = function (product) {
    var last = null;
    var alldates = [];
    if (product != null && product.availability != null) {
        _.each(product.availability, function (avail) {
            var year = avail.year;
            var months = require('./staticdata').months_en;
            _.each(months, function (month) {
                var monthindex = months.indexOf(month);
                var days = avail[month].availability;
                days = _.filter(days, function (day) {
                    day.cdate = new Date(year, monthindex, day.day, 0, 0, 0);
                    return (day.available && day.rooms.double.price > 0);
                });
                alldates = _.union(alldates, days);
            });
        });
        last = alldates != null && alldates.length > 0 ?
            alldates.sort(function (a, b) { return b.cdate - a.cdate; })[0] : null;
    }
    return last;
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

var getOperationDays = exports.getOperationDays = function (product) {
    var operationdays = [];
    var months = require('./staticdata').months_en;
    var actualdate = new Date();
    var datetoday = (product.release != null && product.release > 0) ?
        actualdate.getDate() + product.release : actualdate.getDate();
    var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = require('./staticdata').months_en;
    actualdate.setDate(datetoday);
    actualdate.setHours(0);
    actualdate.setMinutes(0);
    actualdate.setSeconds(0);
    actualdate.setMilliseconds(0);

    if (product != null && product.availability != null) {
        console.log('product with availability...');
        //var years = _.filter(product.availability, function (year) { return year.year >= actualdate.getFullYear(); });
        //console.log('filtered years...');
        _.each(product.availability, function (avail) {
            var year = avail.year;
            _.each(months, function (month) {
                var monthindex = months.indexOf(month);
                console.log('checking month...', month);
                var days = avail[month].availability;
                _.each(days, function (day) {
                    console.log('checking day...', day);
                    if (day != null && day.available && day.date != null) {
                        var d = new Date(year, monthindex, day.day, 0, 0, 0);
                        var dayofweek = weekdays[d.getDay()];
                        operationdays.push(dayofweek);
                    }
                });
            });
        });
    }
    return _.uniq(operationdays);

}


var getMinimumPrices = exports.getMinimumPrices = function (product) { 
    var months = require('./staticdata').months_en;
    var actualdate = new Date();
    var datetoday = (product.release != null && product.release > 0) ?
        actualdate.getDate() + product.release : actualdate.getDate();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    actualdate.setDate(datetoday);
    actualdate.setHours(0);
    actualdate.setMinutes(0);
    actualdate.setSeconds(0);
    actualdate.setMilliseconds(0);
    var minimums = [];
    //triple for...
    if (product != null && product.availability != null) {
        //Every year...
        var years = _.filter(product.availability, function (year) { return year.year >= actualdate.getFullYear(); });
        _.each(years, function (avail) {
            _.each(months, function (month) {
                var operationdays = [];
                var minpricemonth = {
                    day: 0,
                    year: avail.year,
                    month: month,
                    minprice: 0,
                    currency: { label: '', symbol: '', value: '' },
                };

                var days = avail[month].availability;
                days = _.filter(days, function (day) {
                    var mindex = months.indexOf(month);
                    //if (day.available) {
                    //    var dayofweek = days[day.day.getDay()];
                    //    operationdays.push(dayofweek);
                    //}
                    var rs = (mindex == actualdate.getMonth()) ?
                        (day.day >= actualdate.getDate() && day.available && day.rooms.double.price > 0) :
                        (day.available && day.rooms.double.price > 0);
                    return rs;
                });
                
                if (days != null && days.length > 0) {
                    days.sort(function (a, b) {
                        return parseFloat(parseInt(a.rooms.double.price) + (0.01 * parseInt(a.day)) - 
                            parseFloat(parseInt(b.rooms.double.price) + (0.01 * parseInt(b.day))));
                    });
                    //month == 'August' ? console.log(days) : null;
                    var theday = days[0];
                    
                    var minpricemonth = {
                        day: theday.day,
                        year: avail.year,
                        month: month,
                        minprice: theday.rooms.double.price,
                        currency: theday.rooms.currency
                    };
                }
                minimums.push(minpricemonth);
            });
        })
    }
    return minimums;
}

//var getMinimumPrices = exports.getMinimumPrices = function (product) {
//    var months = require('./staticdata').months_en;
//    var actualdate = new Date();
//    actualdate.setHours(0);
//    actualdate.setMinutes(0);
//    actualdate.setSeconds(0);
//    actualdate.setMilliseconds(0);

//    function getMinimum(monthname, monthdays) {
//        var price = {
//            year: 0,
//            month: '',
//            minprice: 0,
//            currency: {
//                label: '',
//                symbol: '',
//                value: ''
//            }
//        };
        
//        if (monthdays != null && monthdays.length > 0) {
            
//            for (var i = 0, len = monthdays.length; i < len; i++) {
//                var day = monthdays[i];
//                var actualmonth = months[actualdate.getMonth()];
//                var actualday = actualdate.getDate();
//                //check the same month and date...
//                if (actualmonth == monthname) {
//                    if (day.day >= actualday) {
                        
//                        if (price.minprice == 0) {
//                            price.minprice = day.rooms.double.price;
//                            price.currency.label = day.rooms.currency.label;
//                            price.currency.symbol = day.rooms.currency.symbol;
//                            price.currency.value = day.rooms.currency.value;
//                        } else {
//                            if (price.minprice > day.rooms.double.price && price.minprice > 0) {
//                                price.minprice = day.rooms.double.price;
//                                price.currency.label = day.rooms.currency.label;
//                                price.currency.symbol = day.rooms.currency.symbol;
//                                price.currency.value = day.rooms.currency.value;
//                            }
//                        }


//                    }
//                }
//                else {
                    
//                    if (price.minprice == 0) {
//                        price.minprice = day.rooms.double.price;
//                        price.currency.label = day.rooms.currency.label;
//                        price.currency.symbol = day.rooms.currency.symbol;
//                        price.currency.value = day.rooms.currency.value;
//                    } else {
//                        if (price.minprice > day.rooms.double.price && price.minprice > 0) {
//                            price.minprice = day.rooms.double.price;
//                            price.currency.label = day.rooms.currency.label;
//                            price.currency.symbol = day.rooms.currency.symbol;
//                            price.currency.value = day.rooms.currency.value;
//                        }
//                    }

//                }

                
//            }
//        }
//        return price;
//    }
//    var minimums = [];
//    //triple for...
    
//    if (product != null && product.availability != null) {
//        //Every year...
//        for (var i = 0, len = product.availability.length; i < len; i++) {
//            var avail = product.availability[i];
//            //Every month
//            for (var m = 0, lenn = months.length; m < lenn; m++) {
                
//                var mdays = avail[months[m]].availability;
//                var price = {
//                    year: avail.year,
//                    month: months[m],
//                    minprice: 0,
//                    currency: {
//                        label: '',
//                        symbol: '',
//                        value: ''
//                    }
//                };
//                var std = 30;
//                if (m == 1) {
//                    std = 27;
//                }
//                var evaldate = new Date(price.year, m, std, 23, 59, 59);
//                if (evaldate >= actualdate) {
                    
//                    if (mdays != null && mdays.length > 0) {
//                        price = getMinimum(months[m], mdays);
//                        price.year = avail.year;
//                        price.month = months[m];
//                    }
//                    minimums.push(price);
//                }
                
//            }

//        }
//    }
//    return minimums;
//}

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

var getMinimumPrice = exports.getMinimumPrice = function (from, to, availability) {
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


var updateproductcities = exports.updateproductcities = function (product, cmscities) {
    if (product.itinerary != null && product.itinerary.length > 0) {
        for (var i = 0, len = product.itinerary.length; i < len; i++) {
            //DEPARTURE CITIES
            if (product.itinerary[i].departurecity != null && 
                    product.itinerary[i].departurecity.city != '' && 
                    product.itinerary[i].departurecity.location != null) {
                var dslug = slug(
                    product.itinerary[i].departurecity.city + ' ' + 
                        product.itinerary[i].departurecity.location.countrycode);
                var cmscity = cmscities.get(cslug);
                if (cmscity != null && cmscity.label_es != null && cmscity.label_es != '') {
                    product.itinerary[i].departurecity.city_es = cmscity.label_es;
                }
                product.itinerary[i].departurecity.slug = cslug;
            }
            //SLEEP CITIES
            if (product.itinerary[i].sleepcity != null && 
                    product.itinerary[i].sleepcity.city != '' && 
                    product.itinerary[i].sleepcity.location != null) {
                var sslug = slug(
                    product.itinerary[i].sleepcity.city + ' ' + 
                        product.itinerary[i].sleepcity.location.countrycode);
                var cmscity = cmscities.get(sslug);
                if (cmscity != null && cmscity.label_es != null && cmscity.label_es != '') {
                    product.itinerary[i].sleepcity.city_es = cmscity.label_es;
                }
                product.itinerary[i].sleepcity.slug = sslug;
            }
            //STOP CITIES
            if (product.itinerary[i].stopcities != null && product.itinerary[i].stopcities.length > 0) {
                for (var st = 0, len = product.itinerary[i].stopcities.length; st < len; st++) {
                    if (product.itinerary[i].stopcities[st] != null && 
                            product.itinerary[i].stopcities[st].city != '' && 
                            product.itinerary[i].stopcities[st].location != null) {
                        var tslug = slug(
                            product.itinerary[i].stopcities[st].city + ' ' + 
                            product.itinerary[i].stopcities[st].location.countrycode);
                        var cmscity = cmscities.get(tslug);
                        if (cmscity != null && cmscity.label_es != null && cmscity.label_es != '') {
                            product.itinerary[i].stopcities[st].city_es = cmscity.label_es;
                        }
                        product.itinerary[i].stopcities[st].slug = tslug;
                    }
                }
            }
        }
    }
    return product;
}

var getfieldvalue = exports.getfieldvalue = function (fieldname, modelobject, options) {
    var fields = fieldname.split('.');
    var currentfield = (fields != null && fields.length >0) ? modelobject[fields[0]] : null;
    for (var i = 1, len = fields.length; i < len; i++) { 
        currentfield = (currentfield != null) ? currentfield[fields[i]] : null;
    }
    return currentfield;
}

var accentsTidy = exports.accentsTidy = function (s) {
    var r = s || '';
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

var accented = {
    'A': '[Aa\xaa\xc0-\xc5\xe0-\xe5\u0100-\u0105\u01cd\u01ce\u0200-\u0203\u0226\u0227\u1d2c\u1d43\u1e00\u1e01\u1e9a\u1ea0-\u1ea3\u2090\u2100\u2101\u213b\u249c\u24b6\u24d0\u3371-\u3374\u3380-\u3384\u3388\u3389\u33a9-\u33af\u33c2\u33ca\u33df\u33ff\uff21\uff41]',
    'B': '[Bb\u1d2e\u1d47\u1e02-\u1e07\u212c\u249d\u24b7\u24d1\u3374\u3385-\u3387\u33c3\u33c8\u33d4\u33dd\uff22\uff42]',
    'C': '[Cc\xc7\xe7\u0106-\u010d\u1d9c\u2100\u2102\u2103\u2105\u2106\u212d\u216d\u217d\u249e\u24b8\u24d2\u3376\u3388\u3389\u339d\u33a0\u33a4\u33c4-\u33c7\uff23\uff43]',
    'D': '[Dd\u010e\u010f\u01c4-\u01c6\u01f1-\u01f3\u1d30\u1d48\u1e0a-\u1e13\u2145\u2146\u216e\u217e\u249f\u24b9\u24d3\u32cf\u3372\u3377-\u3379\u3397\u33ad-\u33af\u33c5\u33c8\uff24\uff44]',
    'E': '[Ee\xc8-\xcb\xe8-\xeb\u0112-\u011b\u0204-\u0207\u0228\u0229\u1d31\u1d49\u1e18-\u1e1b\u1eb8-\u1ebd\u2091\u2121\u212f\u2130\u2147\u24a0\u24ba\u24d4\u3250\u32cd\u32ce\uff25\uff45]',
    'F': '[Ff\u1da0\u1e1e\u1e1f\u2109\u2131\u213b\u24a1\u24bb\u24d5\u338a-\u338c\u3399\ufb00-\ufb04\uff26\uff46]',
    'G': '[Gg\u011c-\u0123\u01e6\u01e7\u01f4\u01f5\u1d33\u1d4d\u1e20\u1e21\u210a\u24a2\u24bc\u24d6\u32cc\u32cd\u3387\u338d-\u338f\u3393\u33ac\u33c6\u33c9\u33d2\u33ff\uff27\uff47]',
    'H': '[Hh\u0124\u0125\u021e\u021f\u02b0\u1d34\u1e22-\u1e2b\u1e96\u210b-\u210e\u24a3\u24bd\u24d7\u32cc\u3371\u3390-\u3394\u33ca\u33cb\u33d7\uff28\uff48]',
    'I': '[Ii\xcc-\xcf\xec-\xef\u0128-\u0130\u0132\u0133\u01cf\u01d0\u0208-\u020b\u1d35\u1d62\u1e2c\u1e2d\u1ec8-\u1ecb\u2071\u2110\u2111\u2139\u2148\u2160-\u2163\u2165-\u2168\u216a\u216b\u2170-\u2173\u2175-\u2178\u217a\u217b\u24a4\u24be\u24d8\u337a\u33cc\u33d5\ufb01\ufb03\uff29\uff49]',
    'J': '[Jj\u0132-\u0135\u01c7-\u01cc\u01f0\u02b2\u1d36\u2149\u24a5\u24bf\u24d9\u2c7c\uff2a\uff4a]',
    'K': '[Kk\u0136\u0137\u01e8\u01e9\u1d37\u1d4f\u1e30-\u1e35\u212a\u24a6\u24c0\u24da\u3384\u3385\u3389\u338f\u3391\u3398\u339e\u33a2\u33a6\u33aa\u33b8\u33be\u33c0\u33c6\u33cd-\u33cf\uff2b\uff4b]',
    'L': '[Ll\u0139-\u0140\u01c7-\u01c9\u02e1\u1d38\u1e36\u1e37\u1e3a-\u1e3d\u2112\u2113\u2121\u216c\u217c\u24a7\u24c1\u24db\u32cf\u3388\u3389\u33d0-\u33d3\u33d5\u33d6\u33ff\ufb02\ufb04\uff2c\uff4c]',
    'M': '[Mm\u1d39\u1d50\u1e3e-\u1e43\u2120\u2122\u2133\u216f\u217f\u24a8\u24c2\u24dc\u3377-\u3379\u3383\u3386\u338e\u3392\u3396\u3399-\u33a8\u33ab\u33b3\u33b7\u33b9\u33bd\u33bf\u33c1\u33c2\u33ce\u33d0\u33d4-\u33d6\u33d8\u33d9\u33de\u33df\uff2d\uff4d]',
    'N': '[Nn\xd1\xf1\u0143-\u0149\u01ca-\u01cc\u01f8\u01f9\u1d3a\u1e44-\u1e4b\u207f\u2115\u2116\u24a9\u24c3\u24dd\u3381\u338b\u339a\u33b1\u33b5\u33bb\u33cc\u33d1\uff2e\uff4e]',
    'O': '[Oo\xba\xd2-\xd6\xf2-\xf6\u014c-\u0151\u01a0\u01a1\u01d1\u01d2\u01ea\u01eb\u020c-\u020f\u022e\u022f\u1d3c\u1d52\u1ecc-\u1ecf\u2092\u2105\u2116\u2134\u24aa\u24c4\u24de\u3375\u33c7\u33d2\u33d6\uff2f\uff4f]',
    'P': '[Pp\u1d3e\u1d56\u1e54-\u1e57\u2119\u24ab\u24c5\u24df\u3250\u3371\u3376\u3380\u338a\u33a9-\u33ac\u33b0\u33b4\u33ba\u33cb\u33d7-\u33da\uff30\uff50]',
    'Q': '[Qq\u211a\u24ac\u24c6\u24e0\u33c3\uff31\uff51]',
    'R': '[Rr\u0154-\u0159\u0210-\u0213\u02b3\u1d3f\u1d63\u1e58-\u1e5b\u1e5e\u1e5f\u20a8\u211b-\u211d\u24ad\u24c7\u24e1\u32cd\u3374\u33ad-\u33af\u33da\u33db\uff32\uff52]',
    'S': '[Ss\u015a-\u0161\u017f\u0218\u0219\u02e2\u1e60-\u1e63\u20a8\u2101\u2120\u24ae\u24c8\u24e2\u33a7\u33a8\u33ae-\u33b3\u33db\u33dc\ufb06\uff33\uff53]',
    'T': '[Tt\u0162-\u0165\u021a\u021b\u1d40\u1d57\u1e6a-\u1e71\u1e97\u2121\u2122\u24af\u24c9\u24e3\u3250\u32cf\u3394\u33cf\ufb05\ufb06\uff34\uff54]',
    'U': '[Uu\xd9-\xdc\xf9-\xfc\u0168-\u0173\u01af\u01b0\u01d3\u01d4\u0214-\u0217\u1d41\u1d58\u1d64\u1e72-\u1e77\u1ee4-\u1ee7\u2106\u24b0\u24ca\u24e4\u3373\u337a\uff35\uff55]',
    'V': '[Vv\u1d5b\u1d65\u1e7c-\u1e7f\u2163-\u2167\u2173-\u2177\u24b1\u24cb\u24e5\u2c7d\u32ce\u3375\u33b4-\u33b9\u33dc\u33de\uff36\uff56]',
    'W': '[Ww\u0174\u0175\u02b7\u1d42\u1e80-\u1e89\u1e98\u24b2\u24cc\u24e6\u33ba-\u33bf\u33dd\uff37\uff57]',
    'X': '[Xx\u02e3\u1e8a-\u1e8d\u2093\u213b\u2168-\u216b\u2178-\u217b\u24b3\u24cd\u24e7\u33d3\uff38\uff58]',
    'Y': '[Yy\xdd\xfd\xff\u0176-\u0178\u0232\u0233\u02b8\u1e8e\u1e8f\u1e99\u1ef2-\u1ef9\u24b4\u24ce\u24e8\u33c9\uff39\uff59]',
    'Z': '[Zz\u0179-\u017e\u01f1-\u01f3\u1dbb\u1e90-\u1e95\u2124\u2128\u24b5\u24cf\u24e9\u3390-\u3394\uff3a\uff5a]'
};
var clean_regex = exports.clean_regex = function (search_string) { 
    if (search_string != null && search_string != '') {
        search_string = search_string.replace(/([|()[{.+*?^$\\])/g, "\\$1");
        
        // replace characters by their compositors
        var accent_replacer = function (chr) {
            return accented[chr.toUpperCase()] || chr;
        }
        
        return new RegExp(search_string.replace(/\S/g, accent_replacer), 'g');
    } else {
        return null
    }
}

var mp_regex = exports.mp_disjunctive_regex = function (search_string) {
    // escape meta characters
    search_string = search_string.replace(/([|()[{.+*?^$\\])/g, "\\$1");
    
    // split into words
    var words = search_string.split(/\s+/);
    
    // sort by length
    var length_comp = function (a, b) {
        return b.length - a.length;
    };
    words.sort(length_comp);
    
    // replace characters by their compositors
    var accent_replacer = function (chr) {
        return accented[chr.toUpperCase()] || chr;
    }
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].replace(/\S/g, accent_replacer);
    }
    
    // join as alternatives
    var regexp = words.join("|");
    return new RegExp(regexp, 'gi');
}

var mp_regex = exports.mp_conjunctive_regex = function (search_string) {
    // escape meta characters
    search_string = search_string.replace(/([|()[{.+*?^$\\])/g, "\\$1");
    
    // split into words
    var words = search_string.split(/\s+/);
    
    // sort by length
    var length_comp = function (a, b) {
        return b.length - a.length;
    };
    words.sort(length_comp);
    
    // replace characters by their compositors
    var accent_replacer = function (chr) {
        return accented[chr.toUpperCase()] || chr;
    }
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].replace(/\S/g, accent_replacer);
        words[i] = '(?=.*' + words[i] + ')';
    }
    
    // join as alternatives
    var regexp = words.join("");
    return new RegExp(regexp, 'gi');
}




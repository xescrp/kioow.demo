// change 1000 to 1.000
var numberFractions = module.exports.numberFractions = function (nStr) {
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
};

// set global filter Swig to change numbers decimal from dots to comma
var decimales = module.exports.decimales =  function (input) {
    var n = String(input);
    if (n.indexOf(".") >= 0) {
        var s = n.split('.');
        return s.join(',');
    } else {
        return input;
    }
};
// remove decimals
var removeDecimal = module.exports.removeDecimal =  function (input) {
    return Math.round(input);
};

var toFixed = module.exports.toFixed = function (input, val) { 
        var idFix = 2;
        if (val !== undefined && val !== null  && typeof val == 'number' ){            
            idFix = parseInt(val);
        }            
        return parseInt(input).toFixed(idFix);
};
// round decimals
var ceil = module.exports.ceil =  function (input) {
        return Math.ceil(input);
};

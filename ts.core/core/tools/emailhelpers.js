// Get unique hotel categories from itineraryç
var common = require('yourttoo.common');
var _ = require('underscore');

var _showHotelCats = exports._showHotelCats = function (itinerary, lang) {
    var cats = [];
    var day = "";
    if (itinerary) {
        _.each(itinerary, function (day) {
            if (day.hotel != null && day.hotel.category != '') {
                var c = day.hotel.category;
                c = (lang == 'es' && c == 'unclassified *') ? 'otros alojamientos' : c;  
                cats.push(c);
            }
        });
        cats = _.uniq(cats);
    }
    return cats;
};

var _showTagsArrayPublished = exports._showTagsArrayPublished = function (tags) {
    var finaltags = [];
    _.each(tags, function (tag) {
        tag.state == 'published' ? finaltags.push(tag.label) : null;
    });
    return finaltags;
};

var _showTagsArray = exports._showTagsArray = function (tags) {
    var finaltags = [];
    _.each(tags, function (tag) {
        finaltags.push(tag.label);
    });
    return finaltags;
};

var _showCountries = exports._showCountries = function (itinerary) {
    var countries = [];
    var day = "";
    if (itinerary) {
        _.each(itinerary, function (day) {
            day.departurecity != null && !common.utils.stringIsNullOrEmpty(day.departurecity.country) ?
                countries.push(day.departurecity.country) : null;
            day.sleepcity != null && !common.utils.stringIsNullOrEmpty(day.sleepcity.country) ?
                countries.push(day.sleepcity.country) : null;
            day.stopcities != null && day.stopcities.length > 0 ?
                _.each(day.stopcities, function (stop) {
                    !common.utils.stringIsNullOrEmpty(stop.country) ? countries.push(stop.country) : null;
                }) : null;
        });
    }
    return _.uniq(countries);
};


var _showDistribution = exports._showDistribution = function (booking) {

    var totalPax = booking.paxes.length;
    var numAdult = booking.paxes.length;
    var numChild = 0;
    var numBaby = 0;
    var numRoom = booking.rooms.length;

    var result = totalPax + " pasajeros: " + numRoom + " Hab. " + numAdult + " Adultos ";
    (numChild > 0) ? result += numChild + " niños " : null;
    (numBaby > 0) ? result += numBaby + " bebes " : null;

    return result;
};



// Get meals from product
var _mealsIncluded = exports._mealsIncluded = function (itinerary) {
    var breakfastcount = 0;
    var lunchcount = 0;
    var dinnercount = 0;
    var html = '';
    if (itinerary && itinerary.length > 0) {
        for (var i = 0, len = itinerary.length; i < len; i++) {
            var it = itinerary[i];

            if (it != null && it.hotel != null && it.hotel.breakfast) {
                breakfastcount++;
            }
            if (it != null && it.hotel != null && it.hotel.lunch) {
                lunchcount++;
            }
            if (it != null && it.hotel != null && it.hotel.dinner) {
                dinnercount++;
            }
        }
    }
    var items = {};
    if (breakfastcount > 0) {
        items.breakfast = breakfastcount;
    }
    if (lunchcount > 0) {
        items.lunch = lunchcount;
    }
    if (dinnercount > 0) {
        items.dinner = dinnercount;
    }
    return items;
};


var _drinksincluded = exports._drinksincluded = function (itinerary) {
    var ok = false;
    if (itinerary && itinerary.length > 0) {
        for (var i = 0, len = itinerary.length; i < len; i++) {
            if (itinerary[i].lunchdrinks | itinerary[i].dinnerdrinks) {
                ok = true;
            }
        }
    }
    return ok;
};



//CLOUDINARY
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
var _cloudinary_urls = exports.cloudinary_urls =  exports._cloudinary_urls = function (str, imagename) {
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
            if (imagename.indexOf('avatar') > -1) {
                str = 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg';
            } else {
                str = 'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png';
            }
            uri = _parse_uri(str);
            cloudname = orgcloudname;
        }


        if (str.indexOf('cloudinary.com') > -1) {
            return {
                mainproductimage: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_370,w_870,q_70/' + uri.file,
                mainproductimageretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_900,w_1700,q_30/' + uri.file,
                mainproductimagemail: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_148,w_264,q_70/' + uri.file,
                mainproductimageretinamail: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_296,w_528,q_30/' + uri.file,
                mainproductimageprint: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_600,w_1200,q_70/' + uri.file,
                mainproductimageprintresume: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_450,w_1200,q_80/' + uri.file,
                itinerarydaythumb: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_120,w_120,q_70/' + uri.file,
                itinerarydaythumbretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_240,w_240,q_50/' + uri.file,
                resultimage: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_214,w_380,q_70/' + uri.file,
                resultimageretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_428,w_760,q_30/' + uri.file,
                avatarb36: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_36,h_36,c_fill,g_face,q_90/' + uri.file,
                avatarb36retina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_72,h_72,c_fill,g_face,q_50/' + uri.file,
                avatarm42: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_42,h_42,c_fill,g_face,q_90/' + uri.file,
                avatarm42retina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_84,h_84,c_fill,g_face,q_50/' + uri.file,
                avatarl70: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_70,h_70,c_fill,g_face,q_90/' + uri.file,
                avatarl70retina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_140,h_140,c_fill,g_face,q_50/' + uri.file,
                avatar100: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_100,h_100,c_fill,g_face,q_90/' + uri.file,
                avatar100retina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_200,h_200,c_fill,g_face,q_30/' + uri.file,
                avatar125: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_125,h_125,c_fill,g_face,q_90/' + uri.file,
                avatar125retina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_250,h_250,c_fill,g_face,q_30/' + uri.file,
                searchresult: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_215,w_360,q_70/' + uri.file,
                searchresultretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_430,w_720,q_50/' + uri.file,
                inspirationresult: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_270,w_270,q_70/cms/' + uri.file,
                inspirationresultretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_540,w_540,q_40/cms/' + uri.file,
                association: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_210,h_150,q_80,c_pad/' + uri.file,
                associationretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/w_420,h_300,q_30,c_pad/' + uri.file,
                corporatephoto: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/g_face,c_fill,h_245,w_437,g_faces,q_70/' + uri.file,
                corporatephotoretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/g_face,c_fill,h_490,w_874,g_faces,q_30/' + uri.file,
                corporateselfie: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_140,w_250,g_faces,q_70/' + uri.file,
                corporateselfieretina: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_280,w_500,g_faces,q_30/' + uri.file,
                mainlanding: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_380,w_1400,q_71/cms/' + uri.file,
                countryzonelanding: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_400,w_400,q_71/cms/' + uri.file,
                countrytaglanding: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_400,w_700,q_71/cms/' + uri.file,
                contentheader: 'http://res.cloudinary.com/' + cloudname + '/image/upload/cs_no_cmyk/c_fill,h_500,w_3000,q_45,fl_progressive/cms/' + uri.file
            };

        }
        else {
            return {
                url: str
            }
        }

    }
    else {
        return 'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png';
    }

}

var _cloudinary_url = exports._cloudinary_url = function (str, imagename) {
    var urls = _cloudinary_urls(str, imagename);
    if (urls[imagename]) {
        return urls[imagename];
    }
    else {
        return str;
    }
}
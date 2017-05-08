
var access_token;

var Request = {
    url: '',
    date: new Date(),
    params: {},
    method: 'GET'
}

function RequestBuilder(url, method, params)
{
    var rq = new Request();
    rq.url = url;
    rq.params = params;
    rq.method = method;

    return rq;
}

function http_ajax_request(request, successcallback, errorcallback)
{
    if (request)
    {
        if (request.url)
        {
            if (request.method == 'GET')
            {
                $.ajax({
                    url: request.url + '?' + params,
                    type: request.method,
                    crossDomain: true,
                    dataType: 'jsonp',
                    success: successcallback,
                    error: errorcallback
                });
            }

            if (request.method == 'POST')
            {
                $.ajax({
                    url: request.url,
                    data: request.params,
                    type: request.method,
                    crossDomain: true,
                    dataType: 'jsonp',
                    success: successcallback,
                    error: errorcallback
                });
            }
            
        }
        else { throw new Error('Empty url is not allowed') }
    }
    else{ throw new Error('You need to provide a request object for this method') }
}

$("document").ready(
    function () {

        var e = document.createElement('script');
        e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
        e.async = true;
        document.getElementById('fb-root').appendChild(e);
        // Initialize the SDK upon load
        appid = 524764624299619; //appIDPrd = 573419182671135 ; appIDTest = 524764624299619; 
        FB.init({
            appId: appid, // App ID = 573419182671135
            channelUrl: 'http://openmarket.travel/channel.html', // Channel File
            status: true, // check login status
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true  // parse XFBML
        });
        // listen for and handle auth.statusChange events
        FB.Event.subscribe('auth.statusChange', OnLogin);

        FB.Event.subscribe('edge.create',
            function (href, widget) {
                alert('You liked the URL: ' + href);
            });

        window.twttr = (function (d, s, id) {
            var t, js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return; js = d.createElement(s); js.id = id;
            js.src = "https://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
            return window.twttr || (t = { _e: [], ready: function (f) { t._e.push(f) } });
        }(document, "script", "twitter-wjs"));


        twttr.ready(function (twttr) {
            // Now bind our custom intent events
            twttr.events.bind('tweet', tweetIntentToAnalytics);
            twttr.events.bind('retweet', retweetIntentToAnalytics);
            twttr.events.bind('favorite', favIntentToAnalytics);
            twttr.events.bind('follow', followIntentToAnalytics);
        });

    });



//GEO MAP HELPER ********************

var geocoder;
var markers;
var fullmap;
var fullscope;
function setposition(coords, mapvector, callback) {
    var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
    getAddressByCoords(latlng)

}

function getAddressByCoords(latlng, callback) {
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var rss = ExtractResults(results, function (results) {
                if (results) {
                    for (var i = 0; i < results.length; i++) {
                        var rs = results[i];
                        putMarker(rs);

                        if (callback) {
                            callback();
                        }
                    }
                }
            });
            console.log(rss);
        }
    });
}

function getAddressByText(searchtext, callback) {
    geocoder.geocode({ 'address': searchtext }, function (results, status) {


        if (results.length > 0) {
            console.log(results);
            var rss = ExtractResults(results, function (results) {
                if (results) {
                    fullscope.results.FindedResults = results;
                    for (var i = 0; i < results.length; i++) {
                        var rs = results[i];
                        var mark = putMarker(rs);
                        fullmap.setCenter(mark.getPosition());
                        if (callback) {
                            callback();
                        }
                    }
                }
            });
            fullscope.results.FindedResults = rss;
            console.log(rss);
        }
    });
}


function putMarker(result) {

    var myLatLng = new google.maps.LatLng(result.Lat,
                                result.Lon);
    var anewmarker = new google.maps.Marker({
        position: result.Location,
        title: result.Title,
        map: result.Map
    });



    result.MapMarker = anewmarker;
    console.log(anewmarker);

    console.log(markers);
    return anewmarker;
}

function ExtractResults(results, extractFinishedHandler) {
    var frmResults = new Array();
    var putmarker = true;

    for (var it = 0; it < results.length; ++it) {
        var result =
            {
                Address: '',
                CP: '',
                City: '',
                GoogleMap: '',
                Country: '',
                CountryCode: '',
                StateOrProvince: '',
                Number: '',
                Location: null,
                Lat: 0,
                Lon: 0,
                Title: 'Map testing',
                onClickMap: null,
                MapMarker: null,
                MapContainer: 'mapcontainer',
                Map: fullmap,
                FindAction: function () {
                    getAddressByText($scope.findtext, function () {

                    });
                }
            }
        var arrAddress = results[it].address_components;
        console.log(arrAddress);
        result.Lat = results[it].geometry.location.lat();
        result.Lon = results[it].geometry.location.lng();
        result.Address = results[it].formatted_address;
        result.Location = results[it].geometry.location;

        for (var j = 0; j < arrAddress.length; j++) {
            var address_component = arrAddress[j];
            console.log(address_component);
            if (address_component.types[0] == "route") {
                console.log(j + ": route:" + address_component.long_name);
                result.GoogleMap = address_component.long_name;
            }

            if (address_component.types[0] == "locality") {
                console.log("town:" + address_component.long_name);
                result.City = address_component.long_name;
            }

            if (address_component.types[0] == "country") {
                console.log("country:" + address_component.long_name);
                result.Country = address_component.long_name;
                result.CountryCode = address_component.short_name;
            }

            if (address_component.types[0] == "postal_code_prefix") {
                console.log("pc:" + address_component.long_name);
                result.CP = address_component.long_name;
            }

            if (address_component.types[0] == "administrative_area_level_1") {
                console.log("prov:" + address_component.long_name);
                result.StateOrProvince = address_component.long_name;
            }

            if (address_component.types[0] == "postal_code") {
                console.log("pc:" + address_component.long_name);
                result.CP = address_component.long_name;
            }

            if (address_component.types[0] == "street_number") {
                console.log("street_number:" + address_component.long_name);
                result.Number = address_component.long_name;
            }


        }
        frmResults.push(result);

        console.log(result);
    }

    if (extractFinishedHandler) {
        extractFinishedHandler(frmResults);
    }

    return frmResults;
}

function initialize(container) {
    // add mapOptions here to the values in the input boxes.
    var mapOptions = {
        center: new google.maps.LatLng(39.57119, 2.646633999999949),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById(container),
        mapOptions);

    geocoder = new google.maps.Geocoder();

    var myLatLng = new google.maps.LatLng(39.57119, 2.646633999999949);
    markers = new Array();
    var style = [
              {
                  "elementType": "labels.text",
                  "stylers": [
                    { "color": "#685040" },
                    { "visibility": "on" },
                    { "weight": 0.5 }
                  ]
              }, {
                  "featureType": "administrative.locality",
                  "elementType": "labels.text.stroke",
                  "stylers": [
                    { "color": "#ffc425" },
                    { "visibility": "on" },
                    { "weight": 2.1 }
                  ]
              }, {
                  "featureType": "administrative.neighborhood",
                  "stylers": [
                    { "color": "#9f3c00" },
                    { "weight": 0.7 }
                  ]
              }, {
                  "featureType": "landscape.man_made",
                  "stylers": [
                    { "color": "#c8c6c9" },
                    { "lightness": 23 }
                  ]
              }, {
              }
    ]
    var style2 =
        [
          {
              "featureType": "administrative.land_parcel",
              "elementType": "labels",
              "stylers": [
                { "visibility": "off" }
              ]
          }, {
              "featureType": "water",
              "elementType": "labels",
              "stylers": [
                { "visibility": "off" }
              ]
          }, {
              "featureType": "transit.station",
              "elementType": "labels",
              "stylers": [
                { "visibility": "off" }
              ]
          }, {
              "featureType": "poi",
              "elementType": "labels",
              "stylers": [
                { "visibility": "off" }
              ]
          }, {
              "featureType": "landscape",
              "elementType": "labels",
              "stylers": [
                { "visibility": "off" }
              ]
          }, {
              "featureType": "administrative.neighborhood",
              "elementType": "labels",
              "stylers": [
                { "visibility": "off" }
              ]
          }, {
          }, {
              "featureType": "road",
              "elementType": "labels.icon",
              "stylers": [
                { "visibility": "off" }
              ]
          }, {
              "featureType": "transit.line",
              "stylers": [
                { "visibility": "off" }
              ]
          }, {
          }
        ]
    map.setOptions({ styles: style2 });
    return map;
}

//END GEO MAP HELPERS ***************

function OnLogin(response) {
    if (response.authResponse) {
        console.log(response);
        FB.api('/me?fields=id,name,email,hometown_location', LoadValues);
        access_token = response.authResponse.accessToken;
        //Check if my mail is already registered in hostaldog
    }
}


function tweetIntentToAnalytics(intentEvent) {
    console.log(intentEvent);
    var obj = { identifier: targetidentifier, postid: 'tweet' };
    $.post('/Actions/ShareOnTwitter', obj, function (data) {
        if (data) {
            if (data.ResultOK) {
                showupdatingresults(data.Messages[0], true);
                if (obj.identifier == currentprofile.Identifier) {
                    notify_add_doglars(data.Messages[1], data.Action);
                }
                getMyProfile(function () {
                    update_doglars();
                });
            }
            else {
                showupdatingresults(data.Messages[0], false);
            }


        }
    });
    if (callback) {
        callback(response);
    }
    console.log(intentEvent);
}

function favIntentToAnalytics(intentEvent) {
    tweetIntentToAnalytics(intentEvent);
}

function retweetIntentToAnalytics(intentEvent) {
    //if (!intentEvent) return;
    //var label = intentEvent.data.source_tweet_id;
    //pageTracker._trackEvent('twitter_web_intents', intentEvent.type, label);
    console.log(intentEvent);
}

function followIntentToAnalytics(intentEvent) {
    console.log(intentEvent);
    var followed_user_id = intentEvent.data.user_id;
    var followed_screen_name = intentEvent.data.screen_name;
    var obj = { identifier: targetidentifier };
    $.post('/Actions/FollowOnTwitter', obj, function (data) {
        if (data) {
            if (data.ResultOK) {
                showupdatingresults(data.Messages[0], true);
                notify_add_doglars(data.Messages[1], data.Action);
                getMyProfile(function () {
                    update_doglars();
                });
            }
            else {
                showupdatingresults(data.Messages[0], false);
            }


        }
    });
    if (callback) {
        callback(response);
    }
}



//id [string]	559038395
//name [string]	Name surname1 surname2
//first_name [string]	Name
//last_name [string]	surname1 surname2
//link [string]	https://www.facebook.com/username
//username [string]
//birthday [string]	06/11/1978
//gender [string]	male
//email [string]	unemail@hotmail.com
//timezone [number]	2
//locale [string]	es_LA
//verified [boolean]	true
//updated_time [string]	2012-03-06T20:11:30+0000


function fb_register(onfblogincompletehandler) {
    FB.login(function (response) {
        var params = { Email: "", Key: "", ImageProfile: "", UserName: "" };
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            console.log(response); // dump complete info
            access_token = response.authResponse.accessToken; //get access token

            params.Key = response.authResponse.userID; //get FB UID
            var fbimage = 'https://graph.facebook.com/' + params.Key + '/picture?type=large';
            var name = response.first_name;
            var surnames = response.last_name;
            var slogan = response.name;

            FB.api('/me', function (response) {


                console.log(response);
                params.Email = response.email;
                params.Key = response.id;
                params.UserName = response.name;
                params.ImageProfile = fbimage;


                if (onfblogincompletehandler) {
                    onfblogincompletehandler(params);
                }


            });


        } else {
            //user hit cancel button
            console.log('El usuario ha cancelado el proceso de registro.');

        }
    }, {
        scope: 'read_friendlists,email,user_location,publish_actions'
    });
}

function fb_login(onfblogincompletehandler) {


    FB.login(function (response) {
        var params = { Email: "", Key: "", ImageProfile: "", UserName: "" };


        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            console.log(response); // dump complete info
            access_token = response.authResponse.accessToken; //get access token

            params.Key = response.authResponse.userID; //get FB UID
            var fbimage = 'https://graph.facebook.com/' + params.Key + '/picture?type=large';
            var name = response.first_name;
            var surnames = response.last_name;
            var slogan = response.name;



            console.log('https://graph.facebook.com/' + params.Key + '/picture?type=large');

            FB.api('/me', function (dueresponse) {


                console.log(dueresponse);
                params.Email = dueresponse.email;
                params.Key = dueresponse.id;
                params.UserName = dueresponse.name;
                params.ImageProfile = fbimage;

                if (onfblogincompletehandler) {
                    onfblogincompletehandler(params);
                }
            });

        } else {
            //user hit cancel button
            console.log('El usuario ha cancelado el proceso de login.');

        }
    }, {
        scope: 'read_friendlists,email,user_location,publish_actions'
    });
}

function fb_share(link, picture, caption, description, message, profileidentifier, resultscontainer, callback) {
    FB.ui(
   {
       method: 'feed',
       name: 'Open Market Travel',
       link: link,
       picture: picture,
       caption: caption,
       description: description,
       message: message
   },
   function (response) {

       console.log(response);
       if (response && response.post_id) {
           var obj = { identifier: profileidentifier, postid: response.post_id };
           $.post('/Actions/ShareOnFacebook', obj, function (data) {
               if (data) {
                   if (data.ResultOK) {
                       showupdatingresults(data.Messages[0], true);
                       getMyProfile(function () {
                           if (obj.identifier != currentprofile.Identifier) {
                               notify_add_doglars(data.Messages[1], data.Action);
                           }
                           update_doglars();
                       })
                   }
                   else { showupdatingresults(data.Messages[0], false); }
               }
               else {
                   showupdatingresults('No se ha podido compartir el perfil... :(', false);
               }
           });


       } else {
           alert('No has publicado!.');
       }
       if (callback) {
           callback(response);
       }
   }
 );
}




function fb_likethepage(callback) {

    FB.api({ method: 'pages.isFan', page_id: '205483146262410' }, function (resp) {
        if (resp) {
            Log.info('You like the Application.');
            if (callback) {
                callback(true);
            }
        } else {
            Log.error("You don't like the Application.");
            if (callback) {
                callback(false);
            }
        }
    });

}











//TODO: pendiente editar...
function fillfacebookfriends(container, tokenos) {
    var isme = false;
    if (currentprofile) {
        if (currentprofile.TokenOS == tokenos) { return null; }
    }
    console.log('Friends for ' + tokenos);
    $('#' + container).html('');
    if (tokenos && tokenos != '') {
        getfacebookfriends(tokenos, container, function (friends) {
            if (friends && friends.length > 0) {
                console.log(friends);
                //$.map(friends, function (friend, index) {
                //    var rnd = '<img src=\"' + friend.image + '\">';
                //    console.log(friend);
                //    $('#' + container).append(rnd);
                //});
            }
        });
    }
}

function getfacebookfriends(fbid, container, callback) {

    var doken = 'CAAH516ru2WMBAFQf3b8PIkrCWVJ0FW8U9lDFyGE9nyOjG1oteeyEVlHTkcnrPM8ZAMQmEP1D6PO7AauhEQgdQAIwM8F2LGgyLB0tROa8QP8NrQXuxCqKrE463szLfgKGhjBGOH3LgEiZC85LrANnlKUI0CHcoKHrRkZB3FKTQZDZD';
    var token = 'CAAIJhY6wxR8BAJ5ZAAOWcVcbS0zQFbIkEVEKvK9tpf9ZCC0aBZBTE5eg7rHdRr8oJHZA97fZA5l4UjtFpLUPJGV1EasYZBZCU5RpivHhV8bpe2EeyIr6FIxCrYAChWe9A4L19guXm5eBfdxl8nPpqXVxUXWU1SsVs1iN4v9vxE3kQZDZD';

    var friends = new Array();
    if (access_token == null) {
        if (FB) {
            access_token = FB.getAuthResponse()['accessToken'];
        }
        else {
            FB.init({
                appId: appid, // App ID = 573419182671135
                channelUrl: 'http://www.hostaldog.com/channel.html', // Channel File
                status: true, // check login status
                cookie: true, // enable cookies to allow the server to access the session
                xfbml: true  // parse XFBML
            });
            access_token = FB.getAuthResponse()['accessToken'];
        }
    }

    var url = 'https://graph.facebook.com/me/mutualfriends/' +
        fbid + '?fields=picture%2Cname&access_token=' + access_token; //CAACEdEose0cBAAjCFTmXuBUbzHiAACAwn7jGRjsae8rUYZBJcakQN8K2ySRvE17RdNNlCZA4EcEKiS8weFVfSp8VqUt7ufD7kJ37ZAIuHKdOyAF7oJoPaiRZB8WKnXZCXoByaPHlYLH9KZCsfofQF01h03wobqZCz9f57APFZBIncAZDZD';
    $.get(url, null, function (data, textStatus, jqXHR) {
        if (data) {
            if (data.data) {
                //var moreid = 'more_' + fbid;
                //var fbtext = '<div style=\"\n    float: right;\n    font-size: 11px;\n\">' +
                //    'Tienes <a style=\"\n    font-weight: bold;\n\">' + data.data.length +
                //    '<\/a> amigos en comun en <img src=\"\/img\/facebook-logo1.png\" style=\"\n    width: 60px;\n\">' +
                //    ' con este hostaldog<\/div>';
                //var morefb = '<a id=\"' + moreid +
                //    '\" class=\"hint--right\" data-hint=\"ver todos\" style=\"\n    float: left;\n    margin-left: 8px;\n\    position: absolute;\n    height: 50px;\n    line-height: 50px;\n    cursor: pointer;\n"><img src=\"\/resources/images/iconos16/appbar.add.png\"><\/a>';

                //$('#' + container).append(fbtext);

                $.map(data.data, function (fbitem, index) {
                    var img = '';
                    console.log(fbitem);
                    if (fbitem.picture.data && fbitem.picture.data.url) {
                        img = fbitem.picture.data.url;
                    }
                    else { img = '/img/openmarket-logo-h-ma.png'; }
                    var friend =
                        {
                            name: fbitem.name,
                            id: fbitem.id,
                            image: img
                        }
                    friends.push(friend);

                    console.log(friend);
                    var rnd = '<li class=\"mensajett\" data-toggle=\"tooltip\" data-placement=\"top\" data-original-title=\"' + friend.name + '\"><img src=\"' + friend.image + '\"/></li>';
                    $('#' + container).append(rnd);

                    //if ((index < 5)) {
                    //    var rnd = '<li target=\"_blank\" class=\"hint--right\" data-hint=\"' +
                    //    friend.name + '\" href=\"http://facebook.com/' +
                    //    friend.id + '\">' +
                    //    '<img data-fbview="show" class=\"fbimage\" src=\"' + friend.image + '\"></li>';

                    //}


                });
            }
        }
    });
}

function switchcascade(matrix, index) {
    if (index < matrix.length) {
        var item = matrix[index];
        $(item).switchClass('fbimagehide', 'fbimage', 70, null,
                                        function () {
                                            $(this).effect('bounce');
                                            index++;
                                            switchcascade(matrix, index);
                                        });
    }
    else {

    }
}

function invertedswitchcascade(matrix, index) {
    if (index > -1) {
        var item = matrix[index];
        if ($(item).attr('data-fbview') == 'hide') {

            $(item).switchClass('fbimage', 'fbimagehide', 70, null,
                                            function () {
                                                //$(this).effect('bounce');
                                                index--;
                                                invertedswitchcascade(matrix, index);
                                            });

        }
        else {
            index--;
            invertedswitchcascade(matrix, index);
        }
    }
}

(function () {

}());


function sendRequestToRecipients() {
    var user_ids = document.getElementsByName("user_ids")[0].value;
    FB.ui({
        method: 'apprequests',
        message: 'Awesome Application try it once',
        to: user_ids
    }, requestCallback);
}

function sendRequestViaMultiFriendSelector() {
    FB.ui({
        method: 'apprequests',
        message: 'OpenMarket.travel - Registrate y empieza a hacer tu viaje a medida'
    }, requestCallback);
}

function requestCallback(response) {
    console.log(response);
    if (response.to != null && response.to.length > 0) {
        $.post('/Actions/InviteFBFriends', { fbids: response.to }, function (data) {
            if (data) {
                if (data.ResultOK) {
                    getMyProfile(function () {
                        showupdatingresults(data.Messages[0], true);
                    })
                }
                else { showupdatingresults(data.Messages[0], false); }
            }
            else {
                showupdatingresults('No se ha podido enviar invitacion... :(', false);
            }
        });
    }
    else {
        notify_warning('No has invitado a nadie...');
    }
}


function likeOpenMarket() {
    FB.api(
      'me/og.likes',
      'post',
      {
          object: "http://www.openmarket.travel"
      },
      function (response) {
          console.log(response);
      }
    );
}


function inviteFBfriends(callback) {
    FB.ui({
        method: 'apprequests',
        message: 'OpenMarket.travel - Registrate y haz tu viaje a medida.'
    }, callback);
}



//This method will load the values to the labels
function LoadValues(me) {
    if (me.name) {
        document.getElementById('displayname').innerHTML = me.name;
        document.getElementById('FBId').innerHTML = me.id;
        document.getElementById('DisplayEmail').innerHTML = me.email;


        document.getElementById('auth-loggedin').style.display = 'block';
    }
}



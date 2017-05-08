/**
 * This script is for demo not use in release
 */
//if (typeof mapStyle === 'undefined') {
    // the variable is undefined
    markerIcon = 'http://res.cloudinary.com/open-market-travel/image/upload/v1428573063/assets/marker-omt.png';
    markerIconSmall = 'http://res.cloudinary.com/open-market-travel/image/upload/assets/marker-small.png';
    markerPinSmall = 'http://res.cloudinary.com/open-market-travel/image/upload/v1446624238/yourttoo.com/marker-pin-yto.png';
    donutStrokeColor= "transparent";
    donutFillColor= "#CCCCCC";
    donutFillOpacity= 0.5;
    routeStrokeColor = "#CCCCCC";
    routeStrokeOpacity = 1.0;
    routeStrokeWeight = 2;
    mapStyle = [
    {
         "featureType": "administrative",
         "elementType": "geometry.fill",
         "stylers": [
            { "visibility": "off" }
         ]
       },
    {
         "featureType": "administrative",
         "elementType": "labels",
         "stylers": [
           { "visibility": "off" }
         ]
       },
  {
  "featureType":"water",
  "elementType":"all",
  "stylers":[
    {"hue":"#7fc8ed"},
    {"saturation":0},
    {"lightness":0},
    {"visibility":"simplified"}
    ]
  },
  {
  "featureType":"water",
  "elementType":"labels",
  "stylers":[
    {"visibility":"off"}
    ]
  },
  {
  "featureType":"landscape",
  "elementType":"all",
  "stylers":[
    {"hue":"#cccccc"},
    {"saturation":0},
    {"lightness":80},
    {"visibility":"simplified"}
    ]
  },{
  "featureType":"landscape",
  "elementType":"labels",
  "stylers":[
    {"visibility":"off"}
    ]
  },{
  "featureType": "road",
  "elementType": "geometry",
  "stylers":[
    {"hue":"#cccccc"},
    {"saturation":0},
    {"lightness":80},
    {"visibility":"off"}
    ]
  },{
  "featureType":"poi",
  "elementType":"all",
  "stylers":[
    {"hue":"#ffffff"},
    {"saturation":0},
    {"lightness":100},
    {"visibility":"off"}
    ]
  },{
  "featureType":"poi",
  "elementType":"labels",
  "stylers":[
    {"visibility":"off"}
    ]
  },{
  "featureType":"road.local",
  "elementType":"geometry",
  "stylers":[
    {"hue":"#cccccc"},
    {"saturation":0},
    {"lightness":100},
    {"visibility":"off"}
    ]
  },{
  "featureType":"transit",
  "elementType":"all",
  "stylers":[
    {"hue":"#cccccc"},
    {"saturation":0},
    {"lightness":69},
    {"visibility":"off"}
    ]
  },{
  "featureType":"administrative.locality",
  "elementType":"all",
  "stylers":[
    {"hue":"#cccccc"},
    {"saturation":0},
    {"lightness":19},
    {"visibility":"on"}
    ]
  },{
  "featureType":"road",
  "elementType":"labels",
  "stylers":[
    {"hue":"#cccccc"},
    {"saturation":50},
    {"lightness":100},
    {"visibility":"off"}
    ]
  },{
  "featureType":"road.arterial",
  "elementType":"labels",
  "stylers":[
    {"hue":"#cccccc"},
    {"saturation":-93},
    {"lightness":-2},
    {"visibility":"simplified"}
    ]
  },{
  "featureType": "administrative.country",
  "elementType": "labels.text.fill",
  "stylers": [
    { "visibility": "off" },
    { "lightness": 49 },
    { "visibility": "off" }
    ]
  },{
  "featureType": "administrative.country",
  "elementType": "geometry.stroke",
  "stylers": [
    { "visibility": "on" },
    { "lightness": 70 },
    { "visibility": "off" }
    ]
  },{
  "featureType": "administrative.province",
  "elementType": "geometry.stroke",
  "stylers": [
    { "visibility": "off" }
    ]
  },{
  "featureType": "administrative.locality",
  "elementType": "labels.text",
  "stylers": [
    {"visibility": "off"}
    ]
  },{
  "featureType": "administrative.province",
  "elementType": "labels.text",
  "stylers": [
    {"visibility": "off"}
    ]
  },{
  "featureType": "transit",
  "stylers": [
    { "visibility": "off" }
    ]
  }
];
// } else {
//   console.log('map brand styles loaded');
// }

var centerMap;
var zoom;

function initMap(markers, id) {
  console.log("initmap "+id);
  console.log("the markers are "+markers.length);

  if (id == null || id == undefined || id == ""){
    id = "map";
  }

    // bounds
    var bound = new google.maps.LatLngBounds();
    for (i = 0; i < markers.length; i++) {
      bound.extend( new google.maps.LatLng(markers[i].position.lat, markers[i].position.lng) );
    }
    // get center map
    centerMap = bound.getCenter();
    // Google maps options
    var myOptions = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false,
        mapTypeControl : false,
        scrollwheel: false,
        center: centerMap,
        styles: mapStyle,
        streetViewControl : false,
        maxZoom : 5
      };
    //set map
    map = new google.maps.Map(document.getElementById(id), myOptions);
    //console.log("map load ok")

    // fit map to markers
    map.fitBounds(bound);

    // avoid zooming too much when there is only one marker
    if (markers.length < 2) {
      var listener = google.maps.event.addListener(map, "idle", function() { 
        if (map.getZoom() > 8) map.setZoom(8); 
        google.maps.event.removeListener(listener); 
      });  
    }
   
     // avoid zooming too much when there is only one marker
    if (markers.length >= 5) {
      var listener = google.maps.event.addListener(map, "idle", function() { 
        //console.log("zoom is "+map.getZoom())
        map.setZoom(map.getZoom()+1); 
        google.maps.event.removeListener(listener); 
      });  
    }

    //custom icons
    var icon = markerPinSmall;

    for (var i = 0; i<markers.length; i++){
      var position = new google.maps.LatLng(markers[i].position.lat, markers[i].position.lng);
      // prepare content to display
      if (markers[i].city != undefined){
        labelContent = "<div class='map-label-title'><span class='map-label-city'>"+markers[i].city+"</span><br /> <span class='map-label-country'>"+markers[i].country+"</span></div><div class='map-marker-days'>"+markers[i].nights+"<br /><span><i class='fa fa-moon-o'></i></span></div>";
      } else{
        labelContent = '';
      }
      var marker = new MarkerWithLabel({
           position: position,
           map: map,
           icon: icon,
           labelContent: labelContent,
           labelAnchor: new google.maps.Point(156,43),
           labelClass: "map-label",
      });
    }

}

function delayedCall() {
    setTimeout(function(){
      var center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center);
    }, 2000);
}

delayedCall();

     


//centering map when resizing
google.maps.event.addDomListener(window, "resize", function() {
  try {
    var center = map.getCenter();
     google.maps.event.trigger(map, "resize");
     map.setCenter(center); 
  }catch(err) {
    console.log("get center map fail", err.message);
  }
});


//self executing function here
// (function() {
//  // google.maps.event.addDomListener(window, 'load', initMap);
//  initMap(markers);
// })();

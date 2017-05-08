var markerIcon = 'http://res.cloudinary.com/open-market-travel/image/upload/v1446545688/yourttoo.com/marker-yto.png';
var markerIconSmall = 'http://res.cloudinary.com/open-market-travel/image/upload/v1446545515/yourttoo.com/marker-small-yto.png';
var donutStrokeColor= "transparent";
var donutFillColor= "#CCCCCC";
var donutFillOpacity= 0.5;
var routeStrokeColor = "#f38000";
var routeStrokeOpacity = 1.0;
var routeStrokeWeight = 2;
var mapStyle = [
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
	"featureType":"landscape",
	"elementType":"all",
	"stylers":[
		{"hue":"#cccccc"},
		{"saturation":0},
		{"lightness":80},
		{"visibility":"simplified"}
		]
	},{
	"featureType": "road",
	"elementType": "geometry",
	"stylers":[
		{"hue":"#cccccc"},
		{"saturation":0},
		{"lightness":80},
		{"visibility":"simplified"}
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
		{ "lightness": 49 }
		]
	},{
	"featureType": "administrative.country",
	"elementType": "geometry.stroke",
	"stylers": [
		{ "visibility": "on" },
		{ "lightness": 70 }
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

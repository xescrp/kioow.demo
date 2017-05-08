var markerIcon = 'http://res.cloudinary.com/open-market-travel/image/upload/v1428573063/assets/marker-omt.png';
var markerIconSmall = 'http://res.cloudinary.com/open-market-travel/image/upload/assets/marker-small.png';
var donutStrokeColor= "transparent";
var donutFillColor= "#CCCCCC";
var donutFillOpacity= 0.5;
var routeStrokeColor = "#CCCCCC";
var routeStrokeOpacity = 1.0;
var routeStrokeWeight = 2;
var mapStyle = [
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [
      {
        "hue": "#309FD3"
      },
      {
        "saturation": -20
      },
      {
        "lightness": 0
      },
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
      {
        "hue": "#FFF9DF"
      },
      {
        "saturation": 100
      },
      {
        "lightness": 80
      },
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "hue": "#cccccc"
      },
      {
        "saturation": -93
      },
      {
        "lightness": 80
      },
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
        "hue": "#ffffff"
      },
      {
        "saturation": -100
      },
      {
        "lightness": 100
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      {
        "hue": "#cccccc"
      },
      {
        "saturation": -90
      },
      {
        "lightness": 100
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
      {
        "hue": "#cccccc"
      },
      {
        "saturation": 10
      },
      {
        "lightness": 69
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "all",
    "stylers": [
      {
        "hue": "#cccccc"
      },
      {
        "saturation": 7
      },
      {
        "lightness": 19
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "hue": "#cccccc"
      },
      {
        "saturation": 50
      },
      {
        "lightness": 100
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
      {
        "hue": "#cccccc"
      },
      {
        "saturation": -93
      },
      {
        "lightness": -2
      },
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "visibility": "off"
      },
      {
        "lightness": 49
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "lightness": 70
      },
      {
        "hue": "#1B5E7D"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "off"
      },
      {
        "lightness": 70
      },
      {
        "hue": "#1B5E7D"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];

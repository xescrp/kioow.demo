<!DOCTYPE html>
<html>
    <head>
        <title>product map</title>
        
        <style type="text/css">
            #map {
                height: 300px;
            }
        </style>
       <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyD-H5AvlatgN9nB8gXQvX64Gv7B0IaYyiE&libraries=places&sensor=false&language=es"></script>
        <!-- Tools -->
        <script src="/js/libs/markerwithlabel.js?v={? appversion ?}"></script>
        <script src="/js/mapstyles/{? site ?}.js?v={? appversion ?}"></script> 
        <script src="/js/libs/itinerarymap.js?v={? appversion ?}"></script>  
        <link href="/css/main.css?v={? appversion ?}" rel="stylesheet"/>

    <script type="text/javascript">
        var itinerary = {? itinerarymap | json | safe ?};

        var domReady = function(callback) {
            document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
        };
        domReady(function() {
            initMap(itinerary);
        });
    </script>
    </head>
    <body class="padded-zero">
        <!-- The element that will contain our Google Map. This is used in both the Javascript and CSS above. -->
        <div id="map"></div>
    </body>
</html>

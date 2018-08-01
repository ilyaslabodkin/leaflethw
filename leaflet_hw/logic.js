// Creating map object
var map = L.map("map", {
  center: [40.7128, -74.0059],
  zoom: 3
});

// Mapbox API
var mapbox = "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnVtYmFsb3JkIiwiYSI6ImNqaWNhZ2d1bjAxOHoza3BqcDQzMHR3Z3AifQ.KzBDaZozIdwa38NsQZslfw";

// Adding tile layer to the map
L.tileLayer(mapbox).addTo(map);

// Link to GeoJSON
 APILink ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

 d3.json(APILink, function(response)
 {
  console.log(response);
  for (var i = 0; i < response.features.length; i++) 
  {
    latitude=response.features[i].geometry.coordinates[1];
    longitude=response.features[i].geometry.coordinates[0];
       //console.log(response.features[i])
      // var marker=L.marker([latitude,longitude]).addTo(map);
      function getColor(d) {
        return d > 10 ? '#800026' :
               d > 8 ? '#BD0026' :
               d > 6  ? '#E31A1C' :
               d > 4 ? '#FC4E2A' :
               d > 2 ? '#FD8D3C' :
               d > 1   ? '#FEB24C' :
               d > 0   ? '#FED976' :
                          '#FFEDA0';
    };





      var circle = L.circle([latitude, longitude], {
        color: getColor(response.features[i].properties.mag),
        fillColor: getColor(response.features[i].properties.mag),
        fillOpacity: 0.5,
        radius: (response.features[i].properties.mag)*9000
    }).addTo(map).bindPopup(response.features[i].properties.title);;



  };
 });
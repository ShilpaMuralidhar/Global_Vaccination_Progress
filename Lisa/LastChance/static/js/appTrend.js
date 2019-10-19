
// Store our API endpoint inside queryUrl
var link ="static/data/ProductsByCounty.geojson";
var statesData ="static/data/statesData.geojson"

var map = L.map("map", {
  center: [37.09, -95.75],
  zoom: 5
});

var countries = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(map);



// Function that will determine the color of a COUNTY based on the CORN Bushels
function chooseColor(CORN) {
  if (CORN <= 0) {
      return "#808080";
  } else if (CORN <= 10000) {
      return "#7CFC00";
  }else if (CORN <= 50000) {
      return "#ADFF2F";
  } else if (CORN <= 100000) {
      return "#FFD700";
  } else if (CORN <= 150000) {
      return "#FFA500";
  } else if (CORN <= 200000) {
      return "#FF8C00";
  } else {
      return "#FF0000";
  };
}

// Grabbing our GeoJSON data..
d3.json(countries, function(data) {
  // Creating a geoJSON layer with the retrieved data
 //State lines layer
  L.geoJson(statesData,{
    style:function(){
      return{
        color:"black",
        fillColor:"gray",
        fillOpacity:0.1,
        weight: 2.5 
      };
    }
  }).addTo(map);

  //county layer
  L.geoJson(data, {
    // Style each feature (in this case a CORN)
    style: function(feature) {
      return {
        color: "black",
        // Call the chooseColor function to decide which color to color our CORN (color based on CNTYNAME)
        fillColor: chooseColor(feature.properties.CORN),
        fillOpacity: 0.4,
        weight: 1 
      };
    },


    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.7
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.4
          });
        },
        // When a feature (CORN) is clicked, it is enlarged to fit the screen
        click: function(event) {
          map.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h3>" + feature.properties.CNTYNAME +", " +feature.properties.STATE+"</h3>"
      + "<hr>" +"<h3> Acres: " + feature.properties.CORN + "</h3>");
    
  
    }

  }).addTo(map);

});

function init() {
  // Grab a reference to the dropdown select element
  var selectorVaccine = d3.select("#selVaccine");
  // Use the list of vaccine names to populate the select options
  d3.json("/vaccine_names").then((vaccines) => {
    vaccines.forEach((Vaccine) => {
      selectorVaccine
        .append("option")       
        .text(Vaccine)
        .property("value", Vaccine);
    });
    // // Use the first country/vaccine from the list to build the initial plots
    const firstVax = vaccines[0];
    currentVax = firstVax;
  
  var selectorCountry = d3.select("#selCountry");

  // Use the list of countries to populate the select options
  d3.json("/countries").then((countries) => {
    countries.forEach((Country) => {
      selectorCountry
        .append("option")       
        .property("value", Country)
        .text(Country);
    });
    // // Use the first sample from the list to build the initial plots
    const firstCountry = countries[0]; 
    // console.log("First Country ", firstCountry);
    currentCountry = firstCountry;
    // console.log("inside current country "+currentCountry)
  buildCharts(currentVax, currentCountry);
  // regressionChart(currentVax, currentCountry);
});
});
}

function vaxChanged(newVax) {
//   // Fetch new data each time a new sample is selected 
  currentVax = newVax;
  console.log("Function vaxChanged, newVax: "+newVax)
  buildCharts(newVax, currentCountry);
  // regressionChart(currentVax, currentCountry);
}

function countryChanged(newCountry){
  console.log("Function countryChanged, newCountry: "+newCountry)
  currentCountry = newCountry;
  buildCharts(currentVax, newCountry);
  // regressionChart(currentVax, currentCountry);
}

var currentCountry = "";
var currentVax = "";
// Initialize the dashboard
init();



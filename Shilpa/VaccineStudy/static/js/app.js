function buildMetadata(vaccine, country) {
    // url to point to app route
    var url = "/metadata/"+vaccine +"/"+country;
    console.log("this is the url ",url);
    //use d3.json to get metadata for selected sample
  }

function buildCharts(vax, country) {
  //Pie chart of sample data for selected subject
  //url for the sample
  var url = "/metadata/"+vax +"/"+country; 
  console.log("buildCharts, vax:" +vax+"country:" +country); 
  // console.log("URL: "+url);
  d3.json(url).then(function(selection) { 
    console.log(selection);    
    var year = [];
    var coverage = [];
     for (i = 0; i < selection.length;i++) {
       year.push(selection[i].Year);
       coverage.push(selection[i].Coverage);

    }
    // console.log("buildCharts, data from url: "+(selection));
    // console.log("buildCharts, data from url: "+selection[0].Country);
    // console.log("buildCharts year: " +year);
    trace = {
      x: year,
      y: coverage
    }
    dataPlot = [trace];
    var layout = {
      xaxis: {title:"Year",
        autotick: false,
        ticks: 'outside',
        tick0: 1980,
        dtick: 5,
        ticklen: 0,
        tickwidth: 0,
        tickcolor: '#000'},
      yaxis: {title:"Coverage",
      autotick: false,
      ticks: 'outside',
      tick0: 0,
      dtick: 20,
      ticklen: 0,
      tickwidth: 0,
      tickcolor: '#000'}

    }
    Plotly.newPlot("testchart",dataPlot,layout);
});

}

function init() {
  // Grab a reference to the dropdown select element
  var selectorVaccine = d3.select("#selVaccine");
  // Use the list of vaccine names to populate the select options
  d3.json("/vaccine_names").then((vaccines) => {
    console.log("init: vaccines="+vaccines);
    vaccines.forEach((Vaccine) => {
      selectorVaccine
        .append("option")       
        .text(Vaccine)
        .property("value", Vaccine);
    });
    // // Use the first sample from the list to build the initial plots
    const firstVax = vaccines[0];
    console.log("First Vaccine: "+firstVax)
    currentVax = firstVax;
    // console.log(`unique vaccines:  ${vaccines}`)
  
  var selectorCountry = d3.select("#selCountry");
  // Use the list of countries to populate the select options
  d3.json("/countries").then((countries) => {
    console.log("init: countries="+countries);
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
    console.log("init: currentVax="+currentVax+", currentCountry="+currentCountry);
    console.log("init: firstVax="+firstVax+", firstCountry="+firstCountry);
    console.log("init: vaccines[0]="+vaccines[0]+", countries[0]="+countries[0]);
  buildCharts(currentVax, currentCountry);
});
});
}

function vaxChanged(newVax) {
//   // Fetch new data each time a new sample is selected 
  currentVax = newVax;
  console.log("Function vaxChanged, newVax: "+newVax)
  buildCharts(newVax, currentCountry);
}

function countryChanged(newCountry){
  console.log("Function countryChanged, newCountry: "+newCountry)
  currentCountry = newCountry;
  buildCharts(currentVax, newCountry);
}

var currentCountry = "";
var currentVax = "";
// Initialize the dashboard
init();



function buildMetadata(vaccine, country) {
    // url to point to app route
    var urlVax = "/metadata/"+vaccine +"/"+country;
    var urlLife = "/countrydata/"+country;
    console.log("MetaData,vax data ",urlVax);
    console.log("MetaData,life data ",urlLife);
    //use d3.json to get metadata for selected sample
  }

function buildCharts(vax, country) {
  //Pie chart of sample data for selected subject
  //url for the sample
  var urlVax = "/metadata/"+vax +"/"+country;
  var urlLife= "/countrydata/"+country;
  console.log("buildCharts, vax:" +vax+"country:" +country);
  // console.log("URL: "+url);
  d3.json(urlVax).then(function(selection) {
    var year = [];
    var coverage = [];
     for (i = 0; i < selection.length;i++) {
       year.push(selection[i].Year);
       coverage.push(selection[i].Coverage);
    }

    // console.log("buildCharts, data from url: "+(selection));
    // console.log("buildCharts, data from url: "+selection[0].Country);
    // console.log("buildCharts year: " +year);
    traceVax = {
      x: year,
      y: coverage
    }
    vaxPlot = [traceVax];
    var layout = {
      xaxis: {title:"Year"},
      yaxis: {title:"Coverage"}
    }
    Plotly.newPlot("vaxChart",vaxPlot,layout);
  });

  d3.json(urlLife).then(function(selection) {
    var year = [];
    var lifeExp = [];
    var infMort = [];
     for (i = 0; i < selection.length;i++) {
       year.push(selection[i].Year);
       lifeExp.push(parseFloat(selection[i].Life_Expectancy));
       infMort.push(parseFloat(selection[i].Infant_Mortality));
    }
    console.log("buildCharts, urlLife, infMort: "+infMort);
    console.log("buildCharts, urlLife, lifeExp: "+lifeExp);
    console.log("buildCharts, urlLife, selection.Life:"+selection.Life_Expectancy)
    traceLife = {
      x: year,
      y: lifeExp
    }
    traceInf = {
      x: year,
      y:infMort
    }
    lifePlot = [traceLife,traceInf];
    var layout = {
      xaxis: {title:"Year"},
      yaxis: {title:"Life Expectancy"},
      yaxis2: {title:"Infant Mortality"}
    }
    Plotly.newPlot("lifeChart",lifePlot,layout);
  });

}


function regression(vax, country) {
  var urlReg = "/regression/"+vax +"/"+country;
  d3.json(urlReg).then(function(reg_result) {
    var vax_cov = reg_result.vax_cov;
    var life_exp = reg_result.life_exp;
    var inf_mort = reg_result.int_mort;
    var fit_string_life = `Life Expectancy = ${life_int} + ${life_slope}*Vaccination Coverage`;
    var fit_string_life_short = `L = ${life_int} + ${life_slope}*VC`;
    var fit_string_inf = `Infant Mortality = ${inf_int} + ${inf_slope}*Vaccination Coverage`;
    var fit_string_inf_short = `I = ${inf_int} + ${inf_slope}*VC`;
    var life_fit = reg_result.life_fit;
    var inf_fit = reg_result.inf_fit;
    var life_exp = reg_result.life_exp;
    var inf_mort = reg_result.inf_mort;

    var trace_life = { 
      x: vax_cov,
      y: life_exp,    
      mode: "markers"
      }
    var trace_life_fit = { 
      x: vax_cov,
      y: life_fit,
      mode: "lines" 

    }
    var trace_inf = { 
      x: vax_cov,
      y: inf_mort,
      mode: "markers"    
    }
    var trace_inf_fit = { 
    x: vax_cov,
    y: inf_fit,
    mode: "lines"    
    }

    lifeVaxPlot = [trace_life,trace_life_fit];
    var layout_life = {
      xaxis: {title:"Vaccination Coverage"},
      yaxis: {title:"Life Expectancy"}
    }
    lifeInfPlot = [trace_inf,trace_inf_fit];
    var layout_inf = {
      xaxis: {title:"Vaccination Coverage"},
      yaxis: {title:"Infant Mortality"}
    }
    Plotly.newPlot("lifeRegression",lifeVaxPlot,layout_life);
    Plotly.newPlot("infRegression",lifeVaxPlot,layout_life);

});
  
} 

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
    // // Use the first sample from the list to build the initial plots
    const firstVax = vaccines[0];
    console.log("First Vaccine: "+firstVax)
    currentVax = firstVax;
    // console.log(`unique vaccines:  ${vaccines}`)
  
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




//builds plots of regression analysis
function regressionChart(vaccine, country) {
  var urlReg = "/regression/lifeexpectancy/"+vaccine+"/"+country;
  d3.json(urlReg).then(function(reg_result) {
 
    var vax_cov = reg_result.vax_cov;
    var life_exp = reg_result.life_exp;
    // var fit_string_life = `Life Expectancy = ${reg_result.life_int.toFixed(2)} + ${reg_result.life_slope}*Vaccination Coverage`;
    var fit_string_life_short = `L = ${reg_result.life_int.toFixed(2)} + ${reg_result.life_slope.toFixed(2)}*VC`;
    var life_fit = reg_result.life_fit;
    var life_exp = reg_result.life_exp;
    var life_resid = reg_result.life_resid;

    // life expectancy regression fit plot
    var trace_life = { 
      x: vax_cov,
      y: life_exp,    
      mode: "markers",
      name: "Observed Life Expectancy"
      }
    var trace_life_fit = { 
      x: vax_cov,
      y: life_fit,
      mode: "lines",
      name: fit_string_life_short 

    }
    lifeVaxPlot = [trace_life,trace_life_fit];
    var layout_life = {
      title: "Life Expectancy Linear Regression Fit",
      xaxis: {title:"Vaccination Coverage"},
      yaxis: {title:"Life Expectancy"}
    }
    Plotly.newPlot("lifeRegression",lifeVaxPlot,layout_life);

    //life Expectancy residual plot 
    var trace_life_resid = { 
      x: life_resid,
      y: life_fit,    
      mode: "markers"
      }
    lifeResidPlot = [trace_life_resid];
    var layout_lifeResid = {
      title:"Life Expectancy Residual Plot",
      xaxis: {title:"Residuals(Observed -Predicted) "},
      yaxis: {title:"Predicted Life Expectancy"}
    }
    Plotly.newPlot("lifeResid",lifeResidPlot,layout_lifeResid);
    
    // life expectancy qq plot
    var trace_life_qq = { 
      x: reg_result.osm_qq_life,
      y: reg_result.osr_qq_life,    
      mode: "markers",
      name: "Quantiles"
      }
    var trace_life_fit_qq = { 
      x: reg_result.osm_qq_life,
      y: reg_result.qq_fit_life,
      mode: "lines" ,
      name: "Least Squares Fit"
    }
    lifeQQPlot = [trace_life_qq,trace_life_fit_qq];
    var layout_life_qq = {
      title: "Life Expectancy Normal Q-Q Plot",
      xaxis: {title:"Theoretical Quantiles"},
      yaxis: {title:"Sample Quantiles"}
    }
    Plotly.newPlot("lifeQQ",lifeQQPlot,layout_life_qq);
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
    currentCountry = firstCountry;
  regressionChart(currentVax, currentCountry);
});
});
}

function vaxChanged(newVax) {
//   // Fetch new data each time a new sample is selected 
  currentVax = newVax;
  console.log("Function vaxChanged, newVax: "+newVax)
  regressionChart(currentVax, currentCountry);
}

function countryChanged(newCountry){
  console.log("Function countryChanged, newCountry: "+newCountry)
  currentCountry = newCountry;
  regressionChart(currentVax, currentCountry);
}

var currentCountry = "";
var currentVax = "";
// Initialize the dashboard
init();



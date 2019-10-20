
//build charts for trends over time plots
function buildCharts(vax, country) {
  //url for the sample
  var urlVax = "/metadata/"+vax +"/"+country;
  var urlLife= "/countrydata/"+country;
  d3.json(urlVax).then(function(selection) {
    var year = [];
    var coverage = [];
     for (i = 0; i < selection.length;i++) {
       year.push(selection[i].Year);
       coverage.push(selection[i].Coverage);
    }
    traceVax = {
      x: year,
      y: coverage
    }
    vaxPlot = [traceVax];
    var layout = {
      title: "Vaccination Coverage",
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

    traceLife = {
      x: year,
      y: lifeExp,
      name: "Life Expectancy"
    }
    traceInf = {
      x: year,
      y:infMort,
      yaxis: 'y2',
      name: "Infant Mortality"
    }
    lifePlot = [traceLife,traceInf];
    var layout = {
      title: "Life Expectancy and Infant Mortality",
      margin: {
        l: 50, r: 100, b: 50, t: 50, pad: 2
      },
      xaxis: {title:"Year"},
      yaxis: {title:"Life Expectancy"},
      yaxis2: {
        title:"Infant Mortality",
        overlaying: 'y',
        side: 'right'}
    }
    Plotly.newPlot("lifeChart",lifePlot,layout);
  });

}

//builds plots of regression analysis
function regressionChart(vaccine, country) {
  var urlReg = "/regression/"+vaccine+"/"+country;
  d3.json(urlReg).then(function(reg_result) {
    var vax_cov = reg_result.vax_cov;
    var life_exp = reg_result.life_exp;
    var inf_mort = reg_result.int_mort;
    var fit_string_life = `Life Expectancy = ${reg_result.life_int} + ${reg_result.life_slope}*Vaccination Coverage`;
    var fit_string_life_short = `L = ${reg_result.life_int} + ${reg_result.life_slope}*VC`;
    var fit_string_inf = `Infant Mortality = ${reg_result.inf_int} + ${reg_result.inf_slope}*Vaccination Coverage`;
    var fit_string_inf_short = `I = ${reg_result.inf_int} + ${reg_result.inf_slope}*VC`;
    var life_fit = reg_result.life_fit;
    var inf_fit = reg_result.inf_fit;
    var life_exp = reg_result.life_exp;
    var inf_mort = reg_result.inf_mort;
    var life_resid = reg_result.life_resid;
    var inf_resid = reg_result.inf_resid;

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
      title: "Life Expectancy Liean Regression Fit",
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

    // Infant mortality regression fit plot
    var trace_inf = { 
      x: vax_cov,
      y: inf_mort,
      mode: "markers",
      name: "Observed Infant Mortality"    
    }
    var trace_inf_fit = { 
    x: vax_cov,
    y: inf_fit,
    mode: "lines",
    name: fit_string_inf_short    
    }

    infVaxPlot = [trace_inf,trace_inf_fit];
    var layout_inf = {
      title:"Infant Mortality Linear Regression Fit",
      xaxis: {title:"Vaccination Coverage"},
      yaxis: {title:"Infant Mortality"}
    }
    
    Plotly.newPlot("infRegression",infVaxPlot,layout_inf);

    //infant mortality residual plot 
    var trace_inf_resid = { 
      x: inf_resid,
      y: inf_fit,    
      mode: "markers"
      }
    infResidPlot = [trace_inf_resid];
    var layout_infResid = {
      title:"Infant Mortality Residual Plot",
      xaxis: {title:"Residuals(Observed -Predicted) "},
      yaxis: {title:"Predicted Infant Mortality"}
    }
    Plotly.newPlot("infResid",infResidPlot,layout_infResid);




        // inf qq plot
        var trace_inf_qq = { 
          x: reg_result.osm_qq_inf,
          y: reg_result.osr_qq_inf,    
          mode: "markers",
          name: "Quantiles"
          }
        var trace_inf_fit_qq = { 
          x: reg_result.osm_qq_inf,
          y: reg_result.qq_fit_inf,
          mode: "lines", 
          name: "Least Squares Fit"
        }
        infQQPlot = [trace_inf_qq,trace_inf_fit_qq];
        var layout_inf_qq = {
          title: "Infant Mortality Normal Q-Q Plot",
          xaxis: {title:"Theoretical Quantiles"},
          yaxis: {title:"Sample Quantiles"}
        }
        Plotly.newPlot("infQQ",infQQPlot,layout_inf_qq);

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
    // console.log("First Country ", firstCountry);
    currentCountry = firstCountry;
    // console.log("inside current country "+currentCountry)
  buildCharts(currentVax, currentCountry);
  regressionChart(currentVax, currentCountry);
});
});
}

function vaxChanged(newVax) {
//   // Fetch new data each time a new sample is selected 
  currentVax = newVax;
  console.log("Function vaxChanged, newVax: "+newVax)
  buildCharts(newVax, currentCountry);
  regressionChart(currentVax, currentCountry);
}

function countryChanged(newCountry){
  console.log("Function countryChanged, newCountry: "+newCountry)
  currentCountry = newCountry;
  buildCharts(currentVax, newCountry);
  regressionChart(currentVax, currentCountry);
}

var currentCountry = "";
var currentVax = "";
// Initialize the dashboard
init();



import os

import pandas as pd
import numpy as np
from scipy import stats

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
# import VaxRegression

app = Flask(__name__)


#################################################
# Database Setup
#################################################

postgresURI = "postgres://trszpzmvozxxfa:4837915234eabffbb990eda4721662850ebcf9e07fc119c3fe994db385f04f6f@ec2-54-83-33-14.compute-1.amazonaws.com:5432/dcnno5op1g262"

app.config["SQLALCHEMY_DATABASE_URI"] = postgresURI
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table #
Vaccines = Base.classes.wuenic
Life = Base.classes.infexpmort

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/vaccine_names")
def names():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(Vaccines).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    vaccines = df["Vaccine"].unique()
    # Return a list of the vaccine names
    return jsonify(list(vaccines))

@app.route("/countries")
def countrynames():
    """Return a list of countries."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(Vaccines).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    countries = df["Country"].unique()
    # Return a list of the vaccine names
    return jsonify(list(countries))

@app.route("/metadata/<vaccine>/<country>")
def vaccine_metadata(vaccine, country):
    """Return the MetaData for a given vaccine."""
    print(vaccine)
    print(country)
    selVax = [
        Vaccines.Vaccine,
        Vaccines.Country,
        Vaccines.Year,
        Vaccines.Coverage
    ]

    resultsVax = db.session.query(*selVax).filter(Vaccines.Vaccine == vaccine).filter(Vaccines.Country == country).all()
    
    # print(results)

    # Create alist of dictionaries for each row of metadata information
    vaxItems = []
    
    for result in resultsVax:
        vaccine_metadata = {}
        vaccine_metadata["Vaccine"] = result[0]
        vaccine_metadata["Country"] = result[1]
        vaccine_metadata["Year"] = result[2]
        vaccine_metadata["Coverage"] = result[3]
        vaxItems.append(vaccine_metadata)

    return jsonify(vaxItems)

@app.route("/countrydata/<country>")
def countrydata(country):
    """Return the MetaData for a given vaccine."""

    selLife = [
        Life.Country,
        Life.Year,
        Life.Life_Expectancy,
        Life.Infant_Mortality
    ]
    resultsLife = db.session.query(*selLife).filter(Life.Country == country).all()
    
    # print(resultsLife)

    # Create alist of dictionaries for each row of metadata information
    lifeItems = []
    
    for result in resultsLife:
        countrydata = {}
        countrydata["Country"] = result[0]
        countrydata["Year"] = result[1]
        countrydata["Life_Expectancy"] = str(result[2])
        countrydata["Infant_Mortality"] = str(result[3])
        lifeItems.append(countrydata)

    # print(items)
    return jsonify(lifeItems)


#create route for regression data
@app.route("/regression/<vaccine>/<country>")
def regressionfit(vaccine, country):
    """Returns the fit of life expectancy and infant mortality."""

    #pull and merge vaccination and life expectancy data
    sel = [Life.Country, Life.Year, Life.Index, Life.Life_Expectancy, Life.Infant_Mortality, 
    Vaccines.Vaccine, Vaccines.Life_Index, Vaccines.Index, Vaccines.Coverage]

    session =Session(db.engine)
    Vax_life = session.query(*sel).filter(Vaccines.Life_Index == Life.Index).all()
    session.close()

    #organize the list of tuples into a collection of list an zip into a dataframe
    countryTup = []
    yearTup = []
    lifExpTup = []
    infMortTup = []
    vaxTup = []
    covTup = []
    for tup in Vax_life:
        countryTup.append(tup[0])
        yearTup.append(tup[1])
        if str(tup[3]) == 'None':
            lifExpTup.append(np.nan)
        else:
            lifExpTup.append(float(str(tup[3])))
        if str(tup[4]) == 'None':
            infMortTup.append(np.nan)
        else:
            infMortTup.append(float(str(tup[4])))
        vaxTup.append(tup[5])
        if str(tup[8]) == 'None':
            covTup.append(np.nan)
        else:
            covTup.append(float(str(tup[8])))
    tup_df = pd.DataFrame(zip(countryTup, yearTup, lifExpTup, infMortTup, vaxTup, covTup), columns = ["Country","Year","Life_Expectancy","Infant_Mortality","Vaccine","Coverage"])

    #filter the data on selected country and vaccination
    vax_life_country = tup_df[tup_df["Country"] == country]
    vax_life_country_vax = vax_life_country[vax_life_country["Vaccine"] == vaccine]
    #remove missing data
    vax_life_country_vax = vax_life_country_vax.dropna()

    #define series for regresion analysis
    life_exp = vax_life_country_vax["Life_Expectancy"]
    inf_mort = vax_life_country_vax["Infant_Mortality"]
    vax_cov = vax_life_country_vax["Coverage"]

    #regress life_exp = m*vax_cov + b
    life_slope, life_int, life_r, life_p, life_std_err = stats.linregress(
        vax_cov, life_exp)
    life_fit = life_slope * vax_cov + life_int
    life_resid = life_exp - life_fit
    (osm_qq_life,osr_qq_life),(slope_qq_life, int_qq_life, r_qq_life)  = stats.probplot(life_exp)
    qq_fit_life = slope_qq_life*osm_qq_life+int_qq_life



    #regress inf_mort = m*vax_cov + b
    inf_slope,inf_int, inf_r, inf_p, inf_std_err = stats.linregress(
        vax_cov, inf_mort)
    inf_fit = inf_slope * vax_cov + inf_int
    inf_resid = inf_mort- inf_fit

    (osm_qq_inf,osr_qq_inf),(slope_qq_inf, int_qq_inf, r_qq_inf)  = stats.probplot(inf_mort)
    qq_fit_inf = slope_qq_inf*osm_qq_inf+int_qq_inf


    #collect regression results in a dictionary
    result = {
    "vax_cov": vax_cov.to_list(),
    "life_exp": life_exp.to_list(),
    "inf_mort": inf_mort.to_list(),
    "life_slope": life_slope, 
    "life_int": life_int, 
    "life_r": life_r, 
    "life_p": life_p, 
    "life_std_err": life_std_err,
    "life_fit": life_fit.to_list(),
    "life_resid": life_resid.to_list(),
    "osm_qq_life": osm_qq_life.tolist(),
    "osr_qq_life": osr_qq_life.tolist(),
    "slope_qq_life": slope_qq_life,
    "int_qq_life": int_qq_life,
    "r_qq_life": r_qq_life,
    "qq_fit_life": qq_fit_life.tolist(),
    "inf_slope": inf_slope, 
    "inf_int": inf_int, 
    "inf_r": inf_r, 
    "inf_p": inf_p, 
    "inf_std_err": inf_std_err,
    "inf_fit": inf_fit.to_list(),
    "inf_resid": inf_resid.to_list(),
    "osm_qq_inf": osm_qq_inf.tolist(),
    "osr_qq_inf": osr_qq_inf.tolist(),
    "slope_qq_inf": slope_qq_inf,
    "int_qq_inf": int_qq_inf,
    "r_qq_inf": r_qq_inf,
    "qq_fit_inf": qq_fit_inf.tolist()}
    return jsonify(result)

if __name__ == "__main__":
    #when you upload to heroku, take out debug
    app.run(debug = True, port = 5044)
    # app.run()

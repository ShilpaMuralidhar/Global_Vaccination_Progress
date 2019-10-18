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

# Save references to each table
Vaccines = Base.classes.wuenic
Life = Base.classes.infexpmort

#create route for regression data
# @app.route("/regression/<vaccine>/<country>")
# def regressionfit(vax, country):
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

country = "Afghanistan"
vax = "BCG"

#filter the data on selected country and vaccination
vax_life_country = tup_df[tup_df["Country"] == country]
vax_life_country_vax = vax_life_country[vax_life_country["Vaccine"] == vax]
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
print(life_slope)

#regress inf_mort = m*vax_cov + b
inf_slope,inf_int, inf_r, inf_p, inf_std_err = stats.linregress(
    vax_cov, inf_mort)
inf_fit = inf_slope * vax_cov + inf_int
print(inf_slope)

#collect regression results in a dictionary
regression_result = {
  "vax_cov": vax_cov.to_list(),
  "life_exp": life_exp.to_list(),
  "inf_mort": inf_mort.to_list(),
  "life_slope": life_slope, 
  "life_int": life_int, 
  "life_r": life_r, 
  "life_p": life_p, 
  "life_std_err": life_std_err,
  "life_fit": life_fit.to_list(),
  "inf_slope": inf_slope, 
  "inf_int": inf_int, 
  "inf_r": inf_r, 
  "inf_p": inf_p, 
  "inf_std_err": inf_std_err,
  "inf_fit": inf_fit.to_list() }
print(regression_result)

return(jsonify(regression_result))
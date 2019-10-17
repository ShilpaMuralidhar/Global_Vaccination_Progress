import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

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


# #     # Use Pandas to perform the sql query
# stmt = db.session.query(Vaccines).statement
# df = pd.read_sql_query(stmt, db.session.bind)
# vac = df["Vaccine"].unique()
# for v in vac:
#     print(v)



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

# vaccine = "DTP1"
@app.route("/metadata/<vaccine>/<country>")
def vaccine_metadata(vaccine, country):
    """Return the MetaData for a given vaccine."""
    print(vaccine)
    print(country)
    sel = [
        Vaccines.Vaccine,
        Vaccines.Country,
        Vaccines.Year,
        Vaccines.Coverage
    ]

    results = db.session.query(*sel).filter(Vaccines.Vaccine == vaccine).filter(Vaccines.Country == country).all()
    print(results)

    # Create a dictionary entry for each row of metadata information
    items = []
    
    for result in results:
        vaccine_metadata = {}
        vaccine_metadata["Vaccine"] = result[0]
        vaccine_metadata["Country"] = result[1]
        vaccine_metadata["Year"] = result[2]
        vaccine_metadata["Coverage"] = result[3]
        items.append(vaccine_metadata)

    # print(items)
    return jsonify(items)


# @app.route("/samples/<sample>")
# def samples(sample):
#     """Return `otu_ids`, `otu_labels`,and `sample_values`."""
#     stmt = db.session.query(Samples).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Filter the data based on the sample number and
#     # only keep rows with values above 1
#     sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]

#     # Sort by sample
#     sample_data.sort_values(by=sample, ascending=False, inplace=True)

#     # Format the data to send as json
#     data = {
#         "otu_ids": sample_data.otu_id.values.tolist(),
#         "sample_values": sample_data[sample].values.tolist(),
#         "otu_labels": sample_data.otu_label.tolist(),
#     }
#     return jsonify(data)


if __name__ == "__main__":
    #when you upload to heroku, take out debug
    app.run(debug = True, port = 5044)
    # app.run()

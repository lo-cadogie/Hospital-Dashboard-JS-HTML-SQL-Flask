import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import datetime as dt
from flask import Flask, jsonify

#  #nick said we only need this if we use sqlalchemy
#engine = '' #UPDATE TO THE CODE BELOW
# engine = create_engine(sqlite://Resources/FILENAME.sqlite)


# reflect an existing database into a new model
#Base = automap_base() #nick said we only need this if we use sqlalchemy
# reflect the tables #nick said we only need this if we use sqlalchemy
#Base.prepare(autoload_with=engine) #nick said we only need this if we use sqlalchemy

# Save reference to the table
#Passenger = Base.classes.test
# Other Examples from SQLalchemy challenge
#station = Base.classes.station
#measurement = Base.classes.measurement

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/names<br/>"
        f"/api/v1.0/passengers"
    )

if __name__ == '__main__':
    app.run()

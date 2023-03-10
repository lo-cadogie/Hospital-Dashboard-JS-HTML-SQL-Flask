
#################################################
# Imports
#################################################
 
from flask import Flask, jsonify, render_template
import sqlite3
from flask_cors import CORS, cross_origin
#****

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

# Database set-up
engine = create_engine("sqlite:///Hospital_Boarding.sqlite")

# Reflect an existing database into a new model
Base = automap_base()

# Reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
wait_month = Base.classes.wait_times_month
wait_day = Base.classes.wait_times_day
disposition = Base.classes.admit_v_transfer

#*****

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
db_locale = 'Hospital_Boarding.sqlite'

cors = CORS(app)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return render_template('index.html')

@app.route("/map")
def map():
    return render_template('map.html')

@app.route("/tables")
def home_page():
    hospital_table = query_hospital_table()
    admit_details_table = query_admit_details_table()
    return render_template('tables.html', hospital_table = hospital_table, admit_details_table = admit_details_table)

def query_hospital_table():
    con = sqlite3.connect(db_locale)
    c = con.cursor()
    c.execute('''
    SELECT * FROM hospitals
    ''')
    hospital_data = c.fetchall()
    return hospital_data

def query_admit_details_table():
    con = sqlite3.connect(db_locale)
    c = con.cursor()
    c.execute('''
    SELECT * FROM admit_details
    ''')
    admit_details_data = c.fetchall()
    return admit_details_data



#**

# Data route 
@app.route("/data")

# Publish data
def query():
    
    # Create our session (link) from Python to the DB
    session = Session(engine)  

    #Query table
    waitxmonth_query = session.query(wait_month.hospital_code, wait_month.year_month, wait_month.mean_wait, wait_month.City,\
        wait_month.Latitude, wait_month.Longitude).all()
    waitxday_query = session.query(wait_day.hospital_code, wait_day.year_month, wait_day.date, \
        wait_day.mean_wait, wait_day.City, wait_day.Latitude, wait_day.Longitude).all()
    disposition_query = session.query(disposition.hospital_code, disposition.year, disposition.disposition, \
        disposition.count).all()

    # Close session
    session.close()

    # Create list of dictionaries for monthly data
    month_list = []
    month_dict = {}
    for row in waitxmonth_query:
        month_dict['hospital_code'] = row[0]
        month_dict['year_month'] = row[1]
        mean_wait = float(row[2])
        month_dict['mean_wait'] = mean_wait
        month_dict['City'] = row[3]
        lat = str(row[4])
        month_dict['Latitude'] = lat
        lon = str(row[5])
        month_dict['Longitude'] = lon
        month_list.append(month_dict.copy())

    # Create list of dictionaries for daily data
    day_list = []
    day_dict = {}
    for row in waitxday_query:
        day_dict['hospital_code'] = row[0]
        day_dict['year_month'] = row[1]
        day_dict['date'] = row[2]
        mean_wait = str(row[3])
        day_dict['mean_wait'] = mean_wait
        day_dict['City'] = row[4]
        lat = str(row[5])
        day_dict['Latitude'] = lat
        lon = str(row[6])
        day_dict['Longitude'] = lon
        day_list.append(day_dict.copy())

    # Create list of dictionaries for disposition data
    disp_list = []
    disp_dict = {}
    for row in disposition_query:
        disp_dict['hospital_code'] = row[0]
        disp_dict['year'] = row[1]
        disp_dict['disposition'] = row[2]
        count = int(row[3])
        disp_dict['count'] = count
        disp_list.append(disp_dict.copy())

    data_dict = {'monthly_data': month_list, 'daily_data': day_list, 'disp_data': disp_list}
    return jsonify(data_dict)

#**


if __name__ == '__main__':
    app.run()

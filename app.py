
#################################################
# Imports
#################################################
 
from flask import Flask, jsonify, render_template
import sqlite3


#################################################
# Flask Setup
#################################################
app = Flask(__name__)
db_locale = 'Hospital_Boarding.db'

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/tables<br/>"
        f"/error_page_do_not_go_to"
    )

@app.route("/tables")
def home_page():
    hospital_table = query_hospital_table()
    admit_details_table = query_admit_details_table()
    return render_template('Index.html', hospital_table = hospital_table, admit_details_table = admit_details_table)

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

@app.route("/error_page_do_not_go_to")
def why_page():
    return "why would you do such a thing?"

if __name__ == '__main__':
    app.run()

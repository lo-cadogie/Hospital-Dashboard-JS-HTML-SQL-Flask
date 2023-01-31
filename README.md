# Project-3 | Hospital Boarding

## Project Background
Hospital boarding has been an issue since for the Emergency Departments since prior to COVID, but has increased significantly with the tridemic that we are currently facing.  Hospital boarding is defined as the time the Emergency Department physician has placed has determined a care plan - to the time  a patient is admitted to the hospital or transfered to another level of care.

### Project Team
    - Edith Lotterman
    - Lauren Cadogan
    - Will Dickerson
    - Megan Blazevic

### Technology Used
    - SQLITE
    - Pandas
    - D3
    - Plotly
    - GeoJason
    - JavaScript

## Project Overview 
Create a data visualization tool that would present boarding times in the hospital. This would be helpful for hospital administration to understand the problem.  Data dives could help understand any patterns in regards to boarding. 

## Data Set
Actual data from 11 hospitals.  Patient identifiers and hospital names have been removed to ensure patient confidentiality.  

Data was pulled from the patient charts from a data vendor.  Patient identifiers were removed.  Hospital data that had time buckets and patient counts of admitted were provided.  Another data set included 2 years of site specific data specific information for each patient that was admitted or transfered from the Emergency Department. 

## Data & Delivery
Data was cleaned to ensure complete data sets
    - Hospital
    - Visit Date
    - How long they boarded
    - Admit, Transfer status
Python was utilized to perform some data aggregations and ultimately data was upladed int a SQLite database. 

## Back End
Our data was uploaded to a render page. Render site has muiltiple pages; a main page with the index and charts; a map page; and then our data tables.

## Visualizations
Charts and graphs were created to showcase the hospital boarding.  
  #### Drop Down
  We create a drop down that would allow us to select which hospital you wanted to view the data set from.
  #### Pie Chart
  The pie chart showcases the boarding patient and what percent of them were waiting to be admitted to the hospital, or waiting on a transfer to another level of care at a different location.
  #### Bar Charts
  We had 2 bar charts. The first bar chart shows the mean wait time for the selected hospital month over month.  The secont bar chart shows the mean wait time by day at that hospital site. 
  #### Map
  Our map shows the hospital locations throughout the state of Minnesota.  When you click on the marker, it gives you additioanl detail.
    - Hospital Location via city
    - Total Boarding Hours for the hospital
    - Total number of days boarding
    - The Average number of hours per boarding patient. 

## Future Adjustments
- More complex data aggrigations.
- Adding a filter button for the user to determine the length of time that boarding 'starts'.  Ex. my system, we recognize boarding for a patient that has been in the Emergency Department 240 minutes or more.
- Visutalistions showing the boarding times per month for all sites (bubble chart).
- Line charts that could overlay multiple hospitals at once.  This way you could see if there are similarities in practices for the mroe rural sites. 



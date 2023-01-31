// Data
let url = "https://project-3-ovr7.onrender.com/data"

// Function that pulls data and creates charts

d3.json(url).then(data => {
    console.log(data);

    // Creating function to build charts
    function getCharts(selHosp) {

        
        // Create plot variables
        let selYear = '2022'
        let beginMonth = '2022-01'
        let endMonth = '2022-12'
        let beginDate = '2022-11-01'
        let endDate = '2022-12-31'
    
        // Display pie chart of admits versus transfers      
        // Create filter function and filter dispositions
        function selectPie(record) {
            return record.hospital_code == selHosp && record.year == selYear;
        };
        let pieFilterData = data.disp_data.filter(selectPie);
        console.log(pieFilterData)
        // pie chart data
        let pieData = [{
            values: pieFilterData.map((patient) => {return patient.count}),
            labels: pieFilterData.map((patient) => {return patient.disposition}),
            type: "pie"
        }];
          
        // pie chart layout
        let layout = {
            height: 450,
            width: 600
        };
          
        Plotly.newPlot("pie", pieData, layout);

        // Display bar chart of monthly mean wait times
        // filter data
        function selectMonthBar(record) {
            return record.hospital_code == selHosp && record.year_month >= beginMonth && record.year_month <= endMonth;
        };
        let monthBarFilterData = data.monthly_data.filter(selectMonthBar);
                
        // Populate bar chart
        let trace1 = {
            x: monthBarFilterData.map((month) => {return month.year_month}),
            y: monthBarFilterData.map((waits) => {return waits.mean_wait}),
            type: 'bar',
        };
        
        // Data array
        let dataTrace1 = [trace1];
        
        // Month bar  char layout
        let layout1 = {
            height: 450,
            width: 600,
            margin: {
                l: 100,
                r: 10,
                t: 10,
                b: 10
            } 
        };
        
        // Render the bar chart to the div tag with id "monthly_bar"
        Plotly.newPlot("monthly_bar", dataTrace1, layout1);

        // Display bar chart of daily mean wait times
        // filter data
        function selectDayBar(record) {
            return record.hospital_code == selHosp && record.date >=beginDate && record.year_month <= endDate;
        };
        let dayBarFilterData = data.daily_data.filter(selectDayBar);

        // Populate data for daily bar chart
        let trace2 = {
            x: dayBarFilterData.map((day) => {return day.date}),
            y: dayBarFilterData.map((waits) => {return waits.mean_wait}),
            type: 'bar',
        };
        
        // Data array
        let dataTrace2 = [trace2];
        
        // Format bar chart
        let layout2 = {
            height: 450,
            width: 600,
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            } 
        };
        
        // Render the bar chart to the div tag with id "daily_bar"
        Plotly.newPlot("daily_bar", dataTrace2, layout2);
    };    


    function optionHospChanged(selHosp) {
        getCharts(selHosp);
    };

    // Initialize function
    function init() {
    
        // select dropdown menu
        let hospDropDown = d3.select("#selHospDataset");
           
        // pull data for drop-downs
        let dropDownData = data.monthly_data;
        
        // populate hospital code in the hospital dropdwown menu
        let hospUnique = [...new Set(dropDownData.map((hosp) => hosp.hospital_code))];
        hospUnique.forEach(function(code) {
            hospDropDown.append("option").text(code).property("value", code);
        });

        // call the function to display the data and the plots to the page
        getCharts(hospUnique[0]);
    
    };

    init()
});


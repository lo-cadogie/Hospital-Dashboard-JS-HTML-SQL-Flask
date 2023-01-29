// // Set url for data retrieval
// let url = "https://project-3-ovr7.onrender.com/data"

// // Fetch the JSON data and console log it
// d3.json(url).then(function(data) {
//     console.log(data);
    
//     console.log(data.daily_data[0]);
//     console.log(data.disp_data[0]);
//     console.log(data.monthly_data[0]);

//     // set variables for filter 
//     let selHosp = 'all'
//     let selYear = '2022'
//     let beginMonth = '2022-01'
//     let endMonth = '2022-12'
//     let beginDate = '2022-11-01'
//     let endDate = '2022-12-31'

//     // Display default pie chart      
//     // Create filter function and filter dispositions
//     function selectPie(record) {
//         return record.hospital_code == selHosp && record.year == selYear;
//     };
//     let pieFilterData = data.disp_data.filter(selectPie);

//     let pieData = [{
//         values: pieFilterData.map((patient) => {return patient.count}),
//         labels: pieFilterData.map((patient) => {return patient.disposition}),
//         type: "pie"
//     }];
          
//     let layout = {
//         height: 600,
//         width: 800
//     };
          
//     Plotly.newPlot("pie", pieData, layout);
  
//     // Display default monthly plot
//     function selectMonthBar(record) {
//         return record.hospital_code == selHosp && record.year_month >=beginMonth && record.year_month <= endMonth;
//     };
//     let monthBarFilterData = data.monthly_data.filter(selectMonthBar);

//     // Populate bar chart
//     let trace1 = {
//         x: monthBarFilterData.map((month) => {return month.year_month}),
//         y: monthBarFilterData.map((waits) => {return waits.mean_wait}),
//         type: 'bar',
//     };
        
//     // Data array
//     let dataTrace1 = [trace1];
        
//     // Format bar chart
//     let layout1 = {
            
//         margin: {
//             l: 100,
//             r: 100,
//             t: 100,
//             b: 100
//         } 
//     };
        
//     // Render the bar chart to the div tag with id "bar"
//     Plotly.newPlot("monthly_bar", dataTrace1, layout1);

//     // Display default daily plot
//     function selectDayBar(record) {
//         return record.hospital_code == selHosp && record.date >=beginDate && record.year_month <= endDate;
//     };
//     let dayBarFilterData = data.daily_data.filter(selectDayBar);

//     // Populate bar chart
//     let trace2 = {
//         x: dayBarFilterData.map((day) => {return day.date}),
//         y: dayBarFilterData.map((waits) => {return waits.mean_wait}),
//         type: 'bar',
//     };
        
//     // Data array
//     let dataTrace2 = [trace2];
        
//     // Format bar chart
//     let layout2 = {
            
//         margin: {
//             l: 100,
//             r: 100,
//             t: 100,
//             b: 100
//         } 
//     };
        
//     // Render the bar chart to the div tag with id "bar"
//     Plotly.newPlot("daily_bar", dataTrace2, layout2);

//     // Display default daily plot
//     function selectDayBar(record) {
//         return record.hospital_code == selHosp && record.date >=beginDate && record.year_month <= endDate;
//     };
// });

// Creating function to build charts
function getCharts(selHosp) {
    // Get data
    d3.json("../data/data.json").then((data)=> {
        console.log(data)
    
        // Create plot variables
        let selYear = '2022'
        let beginMonth = '2022-01'
        let endMonth = '2022-12'
        let beginDate = '2022-01-01'
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
            height: 600,
            width: 800
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
            
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
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
            
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            } 
        };
        
        // Render the bar chart to the div tag with id "daily_bar"
        Plotly.newPlot("daily_bar", dataTrace2, layout2);
        });    
    };
    function optionHospChanged(selHosp) {
    getCharts(selHosp);
    };
function init() {
    
    // select dropdown menu
    let hospDropDown = d3.select("#selHospDataset");
    
    // Fetch the JSON data
    d3.json("../data/data.json").then((data)=> {
        
        // pull data for drop-downs
        let dropDownData = data.monthly_data;
        
        // populate hospital code in the hospital dropdwown menu
        let hospUnique = [...new Set(dropDownData.map((hosp) => hosp.hospital_code))];
        hospUnique.forEach(function(code) {
            hospDropDown.append("option").text(code).property("value", code);
        });
    getCharts(hospUnique[0]);
    });
};
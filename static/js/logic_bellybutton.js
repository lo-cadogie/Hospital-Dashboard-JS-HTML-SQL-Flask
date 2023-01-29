//set URL
let url = "https://project-3-ovr7.onrender.com/data"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
  
  console.log(data.daily_data[0]);
  console.log(data.disp_data[0]);
  console.log(data.monthly_data[0]);

  // set variables for filter 
  let selHosp = 'all'
  let selYear = '2022'
  let beginMonth = '2022-01'
  let endMonth = '2022-12'
  let beginDate = '2022-11-01'
  let endDate = '2022-12-31'

// UPDATE THE INFROAMTION FOR THE DROP DOWN SELECTOR - OPTIONS COULD BE MONTH AND/OR HOSPITAL

// user to select number from dropdown
function init() {
    var selector = d3.select("selHosp");
  d3.json(url).then((data) => { var hospital_code; sampleNames.forEach((sample) => {
    selector
      .append("option")
      .text(sample)
      .property("value", sample);
  });

  // Use the first sample from the list to build the initial plots
  const firstSample = sampleNames[0];
    buildMetadata(firstSample);
    buildCharts(firstSample);
    // buildGaugeChart(firstSample)
  });
};

// obtain new data each time new subject is selected 
function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
  // buildGaugeChart(newSample);
};



// Populate bar chart
let LayoutBubble = {
  margin: { t: 0 },
  xaxis: { title: "Day", color: "navy", style: "bold"},
  yaxis: { title: "Time", color: "navy", style: "bold"},
  hovermode: "closest",
};
      
var DataBubble = [ 
  {
    x: dayBubble.month,
    y: dayBubble.waits,
    text: dayBubble.hospital_code,
    mode: "markers",
    marker: {
      color: dayBubble.month,
      size: dayBubble.waits,
    },
  },
];  
          
// Render the bar chart to the div tag with id "bar"
Plotly.newPlot("bubble", DataBubble, LayoutBubble);
});
// // Initialize the dashboard
// init();


// NEED TO ADD THE JSON FILE NAME (STORE IN THE DATA FILE - THIS IS THE SAMPLES.JSON FILE REPLACEMENT
// NEED TO ADJUST THE METADATA TITLES
//otuID FILE, NEED TO DETERMINE BEST WAY TO READ - MONTH, DAY, HOSPITAL, ETC...THIS WILL DRVIE GAUGE AND CHART DESIGN, AND DATA QUERY

// URL functions
// let monthly_data_url = "https://project-3-ovr7.onrender.com/monthly_data"
// let daily_data_url = "https://project-3-ovr7.onrender.com/daily_data"
// let disposition_data_url = "https://project-3-ovr7.onrender.com/disposition_data"
//let data_url = "https://project-3-ovr7.onrender.com/data"

// // GAUGE CHART - NEED TO UPDATE THE COLOR BUCKETS (TIME /9) GUESSED ON USING THE HOUR BUCKETS FROM THE DAY DATA, MARRON IS THE WORST

// // Color palette for Gauge Chart
// let arrColorsG = ["maroon", "red", "orange", "yellow", " green", "blue", "teal", "purple", "navy", "white"];

// function buildMetadata(sample) {
//   d3.json("trial.js").then((data) => {
//     let metadata= data.daily_data;
//     let resultsarray= metadata.filter(sampleobject => sampleobject.city == sample);
//     let result= resultsarray[0]
//     let panel = d3.select("#sample-metadata");
//     //used to clear exisiting metadata
//     panel.html("");
//     Object.entries(result).forEach(([key, value]) => {
//       panel.append("h6").text(`${key}: ${value}`);
//     });
//   });
// };

// // //build a gauge chart
// function buildGaugeChart(sample) {
//   console.log("sample", sample);
//   d3.json("trial.js").then(data =>{
//     let objs = data.metadata;
//     let matchedSampleObj = objs.filter(sampleData => sampleData["id"] === parseInt(sample));
//     gaugeChart(matchedSampleObj[0]);
//  });   
// };

// // function gaugeChart(data) {
// //   console.log("gaugeChart", data);
// //   if(data.wfreq === null){
// //     data.wfreq = 0;
// //   };
// //   let degree = parseInt(data.wfreq) * (180/10);

// //   // math for meter
// //   let degrees = 180 - degree;
// //   let radius = .5;
// //   let radians = degrees * Math.PI / 180;
// //   let x = radius * Math.cos(radians);
// //   let y = radius * Math.sin(radians);

// //   let mainPath = 'M -.0 -0.025 L .0 0.025 L ',
// //     pathX = String(x),
// //     space = ' ',
// //     pathY = String(y),
// //     pathEnd = ' Z';
// //   let path = mainPath.concat(pathX, space, pathY, pathEnd);
  
// //   let trace = [{ type: 'scatter',
// //     x: [0], y:[0],
// //       marker: {size: 5, color:'dark gray'},
// //       showlegend: false,
// //       name: 'WASH FREQ',
// //       text: data.wfreq,
// //       hoverinfo: 'text+name'},
// //       {values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
// //       rotation: 90,
// // // ADJUST TEXT BUCKETS 
// //       text: ['>48', '36-48', '24-36', '12-24', '10-12', '8-10', '6-8', '4-6', '2-4',''],
// //       textinfo: 'text',
// //       textposition:'inside',
// //       textfont:{
// //         size : 12,
// //       },
// //       marker: {colors:[...arrColorsG]},
// // // ADJUST TEXT BUCKETS 
// //       labels: ['>48 hrs', '36-48 hrs', '24-36 hrs', '12-24 hrs', '10-12 hrs', '8-10 hrs', '6-8 hrs', '4-6 hrs', '2-4 hrs',''],
// //        hoverinfo: 'text',
// //        hole: .375,
// //        type: 'pie',
// //        showlegend: false
// //     }];

// //   let layout = {
// //     shapes:[{
// //         type: 'path',
// //         path: path,
// //         fillcolor: 'navy',
// //         line: {
// //           color: 'navy'
// //         }
// //     }],
// // // TITLE FOR GAUGE
// //     title: 'Washing Frequency',
// //     height: 600,
// //     width: 600,
// //     xaxis: {zeroline:false, showticklabels:false, showgrid: false, range: [-1, 1]},
// //     yaxis: {zeroline:false, showticklabels:false, showgrid: false, range: [-1, 1]},
// //   };

// //   Plotly.newPlot('gauge', trace, layout, {responsive: true});
// // };


// NEED TO ADJUST THESE SAMEPLE NAMES BASED OFF OF THE DATA FIELDS THAT  HAVE IN MY JSON FILE

// function buildMetadata(sample) {
//   d3.json("trial.js").then((data) => {
//     let metadata= data.daily_data;
//     let resultsarray= metadata.filter(sampleobject => sampleobject.city == sample);
//     let result= resultsarray[0]
//     let panel = d3.select("mean_wait");
//     //used to clear exisiting metadata
//     panel.html("");
//     Object.entries(result).forEach(([key, value]) => {
//       panel.append("h6").text(`${key}: ${value}`);
//     });
//   });
// };


// // build charts using d3.json to get the sample data 
// function buildCharts(sample) {
//   d3.json("trial.js").then((data) => {
//     var samples= data.samples;
//     var resultsarray= samples.filter(sampleobject => sampleobject.id == sample);
//     var result= resultsarray[0];
//     var ids = result.hospital_code;
//     var labels = result.year_month;
//     var values = result.mean_wait;
//   })};


// JUST KEEPING FOR THE MOMENT, BUT THIS IS THE CODE FOR THE BUBBLE CHART WHICH IS MOST LIKELY NOT NEEDED.  
// IF THERE IS TIME, COULD LOOK AT A BUBBLE CHART BY MONTH OR BY DAY ON SOMETHING.

  //  // build a bubble chart
  //   var LayoutBubble = {
  //     margin: { t: 0 },
  //     xaxis: { title: "OTU ID", color: "navy", style: "bold"},
  //     yaxis: { title: "Sample Values", color: "navy", style: "bold"},
  //     hovermode: "closest",
  //   };
  
  //   var DataBubble = [ 
  //     {
  //       x: data.ids,
  //       y: data.values,
  //       text: labels,
  //       mode: "markers",
  //       marker: {
  //         color: ids,
  //         size: values,
  //       },
  //     },
  //   ];
  
  //   Plotly.newPlot("bubble", DataBubble, LayoutBubble);
 

// BAR CHART INFORMATION HERE. WANTING TO KEEP THIS ONE. WILL NEED TO RELABEL THE TITLE AND ROWS 

//   // build a bar chart
//     var bar_data = [
//       {
//         y:mean_wait.slice(0, 12).map(mean_wait => `Hospital ${mean_wait}`).reverse(),
//         x:values.slice(0,12).reverse(),
//         type:"bar",
//         orientation:"h",
//       },
//     ];
  
//     var barLayout = {
// // TITLE
//       title: "Mean Wait time By Month By Hospital",
//       margin: { t: 25, l: 125 }
//     };
  
//     Plotly.newPlot("bar", bar_data, barLayout);
// //   });
// // };

// ADDING POLAR AREAR CHART INFORAMTION 



// UPDATE THE INFROAMTION FOR THE DROP DOWN SELECTOR - OPTIONS COULD BE MONTH AND/OR HOSPITAL

// // user to select number from dropdown
// function init() {
//     var selector = d3.select("#selDataset");
//   d3.json("trial.js").then((data) => { var hospital_code; sampleNames.forEach((sample) => {
//     selector
//       .append("option")
//       .text(sample)
//       .property("value", sample);
//   });

//   // Use the first sample from the list to build the initial plots
//   const firstSample = sampleNames[0];
//     buildMetadata(firstSample);
//     buildCharts(firstSample);
//     // buildGaugeChart(firstSample)
//   });
// };

// // obtain new data each time new subject is selected 
// function optionChanged(newSample) {
//   buildMetadata(newSample);
//   buildCharts(newSample);
//   // buildGaugeChart(newSample);
// };

// // Initialize the dashboard
// init();

// // read in the data
// const data = "https://project-3-ovr7.onrender.com/data";

// d3.json(data).then(function(data) {
//   console.log(data);
// });

// // build a bar chart with the hospital data
// // let hospital_A = response;

// let trace1 = {
//   x:data.monthly_data,
//   y:data.monthly_data,
//   mode: "markers",
//   marker: {
//     size: data.monthly_data,
//     color: data.monthly_data,
//     colorscale: "Earth",
//     type: "heatmap",
//   },
//   text: data.monthly_data,
// };

// let hospital = [trace1];
// let layout = {
//   title: "Mean Wait times at Hospital",
//   xaxis: {
//     title: "Year_Month"
//   },
//   yaxis: {
//     title: "Median Time (in hours)"
//   },
// };

// Plotly.newPlot('bubble', data, layout);

// // // Initializes the page with a default plot
// // function init() {
// //   data = [{
// //     x: [data.year_month],
// //     y: [data.mean_wait]
// //   }];
// //   plotly.newPlot("plot", data);
// // }

// // // Call updatePlotly() when a change takes place to the DOM
// // d3.selectAll("#selDataset").on("change", updatePlotly);

// // // This function is called when a dropdown menu item is selected
// // function updatePlotly() {
// //   // Use D3 to select the dropdown menu
// //   let dropdownMenu = d3.select("#selDataset");
// //   // Assign the value of the dropdown menu option to a variable
// //   let dataset = dropdownMenu.property("value");

// //   // Initialize x and y arrays
// //   let x = [];
// //   let y = [];

// //   if (dataset === 'hospital_A') {
// //     x = [data.year_month];
// //     y = [data.mean_wait];
// //   }

// //   else if (dataset === 'hosptial_B') {
// //     x = [data.year_month];
// //     y = [data.mean_wait];
// //   }

// //   // Note the extra brackets around 'x' and 'y'
// //   Plotly.restyle("plot", "x", [x]);
// //   Plotly.restyle("plot", "y", [y]);
// // }

// // init();


// // let hospital_A = Object.values(trial.city.Bemidji);

// // console.log(hospital_A)
// // // Create an array of category labels
// // let labels = Object.keys(data.hospital_A);

// // // Display the default plot
// // function init() {
// //   let data = [{
// //     values: hospital_A,
// //     labels: labels,
// //     type: "bar"
// //   }];

// //   let layout = {
// //     height: 600,
// //     width: 800
// //   };

// //   Plotly.newPlot("bar", data, layout);
// // 

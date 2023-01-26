// NEED TO ADD THE JSON FILE NAME (STORE IN THE DATA FILE - THIS IS THE SAMPLES.JSON FILE REPLACEMENT
// NEED TO ADJUST THE METADATA TITLES
//otuID file name


// GAUGE CHART - NEED TO UPDATE THE COLOR BUCKETS (TIME /9) GUESSED ON USING THE HOUR BUCKETS FROM THE DAY DATA, MARRON IS THE WORST

// Color palette for Gauge Chart
let arrColorsG = ["maroon", "red", "orange", "yellow", " green", "blue", "teal", "purple", "navy", "white"];

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    let metadata= data.metadata;
    let resultsarray= metadata.filter(sampleobject => sampleobject.id == sample);
    let result= resultsarray[0]
    let panel = d3.select("#sample-metadata");
    //used to clear exisiting metadata
    panel.html("");
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });
  });
};

//build a gauge chart
function buildGaugeChart(sample) {
  console.log("sample", sample);
  d3.json("samples.json").then(data =>{
    let objs = data.metadata;
    let matchedSampleObj = objs.filter(sampleData => sampleData["id"] === parseInt(sample));
    gaugeChart(matchedSampleObj[0]);
 });   
};

function gaugeChart(data) {
  console.log("gaugeChart", data);
  if(data.wfreq === null){
    data.wfreq = 0;
  };
  let degree = parseInt(data.wfreq) * (180/10);

  // math for meter
  let degrees = 180 - degree;
  let radius = .5;
  let radians = degrees * Math.PI / 180;
  let x = radius * Math.cos(radians);
  let y = radius * Math.sin(radians);

  let mainPath = 'M -.0 -0.025 L .0 0.025 L ',
    pathX = String(x),
    space = ' ',
    pathY = String(y),
    pathEnd = ' Z';
  let path = mainPath.concat(pathX, space, pathY, pathEnd);
  
  let trace = [{ type: 'scatter',
    x: [0], y:[0],
      marker: {size: 5, color:'dark gray'},
      showlegend: false,
      name: 'WASH FREQ',
      text: data.wfreq,
      hoverinfo: 'text+name'},
      {values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
      rotation: 90,
// ADJUST TEXT BUCKETS 
      text: ['>48', '36-48', '24-36', '12-24', '10-12', '8-10', '6-8', '4-6', '2-4',''],
      textinfo: 'text',
      textposition:'inside',
      textfont:{
        size : 12,
      },
      marker: {colors:[...arrColorsG]},
// ADJUST TEXT BUCKETS 
      labels: ['>48 hrs', '36-48 hrs', '24-36 hrs', '12-24 hrs', '10-12 hrs', '8-10 hrs', '6-8 hrs', '4-6 hrs', '2-4 hrs',''],
       hoverinfo: 'text',
       hole: .375,
       type: 'pie',
       showlegend: false
    }];

  let layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: 'navy',
        line: {
          color: 'navy'
        }
    }],
// TITLE FOR GAUGE
    title: 'Washing Frequency',
    height: 600,
    width: 600,
    xaxis: {zeroline:false, showticklabels:false, showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false, showgrid: false, range: [-1, 1]},
  };

  Plotly.newPlot('gauge', trace, layout, {responsive: true});
};


// NEED TO ADJUST THESE SAMEPLE NAMES BASED OFF OF THE DATA FIELDS THAT  HAVE IN MY JSON FILE

// build charts using d3.json to get the sample data 
function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples= data.samples;
    var resultsarray= samples.filter(sampleobject => sampleobject.id == sample);
    var result= resultsarray[0];
    var ids = result.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;
  


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
  //       x: ids,
  //       y: values,
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

  // build a bar chart
    var bar_data = [
      {
        y:ids.slice(0, 11).map(otuID => `OTU ${otuID}`).reverse(),
        x:values.slice(0,11).reverse(),
        type:"bar",
        orientation:"h",
      },
    ];
  
    var barLayout = {
// TITLE
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 25, l: 125 }
    };
  
    Plotly.newPlot("bar", bar_data, barLayout);
  });
};

// ADDING POLAR AREAR CHART INFORAMTION 






// UPDATE THE INFROAMTION FOR THE DROP DOWN SELECTOR - OPTIONS COULD BE MONTH AND/OR HOSPITAL

// user to select number from dropdown
function init() {
    var selector = d3.select("#selDataset");
  d3.json("samples.json").then((data) => { var sampleNames = data.names; sampleNames.forEach((sample) => {
    selector
      .append("option")
      .text(sample)
      .property("value", sample);
  });

  // Use the first sample from the list to build the initial plots
  const firstSample = sampleNames[0];
    buildMetadata(firstSample);
    buildCharts(firstSample);
    buildGaugeChart(firstSample)
  });
};

// obtain new data each time new subject is selected 
function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
  buildGaugeChart(newSample);
};

// Initialize the dashboard
init();
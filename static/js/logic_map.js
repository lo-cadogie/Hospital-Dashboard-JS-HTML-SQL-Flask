// Creating the map object
let myMap = L.map("map-id", {
  center: [46.6030, -94.3094],
  zoom: 7
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// access data
d3.json("../data/data.json").then(data => {

  // Loop through data
  let city = "city"
  let location = []
  let latitude = location[1];
  let longitude = location[0];
  console.log(location)
});

  // An array containing each city's name, location, and population
  let hospitals = [{
    location: [47.4785418,-94.8907869],
    name: "Hospital A",
    city: "Bemidiji",
    hours: 15775,
    days: 657.30,
    hrsboarder: 8.85
  },
  {
    location: [48.905266,-95.314404],
    name: "Hospital B",
    city: "Warroad",
    hours: 1398,
    days: 58.62,
    hrsboarder: 9.17
    },
  {
    location: [45.8769031,-93.2938352],
    name: "Hospital C",
    city: "Mora",
    hours: 2055,
    days: 85.62,
    hrsboarder: 9.17
  },
  {
    location: [44.9497487,-93.0931028],
    name: "Hospital D",
    city: "Saint Paul",
    hours: 34493,
    days: 1437.19,
    hrsboarder: 6.90
  },
  {
    location: [44.9772995,-93.2654692],
    name: "Hospital E",
    city: "Minneapolis",
    hours: 74487,
    days: 3103.61,
    hrsboarder: 9.47
  },
  {
    location: [47.2372,-93.5302],
    name: "Hospital F",
    city: "Grand Rapids",
    hours: 62984,
    days: 2624.35,
    hrsboarder: 11.15
  },
  {
    location: [45.5579,-94.1632],
    name: "Hospital G",
    city: "Saint Cloud",
    hours: 62713,
    days: 2613.04,
    hrsboarder: 10.15
  },
  {
    location: [43.9986,-96.312],
    name: "Hospital H",
    city: "Pipestone",
    hours: 1621,
    days: 67.55,
    hrsboarder: 8.62
  },
  {
    location: [46.7867,-92.1005],
    name: "Hospital I",
    city: "Duluth",
    hours: 58784,
    days: 2449.34,
    hrsboarder: 8.41
  },
  {
    location: [45.6747,-94.80752],
    name: "Hospital J",
    city: "Melrose",
    hours: 23414,
    days: 975.58,
    hrsboarder: 11.29
  },
  {
    location: [44.1636,-93.9994],
    name: "Hospital K",
    city: "Mankato",
    hours: 65155,
    days: 2714.79,
    hrsboarder: 9.27
  },
  ];
  
  //Looping through the cities array, create one marker for each city, bind a popup containing its name and population, and add it to the map.
  for (var i = 0; i < hospitals.length; i++) {
    let hospital = hospitals[i];
    L.marker(hospital.location)
      .bindPopup(`<h1>${hospital.name}</h1><hr><h2>${hospital.city}</h2><hr><h2>Total Boarding Hours ${hospital.hours.toLocaleString()}</h2><hr>
      <h2>Total Boarding by Days ${hospital.days.toLocaleString()}</h2>
      <hr><h2>Average Number of Boarding Hours per Boarder ${hospital.hrsboarder.toLocaleString()}</h2>`)
      .addTo(myMap);
  };  

  // create info title
  let info = L.control({position: "topleft"});

  // Define function when info is added
  info.onAdd = function() {
    let div = L.DomUtil.create("div", "info");
    let title = "<h1>Hospital Boarding</h1><hr><h2>2022 Hospital Boarding, more than 240 minutes</h2>";
    div.innerHTML = title;
    return div;
  };

//Add Info title to the map
info.addTo(myMap);
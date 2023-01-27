// Creating the map object
let myMap = L.map("map-id", {
  center: [46.6030, -94.3094],
  zoom: 8
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//create the query URL for the data pull
let monthly_data_url = "https://project-3-ovr7.onrender.com/monthly_data"

// access data from the link
d3.json(monthly_data_url).then(data => {
  console.log("hello");

  // // // Loop through data
  // for (let i = 0; i < 100 ; i++) {
  //   let hospital = [latitude, longitude],
  //   // let latitude = coordinates[1];
  //   // let longitude = coordinates[0];
    
});

  // An array containing each city's name, location, and population
  let hospitals = [{
    location: [47.4785418,-94.8907869],
    name: "Hospital A",
    city: "Bemidiji",
    boarding: 8550405
  },
  {
    location: [48.905266,-95.314404],
    name: "Hospital B",
    city: "Warroad",
    boarding: 2720546
  },
  {
    location: [45.8769031,-93.2938352],
    name: "Hospital C",
    city: "Mora",
    boarding: 2296224
  },
  {
    location: [44.9497487,-93.0931028],
    name: "Hospital D",
    city: "Saint Paul",
    boarding: 3971883
  },
  {
    location: [44.9772995,-93.2654692],
    name: "Hospital E",
    city: "Minneapolis",
    boarding: 446599
  },
  {
    location: [47.2372,-93.5302],
    name: "Hospital F",
    city: "Grand Rapids",
    boarding: 446599
  },
  {
    location: [45.5579,-94.1632],
    name: "Hospital G",
    city: "Saint Cloud",
    boarding: 446599
  },
  {
    location: [43.9986,-96.312],
    name: "Hospital H",
    city: "Pipestone",
    boarding: 446599
  },
  {
    location: [46.7867,-92.1005],
    name: "Hospital I",
    city: "Minneapolis",
    boarding: 446599
  },
  {
    location: [45.6747,-94.80752],
    name: "Hospital J",
    city: "Melrose",
    boarding: 446599
  },
  {
    location: [44.1636,-93.9994],
    name: "Hospital K",
    city: "Mankato",
    boarding: 446599
  }
  ];
  
  //Looping through the cities array, create one marker for each city, bind a popup containing its name and population, and add it to the map.
  for (var i = 0; i < hospitals.length; i++) {
    let hospital = hospitals[i];
    L.marker(hospital.location)
      .bindPopup(`<h1>${hospital.name}</h1><hr><h2>${hospital.city}</h2><hr><h2>Boarding (average per patient) ${hospital.boarding.toLocaleString()}</h2>`)
      .addTo(myMap);
  };  

  // create info title
  let info = L.control({position: "topright"});

  // Define function when info is added
  info.onAdd = function() {
    let div = L.DomUtil.create("div", "info");
    let title = "<h1>Hospital Boarding</h1>"
    div.innerHTML = title;
    return div;
  };

//Add Info title to the map
info.addTo(myMap);
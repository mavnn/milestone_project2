
/* 
create_data.js loads hard data and create and instantiate obejects :

    Object: Building    ---- > instiated object: bldgDiversey
    Object: Loan        -----> instiated object: divLoan
    Object: Tenant      -----> instiated object: tenants
    Object: Rent        -----> instiated object: rents
    Object: Expenses    -----> instiated object: expenses

Diversey is an name of fictional building..

There are also a place holder function for loading and store objects
in local storage.


fuctions:

    roundToTwo(num)  takes a number num and rounds decimal place to signifcant digits.
    storeDataLocal() stores object into local browser specific storage
    getDataLocal() retrieves ojbect from local browser specific storage

*/

const MODEL_YEARS = 5;   // sets the number of fiscal years in the financial model
 
 // The Building object defines basic information a particular property.
 
function Building(bldgName, stAddress, city, state, zip, country, purchasePrice,
    purchaseDate, improvements, closingCosts, terminalCap, bldgSize) {
    this.bldgName = bldgName;       // simple name
    this.stAddress = stAddress;     // street address
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.country = country;
    this.purchasePrice = purchasePrice;  // price paid for the property
    this.purchaseDate = purchaseDate;   // date of purchase
    this.improvements = improvements;   // cost of improvements, repairs and other necessary capital investments
    this.closingCosts = closingCosts;   // property closing costs 
    this.terminalCap = terminalCap;     // cap rate to calculate potential sale price 
    this.bldgSize = bldgSize;           // size in SF
}

// set bldgDiversey data
{
    var bldgDiversey = new Building();
    bldgDiversey.bldgName = "Workshop 4200";
    bldgDiversey.stAddress = "4200 W Diversey Ave";
    bldgDiversey.city = "Chicago";
    bldgDiversey.state = "Il";
    bldgDiversey.zip = "60639";
    bldgDiversey.country = "USA";
    bldgDiversey.purchasePrice = 4100000;
    bldgDiversey.purchaseDate = "03/15/2017";
    bldgDiversey.improvements = 1200000;
    bldgDiversey.closingCosts = bldgDiversey.purchasePrice * .02;
    bldgDiversey.terminalCap = .065;
    bldgDiversey.bldgSize = 50000;
}

// ****
// MJN example added:
var bldgDiversey2 =
  new Building("Workshop 4200", "4200 W Diversey Ave", "Chicago",
               "Il", "60639", "USA", 4100000, "03/15/2017", 1200000,
               4100000 * .02, .065, 50000);

// OR
var bldgDiversey3 =
  {
      "bldgName" : "Workshop 4200",
      "stAddress" : "4200 W Diversey Ave",
      "city" : "Chicago",
      "state" : "Il",
      "zip" : "60639",
      "country" : "USA",
      "purchasePrice" : 4100000,
      "purchaseDate" : "03/15/2017",
      "improvements" : 1200000,
      "closingCosts" : bldgDiversey.purchasePrice * .02,
      "terminalCap" : .065,
      "bldgSize" : 50000
  };
// ****


// Building Tenants and rent data.  In a final projects
// tenant object would be part of buildings object.

function Loan(loan, rate, amort) {
    this.loan = loan;
    this.rate = rate;
    this.amort = amort;
}

var divLoan = new Loan();
divLoan.loan = .75 * bldgDiversey.purchasePrice;
divLoan.rate = .04;
divLoan.amort = 25;


function Tenant(name, unit_size, rents) {
    this.name = name;
    this.unit_size = unit_size;
    this.rents = rents;
}

function Rent(startDate, endDate, monthlyRent) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.monthlyRent = monthlyRent;
}
// Function takes floating point number and rounds to two digits.
// the numbers being rounded are currency.

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

// ****
// MJN: using indexes is fine with hardcoded data,
// but in general with arrays you want to "push" and "pop"
// values from them.
function addRent(tenant, rent) {
  tenant.rents.push(rent);
}
// ****

// builds data for two tenants, as per the specification
// Tenant 1 hard coded data
{
  var tenants = [];

  var baseRent = 44166;

  var tenant1 = new Tenant("Furniture", 20000, []);

  for (var i = 0; i < 6; i++) {
    var start = new Date("04/01/" + (2016 + i));
    var end = new Date("03/31/" + (2017 + i));
    var amount = roundToTwo(baseRent * Math.pow(1.025, i));
    addRent(tenant1, new Rent(start, end, amount));
  }

  tenants.push(tenant1);
}


// Tenant 2 hard coded data
{
    tenants[1] = new Tenant();
    tenants[1].name = "Distillery";
    tenants[1].unit_size = 30000;
    tenants[1].rents = [];

    //rent year 1
    tenants[1].rents[0] = new Rent();
    tenants[1].rents[0].startDate = new Date("06/01/2016");
    tenants[1].rents[0].endDate = new Date("05/31/2017");
    tenants[1].rents[0].monthlyRent = 44000;

    // rent year 2
    //add roundings........
    tenants[1].rents[1] = new Rent();
    tenants[1].rents[1].startDate = new Date("06/01/2017");
    tenants[1].rents[1].endDate = new Date("05/31/2018");
    tenants[1].rents[1].monthlyRent = roundToTwo(tenants[1].rents[0].monthlyRent * 1.025);

    // rent year 3
    //add rounding..............
    tenants[1].rents[2] = new Rent();
    tenants[1].rents[2].startDate = new Date("06/01/2018");
    tenants[1].rents[2].endDate = new Date("05/31/2019");
    tenants[1].rents[2].monthlyRent = roundToTwo(tenants[1].rents[1].monthlyRent * 1.025);

    // rent year 4
    //add rounding..............
    tenants[1].rents[3] = new Rent();
    tenants[1].rents[3].startDate = new Date("06/01/2019");
    tenants[1].rents[3].endDate = new Date("05/31/2020");
    tenants[1].rents[3].monthlyRent = roundToTwo(tenants[1].rents[2].monthlyRent * 1.025);


    // rent year 5
    //add rounding..............
    tenants[1].rents[4] = new Rent();
    tenants[1].rents[4].startDate = new Date("06/01/2020");
    tenants[1].rents[4].endDate = new Date("05/31/2021");
    tenants[1].rents[4].monthlyRent = roundToTwo(tenants[1].rents[3].monthlyRent * 1.025);


   // rent year 6
    //add rounding..............
    tenants[1].rents[5] = new Rent();
    tenants[1].rents[5].startDate = new Date("06/01/2021");
    tenants[1].rents[5].endDate = new Date("05/31/2022");
    tenants[1].rents[5].monthlyRent = roundToTwo(tenants[1].rents[4].monthlyRent * 1.025);
    
    tenants[1].rents[6] = new Rent();
    tenants[1].rents[6].startDate = new Date("06/01/2022");
    tenants[1].rents[6].endDate = new Date("05/31/2023");
    tenants[1].rents[6].monthlyRent = roundToTwo(tenants[1].rents[5].monthlyRent * 1.025);
}


// Create Expenses and hardcoded data.

function Expenses(tax, utilities, repairs, landscaping, management, leasing) {
    this.tax = tax;
    this.utilities = utilities;
    this.repairs = repairs;
    this.landscaping = landscaping;
    this.management = management;
    this.leasing = leasing;
} {
    var expenses = new Expenses();
    expenses.tax = 100000;
    expenses.utilities = 12500;
    expenses.repairs = 12500
    expenses.landscaping = 5000;
    expenses.management = 7500;
    expenses.leasing = 7500;
}



// Store Store objects.  These functions need to be updated
// they were built using a test object and need to modified to support current objects.

function storeDataLocal() {
    console.log("button pressed");
    var myObj = JSON.stringify(building);
    localStorage.setItem("building", myObj);
    console.log("stored data");
    alert("Building stored")
}


    // Retrieve Data objects
    function getDataLocal() {
        text = localStorage.getItem("building");
        building = JSON.parse(text);
        alert("retrieved Building")
    };

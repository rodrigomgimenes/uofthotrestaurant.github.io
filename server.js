// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// "/public" allows accessibility to all js/html/images/css files 
app.use(express.static(__dirname + '/public'));

// Reservations - Table & Wait List (DATA)
// =============================================================
  var tables   = [
    {
      routeName: "rodrigomgimenes",
      fullname:  "Rodrigo M Gimenes",
      uniqueid:  "7956bfd8-8653-716e-b717-cc9794b24349",
      email:     "rodrigo@email.com",
      telephone: "1112345678",
      npeople:   "2"
    }
  ]; 
  var waitlist = [
    {
      routeName: "rodrigogimenes",
      fullname:  "Rodrigo Gimenes",
      uniqueid:  "20d3e302-0dc6-ff69-ad3f-eeac783b2be9",
      email:     "rodrigo@email.com",
      telephone: "1112345678",
      npeople:   "4+"
    }
  ]; 

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/make", function(req, res) {
  res.sendFile(path.join(__dirname, "make.html"));
});

// Displays all reservations
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays all waiting list reservations
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

// Displays a single ID, or returns false
// app.get("/api/characters/:character", function(req, res) {
//   var chosen = req.params.character;

//   console.log(chosen);

//   for (var i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
// });

// Displays available tables
app.get("/api/tables/length", function(req, res) {
  // console.log(`REAL NUMBER OF TABLE = ${5 - tables.length}`)
  return res.json(5 - tables.length);
});

// Create New Reservations - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  let newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newReservation
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.routeName = newReservation.fullname.replace(/\s+/g, "").toLowerCase();

  console.log(`[SERVER.js - POST = "/api/tables"] Creating new reservation:  ${newReservation}`);

  // Verify if there are tables availables
  tables.length < 5 ? tables.push(newReservation) : waitlist.push(newReservation);

  return res.json(5 - tables.length);
});

app.post("/api/tables/clear", function(req, res) {
  tables.splice(0, tables.length);
  waitlist.splice(0, waitlist.length);

  console.log(`Tables array:  ${tables}`);
  console.log(`Waiting List array:  ${waitlist}`);

  return (tables.length === 0 && waitlist.length === 0) ? res.json(true) : res.json(false);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log(`[SERVER.js] App listening on PORT ${PORT}`);
});


var mongo = require('mongodb')
var MongoClient = mongo.MongoClient;
var assert = require('assert');
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

var records = []
var url = 'mongodb://localhost:27017/company';

// -- setup app
app.use(bodyParser.json())
app.use('/node_modules', express.static('node_modules'));

// -- create
app.post("/contacts", function(req, res){

  var newUser = req.body;

  MongoClient.connect(url, function(err, db) {
    var col = db.collection('employees').insertOne(
      newUser,
      function(err, result) {
        if(err){
          console.log("error");
        }
        else{
          console.log("success");
          res.sendStatus("200")
        }
      }
    )
  }); 
});

// -- read
app.get("/contacts", function(req, res){
  MongoClient.connect(url, function(err, db) {
    var col = db.collection('employees');
    col.find({}).toArray(function(err, items) {
      var records = items;
      res.send(records);
    });
  }); 
});

// -- update
app.put("/contacts/:id", function(req, res){
  MongoClient.connect(url, function(err, db) {
    var newContact = req.body;
    db.collection('employees').update(
      { 
        _id : new mongo.ObjectID(req.params.id) 
      },
      {
        "firstName" : newContact.firstName,
        "lastName" : newContact.lastName,
        "middleInt" : newContact.middleInt,
        "email" : newContact.email,
        "phone" : newContact.phone,
        "position" : newContact.position,
        "dateHired" : newContact.dateHired
      },
      {
        "upsert" : false
      }, 
      function(err, results) {
        if(err){
          console.log("error");
        }
        else{
          res.sendStatus(200)
          // res.json(message : "this is a message")
          // res.send()
        }
        db.close() 
      });
  });
});

// -- delete
app.delete("/contacts/:id", function(req, res){
  MongoClient.connect(url, function(err, db) {
      db.collection('employees').remove(
        { _id : new mongo.ObjectID(req.params.id) },
        function(err, results) {
          if(err){
            console.log("error")
          }
          else{
            res.sendStatus(200)
          }  
        }
      )
  });    
});

// -- routes
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/controller.js', function (req, res) {
  res.sendFile(__dirname + '/controller.js');
});



// -- start server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

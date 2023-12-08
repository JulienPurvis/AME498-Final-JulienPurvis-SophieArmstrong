var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 8080;

var quadX, quadY, quadZ, quadW;


app.get("/", function (req, res) {
    res.redirect("index.html")
});

app.get("/sendData", function (req, res) {
    quadX = req.query.x
    quadY = req.query.y
    quadZ = req.query.z
    quadW = req.query.w
    req.query.time = new Date().getTime();
    res.end("OK");
    console.log(req.query, new Date());
});


app.get("/getData", function (req, res) {
  var ret = {}

  ret.x = quadX; 
  ret.y = quadY; 
  ret.z = quadZ;
  ret.w = quadW; 
    
    res.send(JSON.stringify(ret));
});

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);

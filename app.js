const express = require('express')
const app = express()
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');
var db = new sqlite3.Database('bd.db'); // default access is read, write, create

// for parsing application/json
app.use(bodyParser.json()); 
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

var getFunc = function(req, res){

  // res.send("Codigo html del formulario");

  db.serialize(function() {

  	var output = "";
	  db.each("SELECT * FROM users", function(err, row) {
	  	  output = output + row.id + " " + row.name;
	  
	  }, function(error, retrievedRows){ // completion callback
	  		res.send(output);
	  });

	})
}

app.get('/', getFunc)

app.post('/', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
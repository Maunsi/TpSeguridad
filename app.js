const express = require('express')
const app = express()
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');
var db = new sqlite3.Database('bd.db'); // default access is read, write, create
let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}


// for parsing application/json
app.use(bodyParser.json()); 
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

var getFunc = function(req, res){

  res.sendFile('/form.html', {root: __dirname });

}

app.get('/', getFunc)

app.post('/', function(req, res){
   console.log(req.body);
	 
	let sql = 'SELECT * FROM users WHERE name = ? AND password = ?';

	var output = "";
	params =
	
	db.each(sql, [req.body.user, req.body.password], (err, row) => 
	{
		if (err) {
	  	console.log(err);
	    throw err;
		}

		output = output + row.id + " " + row.name + " " + row.password + " " + row.email;

	}, function(error, retrievedRows)
	{ // completion callback
		if(error)
		{
			console.log(err);
			throw error;
		}

		return retrievedRows
    	? res.send(output)
   		: res.send(`No user found with username ${req.body.user} and password ${req.body.password}`)
	});	 

/*
    db.serialize(function() {

  	var output = "";
	  db.each("SELECT * FROM users WHERE row.name ", function(err, row) {
	  	  output = output + row.id + " " + row.name;
	  
	  }, function(error, retrievedRows){ // completion callback
	  		res.send(output);
	  });

	})
   //res.send("recieved your request!");
*/
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))